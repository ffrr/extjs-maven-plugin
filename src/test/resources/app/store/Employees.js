/**
 * Employee
 * 
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */

Ext.define('DanteFrontend.store.Employees', {
    extend: 'Ext.data.Store',
    
    model: 'DanteFrontend.model.Month',
    proxy: {
        type: 'direct',
        api: {
            read: userController.listEmployeesByLoggedUser
        }
    },
    autoLoad: false
});