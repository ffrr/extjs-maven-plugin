/**
 * Customer
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */
Ext.define('DanteFrontend.store.Suppliers', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.Customer',

    api: {
        read: userController.listSuppliers,
        create: userController.addSuppliers
    }
});