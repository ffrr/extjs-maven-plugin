/**
 * ItemType
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 12, 2011
 */

Ext.define('DanteFrontend.model.order.ItemType',
    DanteFrontend.lib.model.Conf.enumKey({
        extend: 'Ext.data.Model',
        proxyData: [
            { id: 0, name: g('Hardware') },
            { id: 1, name: g('Service') },
            { id: 2, name: g('Software') }
        ] 
}));