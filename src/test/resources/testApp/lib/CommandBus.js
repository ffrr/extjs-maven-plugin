/**
 * CommandBus
 * A simple bus which contains all executed commands.
 * Uses LocalStorageProvider to store the state.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */

//?
Ext.require([
    'Ext.util.History',
    'Ext.state.Manager',
    'Ext.state.LocalStorageProvider'
]);

Ext.define('DanteFrontend.lib.CommandBus', {
    singleton: true,

    MAPKEY: 'CommandMap',
    
    mixins: {
        'observable': 'Ext.util.Observable'
    },
    
    init: function(router) {
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
        Ext.state.Manager.set(DanteFrontend.lib.CommandBus.MAPKEY, {});
        Ext.util.History.init();
        this.router = router;
        Ext.util.History.on('change', Ext.bind(this.onHistoryChanged, this));
    },

    add: function(command) {
        var token = command.getToken();
        this.getCommandMap()[token] = command;
        Ext.util.History.add(token);
        return command;
    },


    getCommandMap: function(bus) {
        return Ext.state.Manager.get(DanteFrontend.lib.CommandBus.MAPKEY, {});
    },

    onHistoryChanged: function(token) {
        if(token) {
            if(!this.hasCommand(token)) {
                this.router.route(token);
            }
            this.getCommandMap()[token].execute();
        }
    },

    hasCommand: function(token) {
        return !Ext.isEmpty(this.getCommandMap()[token]);
    }
})