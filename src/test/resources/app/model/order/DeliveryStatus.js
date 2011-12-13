/**
 * DeliveryStatus
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 12, 2011
 */

Ext.define('DanteFrontend.model.order.DeliveryStatus', 
    DanteFrontend.lib.model.Conf.enumKey({
        extend: 'Ext.data.Model',
        proxyData: [{
            id: 0,
            name: g('In negotiation'),
            enumKey: 'IN_NEGOTIATION'
        },{
            id: 1,
            name: g('Undelivered'),
            enumKey: 'UNDELIVERED'
        },{
            id: 2,
            name: g('Partly delivered'),
            enumKey: 'PARTLY_DELIVERED'
        },{
            id: 3,
            name: g('Fully delivered'),
            enumKey: 'FULLY_DELIVERED'
        }]
}));