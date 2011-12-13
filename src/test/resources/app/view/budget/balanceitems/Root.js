/**
 * Root
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 4, 2011
 */


Ext.define('DanteFrontend.view.budget.balanceitems.Root', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-budget-balanceitems',


    initComponent: function() {
        var config = {
            layout: 'border',
            region: 'center',
            border: false,
            margins: '-5 0 0 0',
            items: [{
                region: 'center',
                title: g('Balance items'),
                xtype: 'df-msedit',
                store: 'budget.BalanceItems',
                filterConfig: {
                    xtype: 'df-budget-balanceitems-filter'
                },
                briefGridConfig: {
                    xtype: 'df-budget-balanceitems-list',
                    flex: .7,
                    showFilter: true
                },
                editor: {
                    xtype: 'df-budget-balanceitems-details',
                    flex: .3
                }
            }]
//            items: [{
//
//            },{
//                flex: 1,
//                layout: 'border',
//                margin: 2,
//                items: [{
//                    region: 'west',
//                    title: g('Balance items list'),
//                    xtype: 'df-budget-balanceitems-list',
//                    border: false,
//                    flex: .7
//                },{
//                    region: 'center',
//                    flex: .3,
//                    layout: 'fit',
//                    border: false,
//                    items: [{
//                        xtype: 'df-statepanel',
//                        emptyText: g('No balance item selected'),
//                        ref: 'details',
//                        content: [{
//                            xtype: 'df-budget-balanceitems-expensedetails',
//                            border: false,
//                            ref: 'expenseForm'
//                        },{
//                            xtype: 'df-budget-balanceitems-incomedetails',
//                            ref: 'incomeForm',
//                            border: false
//                        }]
//                    }]
//                }]
//            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));

        this.callParent(arguments);
    }

});

