/**
 * Viewport
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 28, 2011
 */

Ext.define('DanteFrontend.lib.resolver.Viewport', {
    extend: 'DanteFrontend.lib.resolver.Resolver',


    getControllerName: function(token) {
        return token + ".Root";
    },

    load: function(controller, params) {
        this.flushViewport();
        this.fillViewport(controller, params);
    },

    flushViewport: function() {
        if(!Ext.isEmpty(this.app.getCurrentRootView()))
            this.app.getViewport().remove(this.app.getCurrentRootView(), true);
    },

    fillViewport: function(controller, params) {
        controller.setUrlParams(params);
        var rootViewInstance = controller.getRootViewInstance();
        this.app.setCurrentRootView(rootViewInstance);
        this.app.getViewport().add(this.app.getCurrentRootView());
    }
});
