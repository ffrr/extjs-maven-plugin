/**
 * Window
 * A basic preconfigured window.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.lib.view.Window', {
    extend: 'Ext.Window',
    alias: 'widget.df-window',

    initComponent: function() {
        var config =  {
            //autoScroll: true,
            border: false,
            layout:'fit',
            modal: true,
            shadow: false,
            stateful: false //always fall back to default size
        };
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        
        this.callParent(arguments);
    }
});