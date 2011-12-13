/**
 * Details
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 6, 2011
 */


Ext.define('DanteFrontend.view.budget.balanceitems.ExpenseDetailsForm', {
    extend: 'DanteFrontend.lib.view.Form',
    alias: 'widget.df-budget-balanceitems-expensedetails',

    initComponent: function() {

        this.employeeStore = Ext.data.StoreManager.lookup('Employees');
        this.confirmationStatusStore = Ext.data.StoreManager.lookup('budget.ConfirmationStatuses');
        this.confirmationReasonStore = Ext.data.StoreManager.lookup('budget.ConfirmationReasons');
        var config = {
            title: g('Expense details'),
            layout: {
                type: 'fit'
            },
            items: [{
                xtype: 'tabpanel',
                border: false,
                margin: 4,
                defaults: {
                    border: false
                },
                items: [{
                    title: g('Details'),
                    ref: 'details',
                    layout: 'anchor',
                    defaults: {
                        labelAlign: 'top',
                        anchor: '90%'
                    },
                    padding: 8,
                    items: [{
                        layout: { type: 'hbox', align: 'stretch'},
                        border: false,
                        height: 60,
                        defaults: { labelAlign: 'top'},
                        items:[{
                            xtype: 'datefield',
                            name: 'receivedOn',
                            fieldLabel: g('Date received'),
                            flex: .5,
                            margin: '0 6 0 0'
                        },{
                            xtype: 'combo',
                            store: 'budget.Budgets',
                            name: 'budget_id',
                            emptyText: g('Select budget ...'),
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'title',
                            xtype: 'combo',
                            allowBlank: false,
                            fieldLabel: g('Budget'),
                            flex: .5
                        }]
                    },{
                        layout: { type: 'anchor'},
                        defaults: { anchor: '100%' },
                        xtype: 'fieldset',
                        padding: '6 0 6 12',
                        title: g('Price'),
                        items: [{
                            layout: { type: 'hbox', align: 'stretch'},
                            border: false,
                            height: 50,
                            defaults: { 
                                labelAlign: 'top', margin: '0 12 0 0',
                                listeners: {
                                    change: this.recalculate,
                                    scope: this
                                }
                            },
                            items:[{
                                xtype: 'numberfield',
                                name: 'amount',
                                fieldLabel: g('Amount'),
                                flex: .3,
                                step: 1,
                                minValue: 1
                            },{
                                xtype: 'numberfield',
                                name: 'total',
                                decimalPrecision: 2,
                                fieldLabel: g('Total'),
                                flex: .3,
                                step: .10,
                                minValue: 0
                            },{
                                xtype: 'numberfield',
                                name: 'grandTotal',
                                decimalPrecision: 2,
                                fieldLabel: g('Grand total'),
                                flex: .3,
                                step: .10,
                                minValue: 0
                            }]
                        }]
                    },{
                        xtype: 'textareafield',
                        height: 120,
                        fieldLabel: g('Description'),
                        name: 'description'
                    }]
                },{
                    title: g('Associated employees'),
                    layout: 'fit',
                    ref: 'associatedEmployees',
                    padding: '8 12 22 8',
                    items: {
                        store: 'budget.BalanceItemEmployees',
                        xtype: 'df-grid-adding',
                        fieldConfig: {
                            name: 'id',
                            store: 'Employees',
                            emptyText: g('Find employee ...'),
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'name',
                            xtype: 'combo'
                        },
                        columns: [{
                            flex: 1,
                            header: g('Employee'),
                            dataIndex: 'name',
                            renderer: this.userNameRenderer,
                            scope: this
                        }]
                    }
                },{
                    title: g('Confirmation'),
                    ref: 'confirmation',
                    layout: {type: 'vbox', align: 'stretch' },
                    padding: '8 12 22 8',
                    defaults: {
                        labelAlign: 'top',
                        labelWidth: 150
                    },
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: g('Status'),
                        labelAlign: 'left',
                        name: 'confirmationStatus_id'
                    },{
                        xtype: 'displayfield',
                        fieldLabel: g('Reason for confirmation'),
                        labelAlign: 'left',
                        name: 'confirmationReason_id'
                    },{
                        xtype: 'label',
                        text: g('Confirming users'),
                        margin: '5 0 0 0'
                    },{
                        fieldLabel: g('Users'),
                        store: 'budget.ConfirmingUsers',
                        xtype: 'df-budget-confirmationgrid',
                        toolbar: true,
                        flex: 1,
                        columns: [{
                            flex: 1,
                            header: g('User'),
                            dataIndex: 'user_id',
                            renderer: this.userNameRenderer,
                            scope: this
                        }],
                        margin: '0 0 10 0'
                    }]
                }]
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    },

    userNameRenderer: function(v, md, r) {
        return this.employeeStore.getById(r.get('user_id')).get('name');
    },
    
    
    recalculate: function(field, newValue) {
        var total = this.down('numberfield[name=total]'),
            grandTotal = this.down('numberfield[name=grandTotal]'),
            vat = (100.0 + this.getRecord().get('vatRate')) / 100.0;

        if(field.getName() == total.getName()) {
            grandTotal.setValue(newValue * vat);
        }
                
        if(field.getName() == grandTotal.getName()) {
            total.setValue(newValue / vat);
        }   
    },
    
    loadRecord: function(rec) {
        this.callParent(arguments);
        var reason = this.confirmationReasonStore.getById(rec.get('confirmationReason_id')),
            status = this.confirmationStatusStore.getById(rec.get('confirmationStatus_id')),
            reasonFld = this.down('displayfield[name=confirmationReason_id]'),
            statusFld = this.down('displayfield[name=confirmationStatus_id]');
            
        reasonFld.setRawValue(reason.get('name'));
        statusFld.setRawValue(status.get('name'));
    }
    
    
});
