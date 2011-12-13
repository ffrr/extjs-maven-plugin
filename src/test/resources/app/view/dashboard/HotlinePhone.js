/**
 * HotlinePhone
 * 
 * @author fk
 * @version 0.1
 * @date Jun 3, 2011
 */


Ext.define('DanteFrontend.view.dashboard.HotlinePhone', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-dashboard-hotlinephone',

    
    frame: true,
    split: true,
    
    initComponent: function() {
        Ext.apply(this, {
            title: g('Telephone Hotline Contact'),
            items: [
                {
                    xtype: 	'box',
                    autoEl: {
                        tag:	'div',
                        cls:	'dante-dashboard-hotline-phone',
                        html:	res('text.hotlinePhoneNumber')
                    }
                }
            ]
        });
        this.callParent(arguments);
    }
});