/**
 * Grid
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.lib.view.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.df-grid',


    addItemText: g('Add'),
    removeItemText: g('Remove'),
    emptyText: g('No items defined.'),

    initComponent: function() {
        this.hasNewRecord = false;
        var config = {
            deferEmptyText: false,
            bbar: this.toolbar ? (this.initialConfig.bbar !== undefined ?
                this.initialConfig.bbar : this.getDefaultToolbarConfig()) : null
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));

        this.addEvents('itemadded', 'itemremoved', 'itemselected');
            //override of the default selectionchange event

        this.callParent(arguments);

        this.getStore().on('aftersync', function(s, o) {
           this.hasNewRecord = false;
        }, this);

        this.on('selectionchange', this.onSelectionChange, this);

        var initGrid = function() {
            this.hasNewRecord = false;
            if (this.getStore().count() > 0) this.getSelectionModel().select(0);
            else this.toggleRemoveButton(false);
        };
        
        this.getStore().on('load', initGrid, this);
        this.on('render', initGrid, this);

        this.on('beforedestroy', function() {
            this.getStore().un('load', initGrid, this);
        }, this);
    },


    getDefaultToolbarConfig: function() {
        return {
                buttonAlign: 'left',
                items: [{
                    action: 'addItem',
                    text: this.addItemText,
                    handler: this.addItem,
                    scope: this,
                    iconCls: 'icon-add'
                },'|',{
                    action: 'removeItem',
                    text: this.removeItemText,
                    handler: this.removeItem,
                    scope: this,
                    iconCls: 'icon-remove'
                }]
        };
    },

    addItem: function() {
        if(!this.hasNewRecord) {
            this.hasNewRecord = true; ;
            var rec = this.getStore().getDefaultModel();
            this.getStore().add(rec);
            this.getSelectionModel().select(rec);
            this.fireEvent('itemadded', this, rec);
        }
    },

    removeItem: function() {
        var store = this.getStore();
        var selModel = this.getSelectionModel();
        var record = selModel.getSelection().shift();
        if(!Ext.isEmpty(record)) {
            if(record.phantom) {
                this.hasNewRecord = false;
            }
            store.removeAt(store.indexOf(record))
            store.sync();
            this.fireEvent('itemremoved', record, this);
        }
    },


    //privee
    toggleRemoveButton: function(bool) {
        var btn = this.down('toolbar button[action=removeItem]');
        if (btn)
            bool ? btn.enable():btn.disable();
    },

    onSelectionChange: function(v, s) {
        this.toggleRemoveButton(!Ext.isEmpty(s));
        this.fireEvent('itemselected', v, s);
    }
});