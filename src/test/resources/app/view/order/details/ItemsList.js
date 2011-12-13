/**
 * ItemsList
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 9, 2011
 */

Ext.define('DanteFrontend.view.order.details.ItemsList', {
    extend: 'DanteFrontend.lib.view.Grid',
    alias: 'widget.df-order-details-items',

    initComponent: function() {
        this.unitStore = Ext.data.StoreManager.lookup('order.Units');
        this.typeStore = Ext.data.StoreManager.lookup('order.ItemTypes');
        this.supplierStore = Ext.data.StoreManager.lookup('Suppliers');

        this.rowEditing = Ext.create('DanteFrontend.lib.view.RowEditing', {
            clicksToEdit: 2,
            clicksToMoveEditor: 1
        });

        var config = {
            store: 'order.OrderItems',
            plugins: [
                this.rowEditing
            ],
            //margin: 4,
            selType: 'rowmodel',
            toolbar: true,
            columns: [{
                    header: g('Description'),
                    dataIndex: 'description',
                    editor: {
                        xtype: 'textfield',
                        name: 'description',
                        allowBlank: false
                    },
                    flex: 1
                },{
                    header: g('Supplier'),
                    dataIndex: 'supplier_id',
                    width: 120,
                    editor: {
                        name: 'supplier_id',
                        store: this.supplierStore,
                        emptyText: g('Select supplier ...'),
                        valueField: 'id',
                        displayField: 'name',
                        xtype: 'df-combo-add',
                        windowTitle: g('Add supplier'),
                        addForm: {
                            xtype: 'df-customer-supplier-details'
                        },
                        queryMode: 'local',
                        allowBlank: false
                    },

                    renderer: Ext.bind(function(v) {
                        var rec = this.supplierStore.getById(v);
                        return !Ext.isEmpty(rec) ? rec.get('name'):null;
                    }, this)
                },{
                    header: g('Type'),
                    dataIndex: 'type_id',
                    width: 120,
                    renderer: Ext.bind(function(v) {
                        return this.typeStore.getById(v).get('name');
                    }, this),
                    editor: {
                        name: 'type_id',
                        store: this.typeStore,
                        emptyText: g('Select type ...'),
                        valueField: 'id',
                        displayField: 'name',
                        xtype: 'combo',
                        queryMode: 'local'
                    }
                },{
                    header: g('Amount'),
                    dataIndex: 'amount',
                    field: 'numberfield',
                    width: 50
                },{
                    header: g('Unit'),
                    dataIndex: 'unit_id',
                    width: 32,
                    renderer: Ext.bind(function(v) {
                        return this.unitStore.getById(v).get('name');
                    }, this),
                    editor: {
                        name: 'unit_id',
                        store: this.unitStore,
                        emptyText: g('Select type ...'),
                        valueField: 'id',
                        displayField: 'name',
                        xtype: 'combo',
                        queryMode: 'local'
                    }
                },{
                    header: g('Supplier unit'),
                    dataIndex: 'supplierUnitPrice',
                    field: 'numberfield',
                    width: 80,
                    renderer: DanteFrontend.view.Renderers.sum
                },{
                    header: g('Supplier base'),
                    dataIndex: 'supplierBasePrice',
                    field: 'numberfield',
                    width: 80,
                    renderer: function(v) {
                        return v + ' &#8364;';
                    }
                },{
                    header: g('Selling unit'),
                    dataIndex: 'sellingUnitPrice',
                    field: 'numberfield',
                    width: 80,
                    renderer: DanteFrontend.view.Renderers.sum
                },{
                    header: g('Selling base'),
                    dataIndex: 'sellingBasePrice',
                    field: 'numberfield',
                    width: 80,
                    renderer: function(v) {
                        return v + ' &#8364;';
                    }
            }],
            listeners: {
                itemadded: function(v, r) {
                    this.rowEditing.startEdit(r, 0);
                },
                scope: this
            }
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        
        this.callParent(arguments);
    }


});
