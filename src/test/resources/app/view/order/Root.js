/**
 * Root
 * 
 * @author fk
 * @version 0.1
 * @date Aug 3, 2011
 */


Ext.define('DanteFrontend.view.order.Root', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-order-root',


    collapsible: false,
    border: false,
    margins: '-5 0 0 0',

    initComponent: function() {
        this.deliveryStatusStore = Ext.data.StoreManager.lookup('order.DeliveryStatuses');
        this.customerStore = Ext.data.StoreManager.lookup('Customers');
        Ext.apply(this, {
            layout: 'border',
            region: 'center',
            items: [{
                title: g('Orders'),
                xtype: 'df-msedit',
                region: 'center',
                store: 'order.Orders',
                dependentStores: ['order.Attachments'],
                filterConfig: {
                    xtype: 'df-order-filter'
                },
                fullGridConfig: {
                    columns: [{
                        header: g('Reference #'),
                        dataIndex:  'referenceId',
                        width: 100
                    },{
                        header: g('Customer'),
                        dataIndex:  'customer_id',
                        width: 100,
                        renderer: Ext.bind(function(v) {
                            var rec = this.customerStore.getById(v);
                            if(!Ext.isEmpty(rec)) return rec.get('name');
                        }, this)
                    },{
                        header: g('Summary'),
                        dataIndex:  'summary',
                        flex: 1
                    },{
                        header: g('Status'),
                        dataIndex:  'deliveryStatus_id',
                        width: 100,
                        renderer: Ext.bind(function(v) {
                            return this.deliveryStatusStore.getById(v).get('name');
                        }, this)
                    },{
                        header: g('Selling grand total'),
                        dataIndex: 'sellingGrandTotal',
                        width: 100,
                        renderer: function(v) {
                            return v + ' &#8364;';
                        }
                    },{
                        header: g('Date accepted'),
                        dataIndex: 'acceptedOn',
                        width: 100,
                        xtype: 'datecolumn',
                        format: Ext.Date.patterns.SK
                    }]
                },
                briefGridConfig: {
                    title: g('Brief list'),
                    column: {
                        dataIndex: 'referenceId',
                        renderer: this.descriptionRenderer,
                        scope: this,
                        flex: 1
                    },
                    flex: .3
                },
                editor: {
                    xtype: 'df-order-details'
                }
            }]
        });

        this.tpl = new Ext.Template('<div class="row-brief-order">',
            '<div class="order-left"><span class="order-referenceId">{referenceId}</span>',
            '<span class="order-customerName">{customerName}</span></div>',
            '<div class="order-right"><span class="order-sum">{total} &#8364;</span>',
            '<span class="order-deliveryStatusName deliveryStatus-{deliveryStatus}">{deliveryStatusName}</span></div>',
            '</div>', { compiled: true });
        
        this.callParent(arguments);
    },

    descriptionRenderer: function(value, md, record) {
        var customer = this.customerStore.getById(record.get('customer_id'));

        return this.tpl.apply({
            referenceId: record.get('referenceId'),
            customerName:  Ext.isEmpty(customer) ? g('No customer selected'):customer.get('name'),
            total: record.get('sellingGrandTotal'),
            deliveryStatusName: this.deliveryStatusStore.getById(record.get('deliveryStatus_id')).get('name'),
            deliveryStatus: record.get('deliveryStatus_id')
        });
    }



});