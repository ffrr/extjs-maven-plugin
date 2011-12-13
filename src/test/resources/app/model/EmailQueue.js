/**
 * EmailQueue
 * 
 * @author fk
 * @version 0.1
 * @date Jun 3, 2011
 */

Ext.define('DanteFrontend.model.EmailQueue', {
    extend: 'Ext.data.Model',

    fields: ['queue_email', 'queue_name'],
    idProperty: ['queue_email']
});