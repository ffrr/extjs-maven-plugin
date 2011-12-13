/**
 * CustomerContact
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.view.account.EditCustomerContactDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-account-editccdetails',

    bodyCssClass: 'base',

    initComponent: function() {
        var config = {
            layout: 'anchor',
            defaults: {
                labelWidth: 70,
                anchor: '100%'
            },
            items: [{
                layout: 'column',
                border: false,
                items: [{
                    columnWidth: .6,
                    defaultType: 'textfield',
                    border: false,
                    defaults: {
                        labelWidth: 70,
                        anchor: '90%'
                    },
                    layout: 'anchor',
                    items: [{
                        name: 'id',
                        xtype: 'hidden'
                    },{
                        fieldLabel: g('Name'),
                        xtype: 'textfield',
                        name: 'name',
                        allowBlank: false
                    },{
                        fieldLabel: g('Phone'),
                        name: 'phone',
                        xtype: 'textfield'

                    }]
                },{
                    columnWidth: .4,
                    border: false,
                    items: [/*{
                        fieldLabel: g('Report format'),
                        name: 'reportFormat',
                        xtype: 'combo',
                        width: 140
                        //default-type etc.
                    },*/{
                        id:'receiveGroup',
                        xtype: 'checkboxgroup',
                        width: 110,
                        hideLabel: true,
                        columns: 1,
                        items: [
                            {boxLabel: g('Receive invoices'), name: 'receiveInvoices'},
                            {boxLabel: g('Receive reports'), name: 'receiveReports'}
                        ]
                    }]
                }]
            },{
                fieldLabel: g('Email'),
                name: 'email',
                xtype: 'textfield',
                vtype: 'email',
                allowBlank: false,
                width: 280
            },{
                fieldLabel: g('Description'),
                name: 'description',
                xtype: 'textarea',
                width: 280
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));

        this.callParent(arguments);
    }
});