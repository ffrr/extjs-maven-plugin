/**
 * app
 * App bootstrap class.
 * 
 * @author fk
 * @version 0.1
 * @date May 27, 2011
 */

DanteFrontend = {};

DanteFrontend.appConf = {
    name: 'DanteFrontend',

    appFolder: '../static/js/app',
    
    requires: [
        'DanteFrontend.lib.Util',
        'DanteFrontend.lib.Router',
        'DanteFrontend.lib.Notify',
        'DanteFrontend.lib.Command',
        'DanteFrontend.lib.CommandBus',
    ],

    controllers: [
        'Root'
    ],
    
    //actionResolvers: ['modal', 'default'],
    
    launch: function() {
        this.addEvents('rootviewloaded');
        this.setCurrentController(null); this.setCurrentRootView(null);

        var lib = DanteFrontend.lib;

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: {
                xtype: 'df-root'
            }
        });
        
        this.router = Ext.create('DanteFrontend.lib.Router');
        lib.CommandBus.init(this.router);

        //register routes to resolvers
        this.router.registerRoutes(DanteFrontend.routes, this);

        //use resolve, as the history may not be changed (when reloading the same viewport)

        this.loadStartingViewport();
    },

    loadStartingViewport: function() {
        var initUrl = res('url.init');
        if(window.location.toString().indexOf(initUrl) !== -1) {
            this.router.resolve(initUrl);
        } else {
            this.router.route(initUrl);
        }
    },

    getViewport: function() {
        return this.getController('Root').getContent();
    },

    getHandler: function(handlerName) {
        return this[handlerName];
    },


    //handlers should be probably separated to a singleton class, like renderers
    logout: function() {
        window.location.href = res('url.logout');
    },
    

    getCurrentController: function() {
        return this._currentController;
    },

    setCurrentController: function(controller) {
        this._currentController = controller;
    },

    getCurrentRootView: function() {
        return this._currentRootView;
    },

    setCurrentRootView: function(rootViewInstance) {
        this._currentRootView = rootViewInstance;
    }
};

Ext.application(DanteFrontend.appConf);

