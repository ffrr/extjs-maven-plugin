/**
 * CustomerUser
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jul 6, 2011
 */


Ext.define('DanteFrontend.store.account.LoggedCustomerContactAndUser', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.CustomerContactAndUser',

    api: {
        read: customerManagementController.readCustomerContactsOfLoggedUser,
        update: customerManagementController.saveCustomerContactsOfLoggedUser
    }
});