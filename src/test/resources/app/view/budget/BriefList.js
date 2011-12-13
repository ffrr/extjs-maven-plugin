/**
 * BriefList
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 28, 2011
 */
Ext.define('DanteFrontend.view.budget.BriefList', {
    extend: 'DanteFrontend.lib.view.Grid',
    alias: 'widget.df-budget-list',

    initComponent: function() {
        this.purposeStore = Ext.data.StoreManager.lookup('budget.Purposes');
        this.balanceStore = Ext.data.StoreManager.lookup('budget.Balances');
        Ext.apply(this, {
            hideHeaders: true,
            xtype: 'df-grid',
            region: 'center',
            store: 'budget.Budgets',
            columns: [{
                dataIndex: 'title',
                renderer: this.summaryRenderer,
                scope: this,
                flex: 1
            }]
        });

        this.summaryTpl = new Ext.Template('<div class="row-brief">',
            '<div class="brief-left"><span class="brief-title">{title}</span>',
            '<span class="brief-subtitle">{purpose}</span></div>',
            '<div class="brief-right"><span class="brief-title">{currentTotal} &#8364;</span>',
            '<span class="brief-subtitle">{daysLeft}</span></div>',
            '</div>', { compiled: true });

        this.callParent(arguments);
    },

    summaryRenderer: function(value, md, record) {
        var daysLeft = record.getRemainingDays();
        var cb = this.balanceStore.getById(record.get('currentBalance_id'));
        return this.summaryTpl.apply({
            title: record.get('title'),
            purpose: this.purposeStore.getById(record.get('purpose_id')).get('name'),
            currentTotal: cb ? cb.get('currentTotal'):"-",
            daysLeft: daysLeft ? daysLeft + " days left":""
        });
    }
});