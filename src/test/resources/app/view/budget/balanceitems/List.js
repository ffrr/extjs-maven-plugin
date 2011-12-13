/**
 * List
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 6, 2011
 */

Ext.define('DanteFrontend.view.budget.balanceitems.List', {
    extend: 'DanteFrontend.lib.view.Grid',
    alias: 'widget.df-budget-balanceitems-list',


    initComponent: function() {
        this.budgetStore = Ext.data.StoreManager.lookup('budget.Budgets');
        this.confirmationStatusStore = Ext.data.StoreManager.lookup('budget.ConfirmationStatuses');
        this.itemTypeStore = Ext.data.StoreManager.lookup('budget.BalanceItemTypes');

        Ext.apply(this, {
            toolbar: true,
            store: 'budget.BalanceItems',
            columns: [{
                header: g('Date'),
                dataIndex: 'receivedOn',
                width: 75,
                format: Ext.Date.patterns.SK,
                xtype: 'datecolumn'
            },{
                header: g('Budget'),
                dataIndex: 'budget_id',
                width: 80,
                renderer: function(v, md, r) {
                    return this.budgetStore.getById(r.get('budget_id')).get('title');
                }
            },{
                header: '&nbsp;',
                width: 15,
                dataIndex: 'direction_id',
                renderer: DanteFrontend.view.Renderers.budget.direction,
                scope: this            
            },{
                header: g('Type'),
                width: 65,
                dataIndex: 'type_id',
                renderer: this.typeRenderer    
            },{
                header: g('Description'),
                dataIndex: 'description',
                flex: 1
            },{
                header: g('Grand total'),
                dataIndex: 'grandTotal',
                width: 65,
                renderer: DanteFrontend.view.Renderers.sum
            },{
                header: g('Status'),
                dataIndex: 'confirmationStatus_id',
                renderer: this.statusRenderer,
                width: 80
            },{
                header: g('Created by'),
                dataIndex: 'createdBy',
                renderer: DanteFrontend.view.Renderers.userNameRenderer,
                width: 80
            }]
        });
        this.callParent(arguments);
    },

    getDefaultToolbarConfig: function() {
        return {
            buttonAlign: 'left',
            items: [{
                action: 'addExpense',
                text: g('Add expense'),
                scope: this,
                iconCls: 'icon-add'
            },{
                action: 'addIncome',
                text: g('Add income'),
                scope: this,
                iconCls: 'icon-add'
            },'|',{
                action: 'removeItem',
                text: g('Remove'),
                handler: this.removeItem,
                scope: this,
                iconCls: 'icon-remove'
            }]
        };
    },
    
    addItem: function(rec) {
        if(!this.hasNewRecord) {
            this.hasNewRecord = true; ;
            this.getStore().add(rec);
            this.getSelectionModel().select(rec);
            this.fireEvent('itemadded', this, rec);
        }
    },

    typeRenderer: function(v, md, rec) {
        var type = this.itemTypeStore.getById(rec.get('type_id'));
        return type ? type.get('name'):'-';
    },

    statusRenderer: function(v, md, rec) {
        var status = this.confirmationStatusStore.getById(rec.get('confirmationStatus_id'));
        return status ? status.get('name'):'-';
    },
    
    directionRenderer: function(v, md, r) {
        var dir = r.get('direction_id');
        md.tdCls = "direction-" + dir;
    }
});