/**
 * HotlineEmailQueues
 * 
 * @author fk
 * @version 0.1
 * @date Jun 3, 2011
 */

Ext.define('DanteFrontend.store.dashboard.HotlineEmailQueues', {
    extend: 'Ext.data.Store',
    
    model: 'DanteFrontend.model.EmailQueue',
    proxy:  {
        type: 'ajax',
        url: res('url.hotlineEmail'),
        reader: {
            type: 'json',
            root: 'rows'
        }

    },
    autoLoad: false
});