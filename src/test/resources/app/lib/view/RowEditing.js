/**
 * RowEditing
 * Override and extension of the slightly buggy RowEditing plugin.
 *
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.lib.view.RowEditing', {
    extend: 'Ext.grid.plugin.RowEditing',

    errorSummary: false,
    
    initEditor: function() {
        var me = this,
            grid = me.grid,
            view = me.view,
            headerCt = grid.headerCt;

        return Ext.create('Ext.grid.RowEditor', {
            autoCancel: me.autoCancel,
            errorSummary: false,
            fields: headerCt.getGridColumns(),
            hidden: true,


            editingPlugin: me,
            renderTo: view.el,


            //tooltip buggy, disabling completely
            showToolTip: Ext.emptyFn,
            hideToolTip: Ext.emptyFn,
            getToolTip: Ext.emptyFn,
            repositionTip: Ext.emptyFn
        });

    }
});