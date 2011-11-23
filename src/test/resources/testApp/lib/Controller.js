/**
 * Controller
 * An app-specific extension of the base ext controller class.
 *
 * TODO:
 * - move some of the editor functionality to the Editor component.
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */

Ext.define('DanteFrontend.lib.Controller', {
    extend: 'Ext.app.Controller',

    config: {
        rootView: '',
        defaultSize: {
            width: 300,
            height: 200
        },
        api: null,
        editors: null,
        urlParams: {}
    },
    
    constructor: function() {
        this.callParent(arguments);
        this.addEvents('storesloaded','rootviewcreated');
        this.on('storesloaded', function() {
            this.loadCallback();
            this.onStoresLoaded();
        }, this);
    },

    init: function() {
        Ext.each(this.controllers, function(c) {
            this.getController(c).partialInit(this);
        }, this);
        this.initEditors();
    },

    getRootViewInstance: function() {
        //if(!Ext.isDefined(this.rootViewInstance)) {
        rootViewInstance = Ext.widget(this.rootView);
        this.fireEvent('rootviewcreated', rootViewInstance);
//        }
        return rootViewInstance;
    },

    onStoresLoaded: Ext.emptyFn,

    /**
     * private
     */

    /**
     * Default pre-load event listener. Before the resolver loads this
     * controller, beforeLoad calls a Direct api method, if specified.
     * If there's no api method in the config to call, the resolver load
     * callback is called right away.
     */

    /** consider loading stores only once, then just sync **/
    load: function(callback, resolver, args) {
        this.loadCallback = function() {
            callback.apply(resolver, args);
        };
        
        if(!Ext.isEmpty(this.getApi()) && Ext.isFunction(this.getApi().preload)) {
            this.handlePreload(callback, resolver, args);
        } else {
            this.loadStores();
        }

    },

    /**
     * Default after-load event listener. Loads all stores required by this
     * controller.
     */
    handlePreload: function(callback, resolver, args) {
        this.getApi().preload(null, Ext.bind(function(res) {
            this.loadStores();
        }, this));
    },

    loadStores: function() {
        var storesToLoad = [];
        Ext.Array.each(this.stores,
            function(storeName) {
                var store = this.getStore(storeName);
                if(Ext.isEmpty(store.dependencyFilter)) {
                    storesToLoad.push(store);
                }
        }, this);

        this.storesRemaining = Ext.clone(storesToLoad);

        Ext.each(storesToLoad, function(store) {
            if(store) {
                var callback = { callback: this.confirmStoreLoad(store), scope: this };
                if(store.filters && store.filters.getCount() > 0) {
                    store.clearFilter(false, callback);
                    if(!store.remoteFilter) store.load(callback);
                } else {
                    store.load(callback);
                }
            }
        }, this);
    },
    
    confirmStoreLoad: function(store) {
        return function() {
            Ext.Array.remove(this.storesRemaining, store);
            if(Ext.isEmpty(this.storesRemaining)) {
                this.fireEvent('storesloaded');
            }
        }
    },

    initEditors: function() {
        if(!Ext.isEmpty(this.getEditors())) {
            var editorConfig = this.getEditors();
            Ext.each(editorConfig, function(obj) {
                this.initEditor(obj);
            }, this);
        }
    },

    initEditor: function(conf) {
        if(Ext.isString(conf.editor)) {
            var buttonSelector = this.rootView + ' ' +
                    this.getEditorAlias(conf.editor) +
                    ' toolbar button[action=save]';
            var controlObj = {};
            var handler = Ext.emptyFn;

            if(Ext.isString(conf.store)) {
                handler = this.createDefaultHandler(conf.editor, conf.store);
            }
            //this.bindEditorToStore(conf.editor, conf.store);
            
            if(Ext.isFunction(this[conf.handler])) {
                handler = Ext.bind(this[conf.handler], this);
            }
            
            controlObj[buttonSelector] = {
                click: handler
            }

            //workaround for now, until the editor component gets refactored

            this.getStore(conf.store).on('beforesync', function() {
                var editor = this.getEditorInstanceByName(conf.editor);
                if(editor) editor.onBeforeSync();
            }, this);

            this.getStore(conf.store).on('aftersync', function() {
                var editor = this.getEditorInstanceByName(conf.editor);
                if(editor) editor.onAfterSync();
            }, this);

            this.control(controlObj);
        }
    },

    createDefaultHandler: function(editorName, storeName) {
        return Ext.bind(function() {
            var editor = this.getEditorInstanceByName(editorName);
            var store = this.getStore(storeName);

            if(editor.validateAndUpdate()) {
                store.sync();
            }
        }, this);
    },

//    bindEditorToStore: function(editorName, storeName) {
//        var store = this.getStore(storeName);
//        store.on('afterSync', Ext.bind(function(boundStore, operation) {
//
//            var editor = this.getEditorInstanceByName(editorName);
//            var updatedRecord = DanteFrontend.lib.Util.first(operation.records);
//            editor.loadRecord(boundStore.getById(updatedRecord.getId()));
//
//        }, this));
//    },

    getEditorAlias: function(configName) {
        var alias = DanteFrontend.lib.Util.first(Ext.ClassManager.getAliasesByName('DanteFrontend.view.'
            + configName));
        if(alias) {
            return alias.replace('widget.','');
        }
        return false;
    },

    getEditorInstanceByName: function(configName) {
        return DanteFrontend.lib.Util.first(
            Ext.ComponentQuery.query(this.rootView + 
                ' ' + this.getEditorAlias(configName)));

    }
});