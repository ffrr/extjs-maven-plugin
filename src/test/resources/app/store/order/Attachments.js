/**
 * Attachments
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 9, 2011
 */

Ext.define('DanteFrontend.store.order.Attachments', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.Attachment',

    api: {
        read: orderController.listOrderAttachments,
        destroy: orderController.destroyOrderAttachments
    },

    remoteFilter: true,
    autoLoad: false,
    dependencyFilter: {
        property: 'order_id'
    }
});