/**
 * Store
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.lib.base.Store', {
    extend: 'Ext.data.Store',

    config: {
        lastIndex: 0
    },
    
    constructor: function(config) {
        this.model = Ext.ModelManager.getModel(this.model);
        config = Ext.applyIf(config, {
            paramsAsHash: true,
            autoSync: false,
            autoLoad: false,
            proxy: this.proxy || {
                type: 'direct',
                api: this.api || this.model.getProxy().api,
                reader: {
                    type: 'df-reader-json'
                },
                writer: {
                    type: 'df-writer-json',
                    writeAllFields: true
                }
            }
        });
        this.addEvents('aftersync')
        
        this.callParent([config]);

        //always reload content after any sync.
        this.on('write', function(store, operation) {
            this.load({
                callback: function() {
                    switch(operation.action) {
                        case 'create':
                            DanteFrontend.lib.Notify.base.success(g('Store updated'), g('Your entry has been added.'));
                            break;
                        case 'update':
                            DanteFrontend.lib.Notify.base.success(g('Store updated'), g('Your entry has been updated.'));
                            break;
                        case 'destroy':
                            DanteFrontend.lib.Notify.base.success(g('Store updated'), g('Your entry has been removed.'));
                            break;
                        default: break;
                    }
                    this.fireEvent('aftersync', store, operation);
                },
                scope: this
            });
        }, this);

        this.on('add', function(s, r, i) {
           this.setLastIndex(i);
        });
        
    },
//
//    onBatchComplete: function(batch, operation) {
//        this.callParent(arguments);
//        this.fireEvent('aftersync');
//    },
    
    hasDummyRecord: function() {
        return (this.dummyRecord != undefined && this.dummyRecord != null);
    },

    getDefaultModel: function() {
        var cls = Ext.ModelManager.getModel(this.model.modelName);
        var model = Ext.create(this.model.modelName, cls.instanceDefaults || {})
        return model;
    },

    loadWithDependencyFilter: function(id) {
        //this.clearFilter();
        this.filter(Ext.apply(this.dependencyFilter, {
            value: id
        }));
        //this.load();
    },

    // as the default impl of filter method does not allow a callback, we assign
    // it as a load listener callback (load() is called internally by filter)
    // and remove it right afterwards
    // cool, neh?

    filter: function(filters, value, cb, clear) {
        var me = this,
            clearFilters = (clear == null) ? true:clear,
            wrapper = function() {
                //always catch - otherwise the listener is not unregistered, and all hell breaks loose
                try {
                    cb.callback.apply(cb.scope);
                } catch(ex) {
                    console.error('Error occured in callback: ', cb, ex);
                } finally {
                    me.un('load', arguments.callee);
                }
            };
            
        if(me.filters && clearFilters) {
           me.remoteFilter ? me.filters.clear():me.clearFilter();
        }
        
        if(me.remoteFilter && cb) {
            me.on('load', wrapper);
        } else if (cb) {
            cb.callback.apply(cb.scope);
        }
        
        me.callParent(arguments);
    },
    
    //and repeat
    
    sync: function(cb) {
         var me = this;
         if(cb)
             me.on('aftersync', function() {
                try {
                    cb.callback.apply(cb.scope);
                } catch (ex) {
                    console.error('Error occured in callback: ', cb, ex);
                } finally {
                    me.un('aftersync', arguments.callee);
                }
             });
         me.callParent(arguments);
    },
    
    // and repeat
    
    clearFilter: function(suppressEvent, cb) {        
        var me = this;
        if(me.remoteFilter && cb) {
            me.on('load', function() {
                try {
                    cb.callback.apply(cb.scope);
                } catch (ex) {
                    console.error('Error occured in callback: ', cb, ex);
                } finally {
                    me.un('load', arguments.callee);
                }
            });
        } else if(cb) {
            cb.callback.apply(cb.scope);
        }
        me.callParent(arguments);        
    }

});