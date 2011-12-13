/**
 * RootWithExportTools
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 2, 2011
 */

/**
 * Root
 * Root worklog panel
 *
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */

/**
 * Root
 * Root worklog panel
 *
 * @author fk
 * @version 0.1
 * @date Jun 16, 2011
 */

Ext.define('DanteFrontend.view.worklog.RootWithExportTools', {
    extend: 'DanteFrontend.view.worklog.Root',
    alias: 'widget.df-worklog-root-et',
    requires: 'DanteFrontend.lib.view.ExportTools',

    initComponent: function() {
        this.timeLineBottomToolbar = { bbar: Ext.widget('df-exporttools', {gridId: 'worklog'}) };
        this.callParent(arguments);
    }
});