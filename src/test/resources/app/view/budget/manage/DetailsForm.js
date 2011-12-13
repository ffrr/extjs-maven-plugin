/**
 * DetailsForm
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 3, 2011
 */


Ext.define('DanteFrontend.view.budget.manage.DetailsForm', {
    extend: 'DanteFrontend.lib.view.Form',
    alias: 'widget.df-budget-manage-details',

    initComponent: function() {
        this.employeeStore = Ext.data.StoreManager.lookup('Employees');
        var config = {
            title: g('Budget details'),
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                border: false
            },
            items: [{
                defaults: {
                    border: false,
                    height: 270
                },
                layout: 'hbox',
                defaultType: 'textfield',
                items: [{
                    layout: 'anchor',
                    title: g('Basic information'),
                    xtype: 'fieldset',
                    flex: .4,
                    width: 250,
                    margin: '0 0 4 4',
                    defaults: {
                        labelWidth: 120,
                        labelAlign: 'top',
                        anchor: '90%',
                        margin: '0 0 10 0'
                    },
                    items: [{
                        fieldLabel: g('Title'),
                        xtype: 'textfield',
                        name: 'title'
                    },{
                        fieldLabel: g('Description'),
                        xtype: 'textareafield',
                        name: 'description',
                        height: 120
                    },{
                        layout: 'hbox',
                        defaults: {
                            labelWidth: 120,
                            labelAlign: 'top'
                        },
                        border: false,
                        items: [{
                            fieldLabel: g('Purpose'),
                            name: 'purpose_id',
                            store: 'budget.Purposes',
                            emptyText: g('Select purpose ...'),
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'name',
                            xtype: 'combo',
                            allowBlank: false,
                            anchor: '50%',
                            flex: .5,
                            margin: '0 10 0 0'
                        }]
                    }]
                },{
                    title: g('Confirmation policy'),
                    xtype: 'fieldset',
                    flex: .6,
                    margin: '0 4 0 4',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        defaults: {
                            labelWidth: 120,
                            labelAlign: 'top',
                            width: 170,
                            margin: '0 0 10 0'
                        },
                        margin: '0 10 0 0',
                        flex: .5,
                        border: false,
                        items: [{
                            xtype: 'checkboxgroup',
                            width: 220,
                            fieldLabel: g('Confirm balance items'),
                            columns: 1,
                            margin: '0 0 10 0',
                            labelWidth: 80,
                            items: [{
                                boxLabel: g('Always'),
                                name: 'confirmAlways'
                            },{
                                boxLabel: g('When balance overdrawn'),
                                name: 'confirmOnBalanceOverdraw'
                            },{
                                boxLabel: g('When item over max price'),
                                name: 'confirmOnOverMaxItemPrice'
                            }]
                        },{
                            fieldLabel: g('Maximum item price'),
                            name: 'maxItemPrice',
                            xtype: 'numberfield',
                            allowBlank: false
                        },{
                            fieldLabel: g('Confirmation required from'),
                            name: 'confirmationUsersAmount_id',
                            store: 'budget.ConfirmationUsersAmounts',
                            emptyText: g('Select number of users ...'),
                            queryMode: 'local',
                            valueField: 'id',
                            displayField: 'name',
                            xtype: 'combo',
                            allowBlank: false
                        }]
                    },{
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        border: false,
                        flex: .5,
                        items: [{
                            xtype: 'label',
                            text: g('Confirming users')
                        },{
                            store: 'budget.BudgetUsers',
                            xtype: 'df-grid-adding',
                            flex: 1,
                            margin: '0 0 10 0',
                            fieldConfig: {
                                store: 'Employees',
                                emptyText: g('Select user ...'),
                                queryMode: 'local',
                                valueField: 'id',
                                displayField: 'name',
                                xtype: 'combo',
                                name: 'user_id'
                            },
                            columns: [{
                                flex: 1,
                                header: g('User name'),
                                dataIndex: 'user_id',
                                renderer: this.userNameRenderer,
                                scope: this
                            }]
                        }]
                    }]
                }]
            },{
                title: g('Balance renewal'),
                xtype: 'fieldset',
                margin: '0 4 4 4',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    border: false
                },
                items: [{
                    defaults: {
                        labelWidth: 120,
                        labelAlign: 'top',
                        flex: .25,
                        margin: '0 10 0 0'
                    },
                    layout: {
                        type: 'hbox'
                    },
                    items: [{
                        fieldLabel: g('Balance renewal strategy'),
                        name: 'balanceRenewalStrategy_id',
                        store: 'budget.BalanceRenewalStrategies',
                        emptyText: g('Select strategy ...'),
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        xtype: 'combo',
                        allowBlank: false
                    },{
                        fieldLabel: g('Balance renewal frequency'),
                        name: 'balanceRenewalFrequency_id',
                        store: 'budget.BalanceRenewalFrequencies',
                        emptyText: g('Select frequency ...'),
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'name',
                        xtype: 'combo',
                        allowBlank: false
                    },{
                        xtype: 'fieldcontainer',
                        layout: { type: 'hbox' },
                        fieldLabel: g('Balance renewal on'),
                        combineErrors: false,
                        defaults: { hideLabel: true },
                        items: [{
                           name : 'renewalDayOfMonth',
                           xtype: 'numberfield',
                           width: 48,
                           allowBlank: false,
                           margin: { right: 5 }
                        },{
                           xtype: 'displayfield',
                           value: g('day of month'),
                           width: 80
                        }]
                    },{
                        fieldLabel: g('Initial balance credit'),
                        name: 'balanceInitialCredit',
                        xtype: 'numberfield',
                        allowBlank: false
                    }]
                },{
                    xtype: 'checkboxgroup',
                    width: 400,
                    margin: '10 0 0 0',
                    hideLabel: true,
                    columns: 1,
                    items: [
                        {boxLabel: g('Automatic transfer of balance totals between periods'), name: 'automaticBalanceTransfer'},
                    ]
                }]
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    },

    userNameRenderer: function(v, md, r) {
        return this.employeeStore.getById(r.get('user_id')).get('name');
    }
});
