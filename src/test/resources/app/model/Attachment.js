/**
 * Attachment
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 9, 2011
 */

Ext.define('DanteFrontend.model.Attachment', {
    extend: 'Ext.data.Model',
    
    //proxy: DanteFrontend.test.MemoryProxy.inst('attachment'),
    
    fields: [{
        name: 'id', type: 'int'
    },{
        name: 'fileName', type: 'string'
    }]
});
