/**
 * SupplierDetails
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 8, 2011
 */

/**
 * BasicForm
 * ..description..
 *
 * @author fk
 * @version 0.1
 * @date Aug 5, 2011
 */

Ext.define('DanteFrontend.view.customer.SupplierDetails', {
    extend: 'DanteFrontend.lib.view.Form',
    alias: 'widget.df-customer-supplier-details',


    initComponent: function() {
        var config = {
            border: false,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                border: false
            },
            items: [{
                layout: 'anchor',
                title: g('Basic information'),
                xtype: 'fieldset',
                defaultType: 'textfield',
                flex: 1,
                margin: 4,
                defaults: {
                    labelWidth: 120,
                    labelAlign: 'top',
                    anchor: '100%',
                    maxWidth: 250
                },
                items: [{
                    name: 'id',
                    xtype: 'hidden'
                },{
                    fieldLabel: g('Supplier name'),
                    name: 'name',
                    allowBlank: false
                }]
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }

});

//                },{
//                    fieldLabel: g('Category'),
//                    queryModel: 'local',
//                    name: 'category_id',
//                    store: 'order.Categories',
//                    emptyText: g('Select category ...'),
//                    valueField: 'id',
//                    displayField: 'name',
//                    xtype: 'combo',
//                    flex: 1
//                },{
//                    fieldLabel: g('Associated project'),
//                    name: 'project_id',
//                    store: 'CurrentProjects',
//                    emptyText: g('Select project ...'),
//                    valueField: 'id',
//                    displayField: 'name',
//                    xtype: 'combo'
