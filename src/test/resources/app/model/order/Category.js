/**
 * Category
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 12, 2011
 */
Ext.define('DanteFrontend.model.order.Category', 
    DanteFrontend.lib.model.Conf.enumKey({
        extend: 'Ext.data.Model',
        proxyData: [{
            id: 1,
            name: g('Category 1')
        },{
            id: 2,
            name: g('Category 2')
        }]
}));