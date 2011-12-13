/**
 * AddingGrid
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Oct 4, 2011
 */

Ext.define('DanteFrontend.lib.view.AddingGrid', {
    extend: 'DanteFrontend.lib.view.Grid',
    alias: 'widget.df-grid-adding',

    fieldConfig: null,
    
    initComponent: function() {
        var config = {
            toolbar: true,
            columns: this.getColumnConfig()
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    },

    getColumnConfig: function() {
        this.initialConfig.columns.push({
            xtype:'actioncolumn',
            width:20,
            items: [{
                icon: media('/img/delete.png'),
                iconCls: 'action',
                tooltip: g('Remove'),
                handler: this.removeItem,
                scope: this
            }]
        });
        return this.initialConfig.columns;
    },

    addItem: function() {
        var f = this.down('form'),
            rec = this.getStore().getDefaultModel();
            rec.set(f.getValues());
        if(rec.isValid())
            this.fireEvent('itemadded', this, rec);
        else
            DanteFrontend.lib.Notify.base.error(g('Validation error'), g('Please select a value ...') );

    },

    getDefaultToolbarConfig: function() {
        var parentConfig = this.callParent();

        var items = [{
            xtype: 'form',
            api: this.initialConfig.api,
            border: false,
            bodyStyle: 'background-color: transparent;',
            height: 23,
            width: 155,
            items: this.initialConfig.fieldConfig
        }];

        items.push(parentConfig.items[0]);
        items = Ext.Array.flatten(items);
        parentConfig.items = items;
        return parentConfig;
    }

});