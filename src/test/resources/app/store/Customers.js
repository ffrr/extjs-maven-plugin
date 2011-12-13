/**
 * Customer
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */
Ext.define('DanteFrontend.store.Customers', {
    extend: 'DanteFrontend.lib.base.Store',

    model: 'DanteFrontend.model.Customer',

    api: {
        read: userController.listCustomersByLoggedUser
    }
});