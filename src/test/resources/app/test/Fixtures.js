/**
 * OrderItems
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 9, 2011
 */

Ext.define('DanteFrontend.test.Fixtures', {
    singleton: true,

    orderItem: {
        result: [{
            id: 1,
            summary: 'Order item 01',
            amount: 4,
            supplierPrice: 100,
            deliveryPrice: 120,
            margin: 20,
            description: 'Some rather tedious and long description of the orderitem=1',
            supplier_id: 1,
            unit_id: 1,
            itemType_id: 1,
            order_id: 1
        },{
            id: 2,
            summary: 'Order item 02',
            amount: 2,
            supplierPrice: 220,
            deliveryPrice: 312,
            margin: 20,
            description: 'Some rather tedious and long description of the orderitem=2',
            supplier_id: 1,
            unit_id: 1,
            itemType_id: 1,
            order_id: 1
        },]
    },
    
    order: {
        result: [{
            id: 1,
            referenceId: '2011/055',
            summary: 'Some rather tedious and long description of the order=1',
            acceptedOn: '2010-01-01',
            customer_id: 1,
            deliverystatus_id: 1,
            category_id: 1,
            project_id: null
//            orderItems: [{
//                id: 1,
//                summary: 'Dell XH3049432 RAM 8MB, BLABLA',
//                amount: 4,
//                unit_id: 1,
//                supplierPrice: 100,
//                deliveryPrice: 120,
//                margin: 20,
//                description: 'Some rather tedious and long description of the orderitem=1'
//            }],
//            attachments: [{
//                id: 1,
//                fileName: 'attachment.jpg',
//                url: '/static/attachments/01.jpg'
//            }],
//            customer: {
//                id: 1,
//                name: 'Test, s.r.o.'
//            },
//            category: {
//                id: 1,
//                name: 'Category 1'
//            },
//            deliveryStatus: {
//                id: 1,
//                name: 'In negotiation'
//            }
        }]
    },

    attachment: {
        result: [{
            id: 1,
            fileName: 'attachment.jpg',
            url: '/static/attachments/01.jpg',
            order_id: 1
        },{
            id: 2,
            fileName: 'zmluva.doc',
            url: '/static/attachments/01.jpg',
            order_id: 1
        },{
            id: 3,
            fileName: 'dopyt.rtf',
            url: '/static/attachments/01.jpg',
            order_id: 2
        },{
            id: 4,
            fileName: 'ine.csv',
            url: '/static/attachments/01.jpg',
            order_id: 2
        }]
    },

    supplier: {
        result: [{
                id: 1,
                name: 'Westech'
            },{
                id: 2,
                name: 'Dell'
            },{
                id: 3,
                name: 'Cisco systems'
            }]
//    },
//
//    getData: function(model) {
//        return this.order;
    }

});