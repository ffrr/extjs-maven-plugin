/**
 * TitledKey
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 11, 2011
 */


Ext.define('DanteFrontend.lib.model.Conf', {
    singleton: true,

    enumKey: function(conf) {
        return Ext.apply({
            fields: [
                {name: 'id', type: 'int'},
                {name: 'name', type: 'string'},
                {name: 'enumKey', type: 'string'}
            ],
            proxy: {
                type: 'memory',
                data: conf.proxyData
            }
        }, conf);
    },

    titledKey: function(conf) {
        return Ext.apply({
            fields: [
                {name: 'id', type: 'int'},
                {name: 'name', type: 'string'}
            ],
            proxy: {
                type: 'memory',
                data: conf.proxyData
            }
        }, conf);
    }
});