/**
 * Footer
 * The footer, showing basic info about the app.
 * 
 * @author fk
 * @version 0.1
 * @date May 27, 2011
 */

Ext.define('DanteFrontend.view.main.Footer', {
    extend: 'Ext.Component',
    alias: 'widget.df-main-footer',

    initComponent: function() {
        Ext.apply(this, {
            autoEl: {
                tag:    'div',
                cls:    'dante-copyright',
                html:   'Copyright &copy; 2009 - 2011 ' +
                        'Digmia s.r.o. All rights reserved'
            }
        });
        this.callParent(arguments);
    }
});