/**
 * Overview root
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */

Ext.define('DanteFrontend.view.budget.manage.Root', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-budget-manage',


    initComponent: function() {
        Ext.apply(this, {
            layout: 'border',
            region: 'center',
            border: false,
            //split: true,
            margins: '-5 0 0 0',
            items: [{
//                xtype: 'df-budget-list',
//                region: 'west',
//                flex: .3,
//                margin: '2 0 2 2',
//                split: true,
//                toolbar: true
//            },{
//                xtype: 'df-budget-manage-details',
//                region: 'center',
//                flex: .7,
//                margin: '2 2 2 0',
//                border: true
//            },{
                title: g('Manage budgets'),
                xtype: 'df-msedit',
                region: 'center',
                store: 'budget.Budgets',
                briefGridConfig: {
                    xtype: 'df-budget-list',
                    width: 230
                },
                editor: {
                    xtype: 'df-budget-manage-details'
                }
            }]
        });



        this.callParent(arguments);
    }

});
