/**
 * Resolver
 * Abstract default class.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 28, 2011
 */


Ext.define('DanteFrontend.lib.resolver.Resolver', {
    extend: 'Ext.util.Observable',

    constructor: function(app) {
        this.app = app;
        //this.setcurrentController = null;
        this.callParent();
    },

    resolve: function(regex, url, target) {
        var parsedUrl = this.parseUrl(regex, url);
        //console.log(parsedUrl.token);
        var controllerName = (Ext.isEmpty(target)) ?
            this.getControllerName(parsedUrl.token):
            target;
        var controller = this.app.getController(controllerName);
        if(!Ext.isEmpty(controller)) {
            if(this.isLoaded(controller)) {
                return;
            }
            this.app.getViewport().setLoading(true);
            controller.load(this.loadCallback, this, [controller, parsedUrl.params]);
        } else {
            console.error('No such controller exists.');
        }
    },

    loadCallback: function(controller, params) {
        this.load(controller, params);
        this.app.setCurrentController(controller);
        this.app.getViewport().setLoading(false);
    },
    
    isLoaded: function(controller) {
        return !Ext.isEmpty(this.app.getCurrentController()) && this.app.getCurrentController() == controller;
    },

    unload: function() {
        this.app.setCurrentController(null);
    },

    parseUrl: function(regex, url) {
        var arr = regex.exec(url);
        var paramRegex = /\/?([a-zA-Z]+)\/([0-9]+)/g;
        var obj = null;
        
        while((partialMatches = paramRegex.exec(arr[2])) != null) {
            obj = obj || {};
            obj[partialMatches[1]] = partialMatches[2];
        }

        return {
            token: arr[1],
            params: obj
        };
    }

});
