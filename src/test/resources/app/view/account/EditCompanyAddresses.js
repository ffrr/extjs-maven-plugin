/**
 * EditCompanyAddresses
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */


Ext.define('DanteFrontend.view.account.EditCompanyAddresses', {
    extend: 'DanteFrontend.lib.view.Form',
    alias: 'widget.df-account-editcompanyaddr',

    initComponent: function() {
        var config = {
            bodyCls: 'base',
            paramsAsHash: true,
            padding: '8',
            border: false,
            items: [{
                xtype:'fieldset',
                title: g('Postal address'),
                autoHeight: true,
                items :[{
                    layout: 'column',
                    xtype: 'panel',
                    border: false,
                    items: [{
                        columnWidth: .5,
                        defaultType: 'textfield',
                        defaults: {anchor: '90%'},
                        border: false,
                        layout: 'anchor',

                        items: [{
                            name: 'postalId',
                            xtype: 'hidden'
                        },{
                            fieldLabel: g('Name'),
                            name: 'postalName'
                        },{
                            fieldLabel: g('Street'),
                            name: 'postalStreet1'

                        },{
                            fieldLabel: g('Municipality'),
                            name: 'postalMunicipality'

                        }]//eo panel
                    },{
                        columnWidth: .5,
                        defaultType: 'textfield',
                        defaults: {anchor: '90%'},
                        layout: 'anchor',
                        border: false,
                        items: [{
                            fieldLabel: g('Person'),
                            name: 'postalPerson'
                        },{
                            fieldLabel: g('Street (add)'),
                            name: 'postalStreet2'

                        },{
                            fieldLabel: g('Postal code'),
                            name: 'postalPostalCode',
                            width: 120,
                            maxLength: 6

                        }]//eo panel
                    }]
                }]//eo columnpanel
            },{
                xtype:'fieldset',
                checkboxToggle: true,
                collapsed: true,
                //collapsible: true,
                ref: 'billingAddressPanel',
                title: g('Billing address (different from postal address)'),
                autoHeight: true,
                items :[{
                    layout: 'column',
                    xtype: 'panel',
                    border: false,
                    items: [{
                        columnWidth: .5,
                        defaults: {anchor: '90%'},
                        layout: 'anchor',
                        defaultType: 'textfield',
                        border: false,
                        items: [{
                            name: 'billingId',
                            xtype: 'hidden'
                        },{
                            fieldLabel: g('Name'),
                            name: 'billingName'
                        },{
                            fieldLabel: g('Street'),
                            name: 'billingStreet1'

                        },{
                            fieldLabel: g('Municipality'),
                            name: 'billingMunicipality'

                        }]//eo panel
                    },{
                        columnWidth: .5,
                        defaults: {anchor: '90%'},
                        layout: 'anchor',
                        defaultType: 'textfield',
                        border: false,
                        items: [{
                            fieldLabel: g('Person'),
                            name: 'billingPerson'
                        },{
                            fieldLabel: g('Street (add)'),
                            name: 'billingStreet2'

                        },{
                            fieldLabel: g('Postal code'),
                            name: 'billingPostalCode',
                            width: 120,
                            maxLength: 6
                        }]//eo panel
                    }]
                }]//eo columnpanel
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);

    }

});