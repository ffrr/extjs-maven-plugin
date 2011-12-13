/**
 * ComboWithAdd
 * 
 * @author fk
 * @version 0.1
 * @date Sep 8, 2011
 */

Ext.define('DanteFrontend.lib.view.ComboboxWithAdd', {
    extend: 'Ext.form.field.ComboBox',

    alias: 'widget.df-combo-add',
    
    initComponent: function() {
        Ext.apply(this, Ext.apply(this.initialConfig, {
            clearable: false,
            listConfig: {
                pageSize: 2,
                maxHeight: 200
            }
        }));
        this.callParent(arguments);
    },


    createPicker: function() {
        var me = this,
            picker,
            menuCls = Ext.baseCSSPrefix + 'menu',
            opts = Ext.apply({
                selModel: {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                },
                floating: true,
                hidden: true,
                ownerCt: me.ownerCt,
                cls: me.el.up('.' + menuCls) ? menuCls : '',
                store: me.store,
                displayField: me.displayField,
                focusOnToFront: false,
                pageSize: me.pageSize,
                tpl: me.tpl,
                addHandler: Ext.bind(me.onAdd, me)
            }, me.listConfig, me.defaultListConfig);

        picker = me.picker = Ext.create('DanteFrontend.lib.view.BoundListWithAdd', opts);
        //picker = me.picker = Ext.create('Ext.view.BoundList', opts);

        me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            selectionChange: me.onListSelectionChange,
            scope: me
        });
        
        return picker;
    },
    
    onAdd: function() {
        var f = this.addForm;
        if(Ext.isObject(f) || Ext.isString(f)) this.openAddWindow();
    },

    openAddWindow: function() {
        var f = this.addForm;
        var formConfig = Ext.apply({
            listeners: {
                render: this.hookButtonActions,
                scope: this
            }
        }, Ext.isObject(f) ? f:{})

        this.form = Ext.widget(Ext.isObject(f) ? f.xtype:f, formConfig);

        var rec = this.store.getDefaultModel();
        this.store.add(rec);
        this.form.loadRecord(rec);
        this.form.setRecordAccessor(function(){return rec;}, this);
        
        this.modal = Ext.widget('df-window', {
            title: this.windowTitle || this.getDefaultWindowTitle(),
            id: 'addItemModal',
            layout: 'fit',
            width: 250,
            height: 150,
            items: this.form
        });
        this.modal.show();
    },


    getDefaultWindowTitle: function() {
        return g("Add") + " " +
            this.store.model.getName().split(".").pop().toLowerCase();
    },

    hookButtonActions: function(f) {
        f.down('toolbar button[action=save]').on('click', this.addItem, this);
        f.down('toolbar button[action=cancel]').on('click', this.cancelItem, this);
    },

    addItem: function() {
        var f = this.form;
        this.latestRec = f.accessRecord();

        f.validateAndUpdate();
        this.store.sync();
        this.modal.destroy();
        delete this.form;
    },

//    onListRefresh: function() {
//        this.callParent(arguments);
//        console.log(this.latestRec);
//        if(!Ext.isEmpty(this.latestRec)) {
//            this.select(this.findAddedItem(this.latestRec));
//        }
//    },


    cancelItem: function() {
        this.modal.destroy();
    },

    findAddedItem: function(r) {
        return this.store.getAt(this.store.find('name', r.get('name')));
    }

});


Ext.define('DanteFrontend.lib.view.BoundListWithAdd', {
    extend: 'Ext.view.BoundList',


    initComponent: function() {
        this.callParent();

        this.addEvents(['additem']);
        
        // a little hack which avoids the need to override the layout,
        // and replaces the paging toolbar with an add-item toolbar
        this.pagingToolbar = this.createAddingToolbar();

        this.tpl =  Ext.create('Ext.XTemplate',
            '<div class="list-ph"></div><ul><tpl for=".">',
                '<li role="option" class="x-boundlist-item">' + '{' + this.displayField + '}' + '</li>',
            '</tpl></ul>'
        );
    },
    
    createAddingToolbar: function(w) {
        return Ext.widget('toolbar', {
            style: 'border-width: 1px 0 0 0',
            items: {
                text: g('Add new item ...'),
                handler: this.addHandler
            },
            layout: {
                type: 'hbox',
                pack: 'start'
            },
            bindStore: Ext.emptyFn
        });
    },
    
    onDestroy: function() {
        this.callParent(arguments);
        Ext.destroyMembers(this, 'addingToolbar');
    }


});