/**
 * EditCompanyAddInfo
 * 
 * @author fk
 * @version 0.1
 * @date Jun 23, 2011
 */


Ext.define('DanteFrontend.view.account.EditCompanyAdditionalInfo', {
    extend: 'DanteFrontend.lib.view.Form',
    alias: 'widget.df-account-editcompanyaddinfo',

    initComponent: function() {
        var config = {
            bodyCls: 'base',
            paramsAsHash: true,
            padding: '8',
            border: false,
            items: [{
                xtype:'fieldset',
                title: g('Identifiers'),
                autoHeight: true,
                defaultType: 'textfield',
                items :[{
                    layout: 'column',
                    xtype: 'panel',
                    border: false,
                    items: [{
                        columnWidth: .5,
                        layout: 'anchor',
                        defaultType: 'textfield',
                        border: false,
                        items: [{
                            labelWidth: 60,
                            anchor: '90%',
                            fieldLabel: g('Trade ID'),
                            name: 'tradeID'
                        }]//eo panel
                    },{
                        columnWidth: .5,
                        layout: 'anchor',
                        defaultType: 'textfield',
                        border: false,
                        items: [{
                            labelWidth: 60,
                            anchor: '90%',
                            fieldLabel: g('Tax ID'),
                            name: 'taxID'
                        }]//eo panel
                    }]
                }]//eo columnpanel
            },{
                xtype:'fieldset',
                layout: 'anchor',
                title: g('Communication'),
                autoHeight: true,
                defaultType: 'textfield',
                items :[{
                    layout: 'column',
                    xtype: 'panel',
                    border: false,
                    items:[{
                        columnWidth: .5,
                        layout: 'anchor',
                        defaultType: 'textfield',
                        //defaults: {anchor: '90%'},
                        border: false,
                        items: [{
                            anchor: '90%',
                            labelWidth: 60,
                            fieldLabel: g('Web'),
                            name: 'web'
                        }]//eo panel
                    },{
                        columnWidth: .5,
                        layout: 'anchor',
                        defaultType: 'textfield',
                        //defaults: {anchor: '90%'},
                        border: false,
                        items: [{
                            anchor: '90%' ,
                            labelWidth: 60,
                            fieldLabel: g('Email'),
                            name: 'email'
                        }]//eo panel
                    }]//eo panel
                    },{
                    anchor: '45%',
                    padding: '8 0 0 0',
                    labelWidth: 100,
                    fieldLabel: g('Email att format'),
                    xtype: 'combo',
                    triggerAction: 'all',
                    lazyRender: true,
                    mode: 'local',
                    name: 'emailFormat',
                    store: Ext.create('Ext.data.ArrayStore', {
                        id: '0',
                        fields: [
                            'emailFormat',
                            'description'
                        ],
                        data: [[0, 'XML'],[1, 'PDF'], [2, 'XLS'], [3, 'CSV']]
                    }),
                    valueField: 'emailFormat',
                    displayField: 'description'
                }]//eo columnpanel
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);

    }

});
