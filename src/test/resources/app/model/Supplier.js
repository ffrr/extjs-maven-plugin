/**
 * Customer model
 * 
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */
Ext.define('DanteFrontend.model.Supplier', {
    extend: 'Ext.data.Model',
    proxy: DanteFrontend.test.MemoryProxy.inst('supplier'),
    fields: [{
        name: 'id', type: 'int'
    },{
        name: 'name', type: 'string'
    }]

});
