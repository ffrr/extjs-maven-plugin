/**
 * DetailsForm
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 17, 2011
 */


Ext.define('DanteFrontend.view.budget.balanceitems.DetailsForm', {
    extend: 'DanteFrontend.lib.view.StatePanel',

    alias: 'widget.df-budget-balanceitems-details',

    initComponent: function() {
        var config = {
            emptyText: g('No balance item selected'),
            ref: 'details',
            content: [{
                xtype: 'df-budget-balanceitems-expensedetails',
                ref: 'expenseForm',
                accessor: this.initialConfig.accessor
            },{
                xtype: 'df-budget-balanceitems-incomedetails',
                ref: 'incomeForm',
                accessor: this.initialConfig.accessor
            }]
        };
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.delegateFormMethods();        
        this.callParent(arguments);
    },

    getExpenseForm: function() {
        return this.down('*[ref=expenseForm]');
    },

    getIncomeForm: function() {
        return this.down('*[ref=incomeForm]');
    },

    delegateFormMethods: function() {
        var methods = ['addValidationMessage', 'validateAndUpdate',
        'alertValidation', 'accessRecord', 'accessAndLoad', 'onBeforeSync',
        'onAfterSync'];
    
        Ext.each(methods, function(m) {
            var me = this, impl = {};
            impl[m] = function() {
                var delegate = me.getCurrentWidget();
                return delegate[m].apply(delegate, arguments);
            };

            this.self.implement(impl);
        }, this);
    }

});