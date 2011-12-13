/**
 * Budget
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 27, 2011
 */

Ext.define('DanteFrontend.model.budget.Budget', {
    extend: 'Ext.data.Model',

    fields: [{
        name:'id',
        type: 'int'
    },{
        name: 'title',
        type: 'string'
    },{
        name: 'purpose_id',
        mapping: 'purpose',
        type: 'int'
    },{
        name: 'description',
        type: 'string'
    },{
        name: 'currentBalance_id',
        mapping: 'currentBalance',
        type: 'int'
    },{
        name: 'maxItemPrice',
        type: 'float'
    },{
        name: 'confirmationUsersAmount_id',
        mapping: 'confirmationUsersAmount',
        type: 'int'
    },{
        name: 'confirmOnOverMaxItemPrice',
        type: 'boolean'
    },{
        name: 'confirmOnBalanceOverdraw',
        type: 'boolean'
    },{
        name: 'confirmAlways',
        type: 'boolean'
    },{
        name: 'renewalDayOfMonth',
        type: 'int'
    },{
        name: 'nextBalanceRenewal',
        type: 'date',
        dateFormat: Ext.Date.patterns.ISO8601Long
    },{
        name: 'balanceRenewalFrequency_id',
        mapping: 'balanceRenewalFrequency',
        type: 'int'
    },{
        name: 'balanceRenewalStrategy_id',
        mapping: 'balanceRenewalStrategy',
        type: 'int'
    },{
        name: 'balanceInitialCredit',
        type: 'float'
    },{
        name: 'automaticBalanceTransfer',
        type: 'boolean'
    }],

    associations: [{
        type: 'hasMany', model: 'DanteFrontend.model.budget.Category', autoLoad: true, associationKey: 'categories', getterName: 'getCategories', setterName: 'setCategories'
    }],

    statics: {
        instanceDefaults: {
            title: g('New budget'),
            purpose_id: 1,
            renewalDayOfMonth: 1,
            maxItemPrice: 0,
            balanceInitialCredit: 0,
            currentBalance: 1
        }
    },

    getRemainingDays: function() {
        var nextRenewal = this.get('nextBalanceRenewal');
        if(nextRenewal) {
            return Math.round((nextRenewal.getTime() - new Date().getTime()) / (86.4e6));
        }
    }
});
