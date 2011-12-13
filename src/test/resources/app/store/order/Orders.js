/**
 * Orders
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 4, 2011
 */

Ext.define('DanteFrontend.store.order.Orders', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.order.Order',

    api: {
        read: orderController.list,
        create: orderController.save,
        update: orderController.save,
        destroy: orderController.destroy
    },
    
    autoLoad: false,
    remoteFilter: true
});