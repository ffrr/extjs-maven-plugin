/**
 * HotlineEmail
 * 
 * @author fk
 * @version 0.1
 * @date Jun 3, 2011
 */

Ext.define('DanteFrontend.view.dashboard.HotlineEmail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.df-dashboard-hotlineemail',
    
    id:               'hotlineEmailForm',
    border:		true,
    frame:		true,
    region:		'center',
    split:		true,

    fieldDefaults: {
        labelAlign:	'top',
        labelWidth: 	110
    },
    bodyStyle:	'padding:5px 5px 0',

    initComponent: function() {
        var config = {
            title:		g('E-mail Hotline Contact'),
            api: {
                submit: dashboardController.sendHotlineEmail
            },
            defaultType: 	'textfield',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
            {
                xtype:          'combo',
                fieldLabel:     g('Request Queue'),
                queryMode:      'local',
                store:          'dashboard.HotlineEmailQueues',
                valueField:     'queue_email',
                displayField:   'queue_name',
                name: 'queue',
                forceSelection: true,
                editable: false,
                triggerAction:  'all',
                emptyText:      g('Please select request queue...'),
                typeAhead:      false
            },{
                fieldLabel:   g('Subject'),
                name: 	'subject'
            },
            new Ext.form.TextArea({
                fieldLabel:	g('Text'),
                name:		'message',
                flex: 1
            })],

            buttons: [{
                text: g('Send Request'),
                action: 'sendRequest'
            }]
        }
        
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
 
});