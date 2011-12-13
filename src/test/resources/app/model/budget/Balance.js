/**
 * Balance
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 27, 2011
 */


Ext.define('DanteFrontend.model.budget.Balance', {
    extend: 'Ext.data.Model',

    fields: [{
        name:'id',
        type: 'int'
    },{
        name: 'generatedTitle',
        type: 'string'
    },{
        name: 'from',
        type: 'date',
        dateFormat: Ext.Date.patterns.ISO8601Long
    },{
        name: 'to',
        type: 'date',
        dateFormat: Ext.Date.patterns.ISO8601Long
    },{
        name: 'currentTotal',
        type: 'float'
    },{
        name: 'endingTotal',
        type: 'float'
    },{
        name: 'transferred',
        type: 'float'
    },{
        name: 'initialCredit',
        type: 'float'
    },{        
        name: 'previousBalance_id',
        mapping: 'previousBalance',
        type: 'int'
    },{
        name: 'budget_id',
        mapping: 'budget',
        type: 'int'
    }],
    
    associations: [{
        type: 'hasMany', model: 'DanteFrontend.model.budget.BalanceItem', autoLoad: true, primaryKey: 'id', foreignKey: 'balance', name: 'balanceItems'
    }],

    
    getBudget: function() {
        var id = this.get('budget_id');
        return Ext.data.StoreManager.lookup('budget.Budgets').getById(id);
    },

    getTotalCredit: function() {
        var s = Ext.data.StoreManager.lookup('budget.CurrentBalanceItems');
        var sum = 0;
        s.each(function(r) {
            if(r.get('direction_id') == 0 && r.get('balance_id') == this.getId()) {
                sum += r.get('grandTotal');
            }
        }, this);

        return sum;
    },

    getTotalSpending: function() {
        var s = Ext.data.StoreManager.lookup('budget.CurrentBalanceItems');
        var sum = 0;
        s.each(function(r) {
            if(r.get('direction_id') == 1 && r.get('balance_id') == this.getId()) {
                sum += r.get('grandTotal');
            }
        }, this);

        return sum;
    }

});
