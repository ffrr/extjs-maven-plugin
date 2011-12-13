/**
 * OrderItems
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 9, 2011
 */

Ext.define('DanteFrontend.store.order.OrderItems', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.order.OrderItem',
        
    api: {
        read: orderController.listOrderItems,
        create: orderController.saveOrderItems,
        update: orderController.saveOrderItems,
        destroy: orderController.destroyOrderItems
    },

    remoteFilter: true,
    autoLoad: false,
    dependencyFilter: {
        property: 'order_id'
    }
});