/**
 * OrderItem
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 4, 2011
 */

Ext.define('DanteFrontend.model.order.OrderItem', {
    extend: 'Ext.data.Model',

    fields: [{
        name:'id',
        type: 'int'
    },{
        name: 'description',
        type: 'string'
    },{
        name: 'amount',
        type: 'int'
    },{
        name: 'unit',
        type: 'string'
    },{
        name: 'supplierUnitPrice',
        type: 'float'
    },{
        name: 'supplierBasePrice',
        type: 'float'
    },{
        name: 'sellingUnitPrice',
        type: 'float'
    },{
        name: 'sellingBasePrice',
        type: 'float'
    },{
        name: 'supplier_id',
        mapping: 'supplier',
        type: 'int'
    },{
        name: 'unit_id',
        mapping: 'unit',
        type: 'int'
    },{
        name: 'type_id',
        mapping: 'type',
        type: 'int'
    },{
        name: 'order_id',
        mapping: 'incomingOrder',
        type: 'int'
    },{
        name: 'vatRate',
        type: 'int'
    }],

    associations: [{
        type: 'belongsTo', model: 'DanteFrontend.model.order.Order'
    },{
        type: 'belongsTo', model: 'DanteFrontend.model.Supplier', associationKey: 'supplier', getterName: 'getSupplier', setterName: 'setSupplier'
    },{
        type: 'belongsTo', model: 'DanteFrontend.model.order.ItemType'
    }],

    statics: {
        instanceDefaults: {
            supplier: 0,
            type: 0,
            unit: 0,
            vatRate: 20
        }
    }
});
