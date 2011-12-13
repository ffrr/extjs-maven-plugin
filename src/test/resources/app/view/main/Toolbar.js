/**
 * View: MainToolbar
 * Main application toolbar widget.
 * 
 * @author fk
 * @version 0.1
 * @date May 27, 2011
 */
Ext.Img.override({
    initRenderTpl: Ext.emptyFn
});

Ext.define('DanteFrontend.view.main.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.df-main-toolbar',

    initComponent: function() {
        Ext.apply(this, {
            height: 36,
            layout: 'hbox',
            items: [{
                xtype: 'box',
                width: 100,
                height: 30,
                id: 'digmia-logo',
                margins:  '0 0 0 0'
            },'-',
            DanteFrontend.toolbar
            ,'-',{
                xtype:    'box',
                autoEl: {
                    html: res('text.loggedIn')
                }
            },' ',{
                xtype:    'button',
                action: '/logout/',
                text: '<b>Logout</b> from Dante'
            }]
        });
        this.callParent(arguments);
    }

});
