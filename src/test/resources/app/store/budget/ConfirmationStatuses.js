/**
 * BalanceRenewalStrategies
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.store.budget.ConfirmationStatuses', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    data:  [{
        id: 0,
        name: g('Not required')
    },{
        id: 1,
        name: g('Not confirmed')
    },{
        id: 2,
        name: g('Partly confirmed')
    },{
        id: 3,
        name: g('Fully confirmed')
    }]
});