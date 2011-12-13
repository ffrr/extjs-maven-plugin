/**
 * app
 * App bootstrap class.
 * 
 * @author fk
 * @version 0.1
 * @date May 27, 2011
 */

//Ext.require([
//    'DanteFrontend.view.Renderers',  'DanteFrontend.lib.Util'
//]);

Ext.ns("DanteFrontend.common");


DanteFrontend.common.jsonDateFormat = "Y-m-d H:i:s";
DanteFrontend.common.defaultDateFormat = "d.m.Y H:i:s";

/**
 * todo: A role-dependent packager would be a nice addition, which would build 
 * a package for each role, and then these packages would be loaded by the client
 * browser as necessary - only those parts of the client code would be published,
 * which are necessary to run the app for that particular role. For now,
 * everything is served.
 * should be probably driven by comment annotations.
 */


DanteFrontend.appConf = {
    name: 'DanteFrontend',

    appFolder: '../static/js/app',
    
    requires: [
        'DanteFrontend.lib.Util',
        'DanteFrontend.lib.Router',
        'DanteFrontend.lib.resolver.Viewport',
        'DanteFrontend.lib.resolver.Modal',
        'DanteFrontend.lib.resolver.Handler',
        'DanteFrontend.lib.Notify',
        'DanteFrontend.lib.Command',
        'DanteFrontend.lib.CommandBus',
        'DanteFrontend.lib.base.JsonReader',
        'DanteFrontend.lib.base.JsonWriter',
        'DanteFrontend.lib.ux.SchemaValidator',
        'DanteFrontend.lib.view.Window',
        'DanteFrontend.lib.view.Grid',
        'DanteFrontend.lib.view.Form',
        'DanteFrontend.lib.view.Filter',
//        'DanteFrontend.lib.view.FileGrid',
        'DanteFrontend.lib.view.Combobox', //    'DanteFrontend.lib.view.ComboboxWithAdd',
        'DanteFrontend.lib.view.TextField',
        'DanteFrontend.lib.view.AddingGrid',
        /* 'DanteFrontend.lib.view.StatePanel',
        'DanteFrontend.view.customer.SupplierDetails',
        'DanteFrontend.lib.base.Store',
        'DanteFrontend.lib.model.Conf',
        'DanteFrontend.lib.view.multistateeditor.MultiStateEditor',
        'DanteFrontend.test.Fixtures',  */ 'DanteFrontend.test.MemoryProxy',
        'DanteFrontend.test.FileProxy',
        //'DanteFrontend.lib.PartialController'
    ],

    controllers: [
        'Root',
        'dashboard.Root',
        'worklog.Root',
        'worklog.RootWithExportTools',
        'account.CustomerContacts',
        'account.CompanyDetails',
        'account.CustomerUserPrefs',
        'order.Root',
        'budget.Dashboard',
        'budget.Manage',
        'budget.BalanceItems'
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

