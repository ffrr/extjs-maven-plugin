/**
 * FileGrid
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 17, 2011
 */


Ext.define('DanteFrontend.lib.view.FileGrid', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-grid-file',

    addItemText: g('Upload new'),
    removeItemText: g('Remove'),

    /**
     * Form api to handle the file uploads
     */
    api: null,

    config: {
        filter: null,
        submitParam: null,
        store: null
    },

    initComponent: function() {
        var config = {
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [Ext.apply(this.initialConfig, {
                xtype: 'grid',
                columns: this.initialConfig.columns || [{
                    header: g('Title'),
                    dataIndex: 'fileName',
                    flex: 1
                }],
                listeners: {
                    selectionchange: this.toggleRemove,
                    itemdblclick: this.download,
                    scope: this
                },
                bbar: {
                    buttonAlign: 'left',
                    items: [{
                        xtype: 'form',
                        baseParams: { csrfTkn: csrfTkn },
                        api: this.initialConfig.api,
                        border: false,
                        bodyStyle: 'background-color: transparent;',
                        height: 23,
                        width: 80,
                        items: {
                            xtype: 'filefield',
                            buttonOnly: true,
                            name: 'fileUpload',
                            buttonText: this.addItemText,
                            listeners: {
                                change: this.onFileSelected,
                                scope: this
                            }
                        }
                    },{
                        text: this.removeItemText,
                        handler: this.onRemove,
                        ref: 'remove',
                        scope: this
                    }]
                }
            })]
        };

        Ext.apply(this, config);
        this.callParent(arguments);
    },

    onRender: function() {
        this.callParent(arguments);
        this.setStore(this.down('*[xtype=grid]').getStore());
        this.removeButton = this.down('*[xtype=grid] toolbar button[ref=remove]');
        this.grid = this.down('*[xtype=grid]');
        this.toggleRemove();
    },

    onFileSelected: function(f) {
        this.setLoading(g('Uploading...'));
        var loadConf = {
            scope: this,
            callback: function() {
                this.setLoading(false);
            }
        };
        this.query('form').shift().submit({
            params: this.getSubmitParam(),
            success: function() {
                DanteFrontend.lib.Notify.base.success('Upload', g('File uploaded successfully.'));
                this.store.load(loadConf);
            },
            failure: function(f, a) {
                DanteFrontend.lib.Notify.base.error('Upload error', a.result.errorMessage);
                this.store.load(loadConf);
            },
            scope: this
        });
    },

    onRemove: function() {
        var record = this.grid.getSelectionModel().getLastSelected();
        this.getStore().remove(record);
        this.getStore().sync();
    },

    setFilter: function(filterObj) {
        this.filter = filterObj;
        this.setSubmitParam(filterObj);
        this.getStore().filter([this.filter]);
    },

    setSubmitParam: function(obj) {
        this.submitParam = {};
        this.submitParam[obj.property] = obj.value;
    },

    toggleRemove: function() {
        this.removeButton.setDisabled(
            Ext.isEmpty(this.grid.getSelectionModel().getLastSelected())
        );
    },

    download: function(v, r) {
        window.location = this.api.download + r.getId();
    }
});