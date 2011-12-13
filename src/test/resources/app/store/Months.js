/**
 * Months
 * 
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */
Ext.define('DanteFrontend.store.Months', {
    extend: 'Ext.data.Store',

    model: 'DanteFrontend.model.Month',
    proxy: {
        type: 'ajax',
        url: res('url.worklog.months'),
        reader: {
            type: 'json',
            root: 'rows'
        }
    },
    autoLoad: false
});
