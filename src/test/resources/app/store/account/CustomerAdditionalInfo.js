/**
 * CustomerAdditionalInfos
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.store.account.CustomerAdditionalInfo', {
    extend: 'DanteFrontend.lib.base.Store',
    model: 'DanteFrontend.model.Customer',
    
    api: {
        read: customerManagementController.readCustomerAdditionalInfo,
        update: customerManagementController.saveCustomerAdditionalInfo
    }
});