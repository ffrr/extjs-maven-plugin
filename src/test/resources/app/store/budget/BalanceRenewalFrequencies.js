/**
 * BalanceRenewalFrequencies
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.store.budget.BalanceRenewalFrequencies', {
    extend: 'Ext.data.Store',
    fields: ['id', 'name'],
    data: [{
        id: 0,
        name: g('Monthly')
    },{
        id: 1,
        name: g('Quarterly')
    },{
        id: 2,
        name: g('Biannually')
    },{
        id: 3,
        name: g('Annually')
    }]

});