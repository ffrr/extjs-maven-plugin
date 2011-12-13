/**
 * boiler
 * boilerplate testing ground
 * 
 * @author fk
 * @version 0.1
 * @date Aug 18, 2011
 */


Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'DanteFrontend': '../static/js/app'
    }
});

Ext.syncRequire(['DanteFrontend.test.Fixtures', 'DanteFrontend.test.MemoryProxy']);
Ext.syncRequire(['DanteFrontend.lib.base.JsonReader','DanteFrontend.lib.base.JsonWriter', 'DanteFrontend.lib.base.Store', 'DanteFrontend.model.Customer', 'DanteFrontend.store.Suppliers']);


Ext.application({
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
        'DanteFrontend.lib.ux.SchemaValidator',
        'DanteFrontend.lib.view.Window',
        'DanteFrontend.lib.view.Grid',
        'DanteFrontend.lib.view.Form',
        'DanteFrontend.lib.view.Filter',
        'DanteFrontend.lib.view.FileGrid',
        'DanteFrontend.lib.view.Combobox',
        'DanteFrontend.lib.view.ComboboxWithAdd',
        'DanteFrontend.view.customer.SupplierDetails',
//        'DanteFrontend.model.Customer',
//        'DanteFrontend.store.Suppliers',
        'DanteFrontend.test.Fixtures',
        'DanteFrontend.test.MemoryProxy',
        'DanteFrontend.test.FileProxy'
    ],

    stores: ['Suppliers'],
    models: ['Customer'],

    launch: function() {

        var store = Ext.data.StoreManager.lookup('Suppliers');
        store.load(Ext.bind(function() {
            Ext.create('Ext.container.Viewport', {
                layout: 'anchor',
                items: {
                    xtype: 'df-combo-add',
                    width: 120,
                    store: 'Suppliers',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',

                    windowTitle: g('Add supplier'),
                    addForm: {
                        xtype: 'df-customer-supplier-details'
                    }
                }
            });
        }, this));

//        var fileGrid = Ext.widget('df-grid-file', {
//                width: 300,
//                height: 200,
//                store: store,
//                ref: 'attachments',
//                margin: '0 0 6 0',
//                api: {
//                    submit: orderController.attachToOrder
//                }
//        });
//
//        fileGrid.setFilter({
//            property: 'orderId',
//            value: 1
//        });
//

//
//        store.load();
    }

});