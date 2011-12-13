/**
 * Items
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 5, 2011
 */

Ext.define('DanteFrontend.view.order.details.ItemsEditor', {
    extend: 'Ext.panel.Panel',
    alias: 'df-order-details-itemseditor',

    initComponent: function() {
        var config = {
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    }
});