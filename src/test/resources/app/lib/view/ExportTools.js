/**
 * ExportTools
 * A common export toolbar for usage in grids.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */

Ext.define('DanteFrontend.lib.view.ExportTools', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.df-exporttools',
    gridId: '',

    initComponent: function() {
        Ext.apply(this, {
            items: [{
                //id: 'btn-no-export',
                xtype: 'button',
                text: g('Exporting is possible only when <b>Customer</b> is specified by the filter.'),
                hidden: true,
                disabled: true,
                ref: 'noexport'
            },{
                //id:       'btn-export-pdf',
                xtype:    'button',
                text:     g('Export as <b>PDF</b>'),
                cls:      'x-btn-text-icon',
                icon:     res('icon.exporttools.pdf'),
                action:   'pdf'
            },{
                //id:       'btn-export-csv',
                xtype:    'button',
                text:     g('Export as <b>CSV</b>'),
                cls:      'x-btn-text-icon',
                icon:     res('icon.exporttools.csv'),
                action:  'csv'
            },{
                //id:       'btn-export-xml',
                xtype:    'button',
                text:     g('Export as <b>XML</b>'),
                cls:      'x-btn-text-icon',
                icon:     res('icon.exporttools.xml'),
                action:  'xml'
            }]
        });

        this.callParent(arguments);

        Ext.each(this.query('button'), function(e) {
            e.on('click', function(btn) {
                window.location.href = approot('/'+
                        this.gridId + '/report/'+ btn.action);
            }, this);
        }, this);

    },

    enableExport: function() {
        Ext.each(this.query('button[action]'), function(c) {
            c.show();
        });
        this.down('button[ref=noexport]').hide();

    },

    disableExport: function() {
        Ext.each(this.query('button[action]'), function(c) {
            c.hide();
        });
        this.down('button[ref=noexport]').show();
    }

});
