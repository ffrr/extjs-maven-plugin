/**
 * ExpenseConfirmationList
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 5, 2011
 */

Ext.define('DanteFrontend.view.budget.dashboard.ExpenseConfirmation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-budget-expenseconfirmation',

    config: {
        handlerScope: null,
        confirmHandler: Ext.emptyFn,
        unconfirmHandler: Ext.emptyFn
    },

    initComponent: function() {
        this.budgetStore = Ext.data.StoreManager.lookup('budget.Budgets');
        //this.balanceStore = Ext.data.StoreManager.lookup('budget.Balances');

        this.detailTpl = Ext.create('Ext.XTemplate', [
            '<div class="budget-expenseitem-details"><dl>',
                '<div class="detail-date"><dt>Date</dt><dd>{receivedOn:date(Ext.Date.patterns.SK)}</dd></div>',
                '<div class="detail-status"><dt>Status</dt><dd>{confirmationStatus}</dd></div>',
                '<div class="detail-grandTotal"><dt>Grand total</dt><dd>{grandTotal} &#8364;</dd></div>',
                '<div class="detail-reason"><dt>Reason</dt><dd>{confirmationReason}</dd></div>',
                '<div class="detail-employees"><dt>Employees</dt><dd>{associatedEmployees}</dd></div>',
                '<div class="detail-description"><dt>Description</dt><dd>{description}</dd></div>',
            '</dl></div>'
        ]);

        if(!this.getHandlerScope()) this.setHandlerScope(this);

        Ext.apply(this, {
            //
            layout: {type: 'vbox', align: 'stretch'},
            items: [{
                xtype: 'df-budget-dashboard-expenseconfirmationfilter',
                height: 60,
                store: 'budget.ConfirmableBalanceItems'
            },{
                toolbar: false,
                xtype: 'df-grid',
                flex: 1,
                region: 'center',
                store: 'budget.ConfirmableBalanceItems',
                border: false,
                columns: [{
                    dataIndex: 'budget',
                    width: 65,
                    header: g('Budget'),
                    renderer: function(v, md, r) {
                        return this.budgetStore.getById(r.get('budget_id')).get('title');
                    },
                    scope: this
                },{
                    dataIndex: 'description',
                    flex: 1,
                    header: g('Description')
                },{
                    dataIndex: 'grandTotal',
                    width: 60,
                    header: g('Grand total'),
                    renderer: DanteFrontend.view.Renderers.sum
                },{
                    dataIndex: 'confirmationStatus_id',
                    width: 100,
                    header: g('Status'),
                    renderer: DanteFrontend.view.Renderers.budget.status
                },{
                    xtype:'actioncolumn',
                    width: 30,
                    items: [{
                        icon: media('/img/add.png'),
                        tooltip: g('Confirm'),
                        ref: 'confirm',
                        iconCls: 'action action-confirm',
                        getClass: this.actionRenderer,
                        handler: function() {
                            this.getConfirmHandler().apply(this.getHandlerScope(), arguments);
                        },
                        scope: this
                    },{
                        icon: media('/img/delete.png'),
                        tooltip: g('Unconfirm'),
                        ref: 'unconfirm',
                        iconCls: 'action action-unconfirm',
                        getClass: this.actionRenderer,
                        handler: function() {
                            this.getUnconfirmHandler().apply(this.getHandlerScope(), arguments);
                        },
                        scope: this
                    }]
                }]
            },{
                xtype: 'panel',
                ref: 'detail',
                region: 'south',
                height: 130,
                html: g('Please select an expense item.'),
                bodyStyle: 'border-width: 1px 0 0 0;'
            }]
        });

        this.callParent(arguments);
    },
    
    updateDetails: function(data) {
        data.confirmationReason =
            Ext.data.StoreManager.lookup('budget.ConfirmationReasons')
            .getById(data.confirmationReason_id).get('name');
        data.confirmationStatus =
            Ext.data.StoreManager.lookup('budget.ConfirmationStatuses')
            .getById(data.confirmationStatus_id).get('name');                        
        if(this.down('panel[ref=detail]').rendered) {
            this.detailTpl.overwrite(this.down('panel[ref=detail]').body, data);
        }
    },

    actionRenderer: function(v, md, r) {
        md.css = 'confirmationStatus-' + (r.isConfirmable() ? 0:1);
    }
});