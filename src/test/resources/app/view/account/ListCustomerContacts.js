/**
 * ListCustomerContacts
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.view.account.ListCustomerContacts', {
    extend: 'DanteFrontend.lib.view.Grid',
    alias: 'widget.df-account-listcc',

    addItemText: g('Add'),
    removeItemText: g('Remove'),
    emptyText: g('No customer contacts defined.'),

    initComponent: function() {
        var config =  {
            columns: [{
                id: 'name', //is name necessary?
                header: g('Contacts'),
                dataIndex: 'name',
                renderer: this.contactRowRenderer,
                width: 180
            }]
        };
        
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    },


    contactRowRenderer: function(value, metadata, record, rowIndex, colIndex, store) {
        return Ext.String.format('<div class="contact-grid-row-customer">\n\
            <div class="customer-name">{0}</div>\n\
            <div class="customer-add">{1}</div></div>', value, record.data.email);
    }
});