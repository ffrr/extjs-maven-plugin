/**
 * Editor
 * Editor component base.
 *
 * TODO:
 * - think about the layout (it should be possible to use this without the list, if necessary.
 * 
 * 
 * @author fk
 * @version 0.1
 * @date Jul 27, 2011
 */


Ext.define('DanteFrontend.lib.view.Editor', {
    extend: 'Ext.panel.Panel',

    initComponent: function() {
        var config = {};

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        Ext.apply(this, config); //unnecessary

        this.callParent(arguments);
    }
});