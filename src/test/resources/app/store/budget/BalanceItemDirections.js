/**
 * BalanceItemTypes
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 29, 2011
 */

Ext.define('DanteFrontend.store.budget.BalanceItemDirections', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    data: [{
        id: 0,
        name: g('Credit')
    },{
        id: 1,
        name: g('Withdrawal')
    }]
});