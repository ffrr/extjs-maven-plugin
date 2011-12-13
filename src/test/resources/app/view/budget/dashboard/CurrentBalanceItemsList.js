/**
 * CurrentBalanceItems
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 3, 2011
 */

Ext.define('DanteFrontend.view.budget.dashboard.CurrentBalanceItemsList', {
    extend: 'DanteFrontend.lib.view.Grid',
    alias: 'widget.df-budget-dashboard-currentbalanceitems',


    initComponent: function() {
        this.typeStore = Ext.data.StoreManager.lookup('budget.BalanceItemTypes')
        Ext.apply(this, {
            toolbar: false,
            store: 'budget.CurrentBalanceItems',
            columns: [{
                header: g('Created'),
                dataIndex: 'createdOn',
                width: 75,
                xtype: 'datecolumn',
                format: Ext.Date.patterns.SK
            },{
                header: '&nbsp;',
                width: 15,
                dataIndex: 'direction_id',
                renderer: DanteFrontend.view.Renderers.budget.direction,
                scope: this
            },{
                header: g('Description'),
                dataIndex: 'description',
                flex: 1
            },{
                header: g('Grand total'),
                dataIndex: 'grandTotal',
                renderer: DanteFrontend.view.Renderers.budget.directionSum,
                width: 65,
                scope: this
            },{
                header: g('Running total'),
                dataIndex: 'runningTotal',
                width: 80,
                renderer: DanteFrontend.view.Renderers.sum
            }]
        });
        
        this.callParent(arguments);
    }
});