/**
 * BalanceRenewalStrategies
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.store.budget.ConfirmationUsersAmounts', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    data:  [{
        id: 0,
        name: g('No one')
    },{
        id: 1,
        name: g('One user')
    },{
        id: 2,
        name: g('All users')
    }]
});