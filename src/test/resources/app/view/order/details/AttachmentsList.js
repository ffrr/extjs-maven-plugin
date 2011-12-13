/**
 * Attachments
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 9, 2011
 */


Ext.define('DanteFrontend.view.order.details.AttachmentsList', {
    extend: 'DanteFrontend.lib.view.Grid',
    alias: 'widget.df-order-details-attachments',

    initComponent: function() {
        var config = {

        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
});

