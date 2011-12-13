/**
 * BalanceRenewalStrategies
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.store.budget.BalanceRenewalStrategies', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    data:  [{
        id: 0,
        name: g('Manual')
    },{
        id: 1,
        name: g('Automatic')
    }]
});