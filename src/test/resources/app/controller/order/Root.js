/**
 * Root orders controller.
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 3, 2011
 */

//Ext.require('DanteFrontend.model.order.Attachment');
Ext.define('DanteFrontend.controller.order.Root', {
    extend: 'DanteFrontend.lib.Controller',
    //,

    stores: ['order.Orders', 'order.OrderItems', 'order.DeliveryStatuses',
    'order.ItemTypes', 'order.Units', 'order.Attachments',
    'Customers', 'Suppliers'],
    models: ['order.Order', 'order.OrderItem', 'order.DeliveryStatus', 
    'order.ItemType', 'order.Unit', 'Attachment',
    'Customer'],
    
    views: ['order.Root', 
    'order.details.Root',
    'order.details.BasicForm',
    'order.details.ItemsList',
    'order.Filter'
    ],

//    editors: [{
//        editor: 'order.details.Root',
//        store: 'order.Orders',
//        handler: 'saveOrder'
//    }],

    refs: [{
        ref: 'orderItemGrid',
        selector: 'df-order-details-items'
    },{
        ref: 'attGrid',
        selector: 'df-order-details df-grid-file[ref=attachments]'
    },{
        ref: 'editor',
        selector: 'df-order-details'
    },{
        ref: 'multiStateEditor',
        selector: 'df-order-root df-msedit'
    }],

    rootView: 'df-order-root',

    init: function() {
        this.control({
            'df-order-root df-msedit': {
                selectitem: this.loadOrder,
                createitem: this.addOrder
            },

            'df-order-details-items': {
                edit: this.saveOrderItem
            },

            'df-order-details': {
                save: this.saveOrder
            }
        });

        this.getOrderOrderItemsStore().on('aftersync', function() {
            var mse = this.getMultiStateEditor();
            var index = mse.getCurrentIndex();
            mse.getView('briefGrid').getStore().load({
                callback: function() {
                     mse.getView('briefGrid').getView().select(index);
                },
                scope: this
            });
        }, this);

        this.callParent(arguments);
    },

    onStoresLoaded: function() {},

    addOrder: function(r) {
        this.loadOrder(r);
    },

    loadOrder: function(r) {
        this.getEditor().accessAndLoad();
        (r.phantom) ? this.loadPhantom(r):this.loadExisting(r);
    },

    loadExisting: function(r) {
        var flt = {
           property: 'order_id',
           value: r.getId()
        };
    
        this.getAttGrid().up('fieldset').enable();
        this.getOrderItemGrid().enable();
        
        this.getAttGrid().setFilter(flt);
        this.getAttGrid().getStore().load();
        this.getOrderItemGrid().getStore().filter(flt);
    },

    loadPhantom: function(r) {
        this.getAttGrid().up('fieldset').disable();
        this.getAttGrid().getStore().removeAll();
        this.getOrderItemGrid().disable();
        this.getOrderItemGrid().getStore().removeAll();
    },

    saveOrder: function() {
        if(this.getEditor().validateAndUpdate()) {
            this.getOrderOrdersStore().sync();
        }
    },

    saveOrderItem: function(ctx) {
        var record = ctx.record;
        record.set('order_id', this.getEditor().accessRecord().getId());
        this.getOrderOrderItemsStore().sync();
    }


});