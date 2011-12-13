/**
 * Unit
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 12, 2011
 */

Ext.define('DanteFrontend.model.order.Unit', 
    DanteFrontend.lib.model.Conf.enumKey({
        extend: 'Ext.data.Model',
        proxyData: [
            { id: 0, name: g('pc') },
            { id: 1, name: g('hr') }
        ]

}));