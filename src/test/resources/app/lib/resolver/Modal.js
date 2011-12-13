/**
 * Modal
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 28, 2011
 */

Ext.define('DanteFrontend.lib.resolver.Modal', {
    extend: 'DanteFrontend.lib.resolver.Resolver',

    getControllerName: function(token) {
        return token;
    },

    load: function(controller, params) {
//        var rootViewInstance = Ext.widget(controller.getRootView(),{
//            region: 'center'
//        });
        controller.setUrlParams(params);
        var rootViewInstance = controller.getRootViewInstance();

        var modal = Ext.widget('df-window', {
            title: rootViewInstance.windowTitle,
            id: 'currentModalWindow',
            items: rootViewInstance
        });
        modal.show();
        modal.on('destroy', this.afterModalUnload, this);
    },

    afterModalUnload: function() {
        //this.unload();
        Ext.util.History.back();
    }
});