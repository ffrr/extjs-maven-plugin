/**
 * CustomerContactsAndUsers
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.store.account.CustomerContactsAndUsers', {
    extend: 'DanteFrontend.lib.base.Store',
    alias: 'store.df-account-ccu',
    model: 'DanteFrontend.model.CustomerContactAndUser',

    /**
     * if no proxy specified, a default proxy (@see DanteFrontend.lib.base.Store)
     * is used, with this api def
     */
    api: {
        read :    customerManagementController.readContacts,
        create :  customerManagementController.saveContacts,
        update :   customerManagementController.saveContacts,
        destroy : customerManagementController.destroyContacts
    }
});