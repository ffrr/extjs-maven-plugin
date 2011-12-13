/**
 * CustomerAddresses
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.store.account.CustomerAddresses', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.CustomerAddresses',
    
    api: {
            read :    customerManagementController.readCustomerAddresses,
            update :   customerManagementController.saveCustomerAddresses
    }
});