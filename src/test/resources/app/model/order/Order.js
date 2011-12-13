/**
 * Order
 * 
 * @author fk
 * @version 0.1
 * @date Aug 4, 2011
 */

Ext.define('DanteFrontend.model.order.Order', {
    extend: 'Ext.data.Model',

    fields: [{
        name:'id',
        type: 'int'
    },{
        name: 'referenceId',
        type: 'string'
    },{
        name: 'summary',
        type: 'string'
    },{
        name: 'acceptedOn',
        type: 'date'
    },{ //assoc
        name: 'customer_id',
        mapping: 'customer',
        type: 'int'
    },{
        name: 'deliveryStatus_id',
        mapping: 'deliveryStatus',
        type: 'int'
    },{
        name: 'supplierGrandTotal',
        type: 'int'
    },{
        name: 'sellingGrandTotal',
        type: 'int'
    }],


//    hasMany: {
//        model: 'DanteFrontend.model.order.OrderItem', name: 'orderitems'
//    }
    associations: [{
        type: 'belongsTo', model: 'DanteFrontend.model.Customer', autoLoad: true, associationKey: 'customer', getterName: 'getCustomer', setterName: 'setCustomer'
    },{
        type: 'belongsTo', model: 'DanteFrontend.model.order.DeliveryStatus', autoLoad: true, associationKey: 'deliveryStatus', getterName: 'getDeliveryStatus', setterName: 'setDeliveryStatus'
    },{
        type: 'hasMany', model: 'DanteFrontend.model.order.OrderItem', name: 'orderItems'
    },{
        type: 'hasMany', model: 'DanteFrontend.model.order.Attachment', name: 'attachments'
    }],

    statics: {
        instanceDefaults: {
            customer: 0
        }
    }
});
