/**
 * CurrentBalance
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 29, 2011
 */

Ext.define('DanteFrontend.view.budget.dashboard.Overview', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-budget-dashboard-overview',

    config: {
        record: null
    },

    initComponent: function() {            
        var config = {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'df-budget-list',
                border: false,
                width: 150,
                toolbar: false,
                title: g('Budgets overview')
            },{
                layout: { type: 'hbox', align: 'stretch'},
                cls: 'keep-left-border',
                flex: 1,
                title: '&nbsp;',
                ref: 'balancePanel',
                dockedItems: [{
                    xtype: 'toolbar',
                    style: 'border-width: 1px 0 1px 1px !important;',
                    dock: 'top',
                    items: [{
                        store: 'budget.Balances',
                        name: 'balance_id',
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'generatedTitle',
                        xtype: 'combo',
                        allowBlank: false,
                        width: 148,
                        forceSelection: true,
                        lastQuery: '',
                        triggerAction: 'all',
                        editable: false,
                        margin: '0 2 0 2'
                    },'|',{
                        xtype: 'button',
                        ref: 'prevBalance',
                        text: g('Previous balance'),
                        iconCls: 'x-tbar-page-prev'
                    },{
                        xtype: 'button',
                        ref: 'nextBalance',
                        text: g('Next balance'),
                        iconCls: 'x-tbar-page-next',
                        iconAlign: 'right'
                    }]
                }],
                items: [{
                    width: 160,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    border: false,
                    defaults: {
                        border: false
                    },
                    items: [{
                        xtype: 'df-budget-balanceinfo',
                        padding: '6'
                    },{
                        xtype: 'df-budget-dashboard-refill',
                        padding: '6 0 0 0',
                        height: 70
                    }]
                },{
                    xtype: 'df-budget-dashboard-currentbalanceitems',
                    flex: 1,
                    border: true,
                    cls: 'keep-left-border',
                    title: g('Current balance items')
                }]
            }]
        };
        
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    },

    tipTextRenderer: function(t) {
        return g('Balance') + t.value;
    }

});