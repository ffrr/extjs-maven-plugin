/**
 * BalanceInfo
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Sep 29, 2011
 */

Ext.define('DanteFrontend.view.budget.BalanceInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-budget-balanceinfo',

    config: {
        record: null
    },

    initComponent: function() {
        this.balanceRenewalStrategyStore = Ext.data.StoreManager.lookup('budget.BalanceRenewalStrategies');

        var config = {
            tpl: new Ext.XTemplate(
                '<div class="budget-info">',
                '<div class="budget-info-primary"><tpl for="primary">',
                    '<div class="budget-field"><label for="{name}" class="field-label">{label}</label><span id="{name}" class="field-value">{value}</span></div>',
                '</tpl></div>',
                '<div class="budget-info-secondary"><tpl for="secondary">',
                    '<div class="budget-field"><label for="{name}" class="field-label">{label}</label><span id="{name}" class="field-value">{value}</span></div>',
                '</tpl></div>',
                '</div>'
            )
        }

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    },

    loadRecord: function(rec, b) {
        var p = Ext.Date.patterns.SK;
        if(b) {
            this.update(this.tpl.apply({
                primary: [{
                    name: 'type', label: g('Balance renewal'), value: this.balanceRenewalStrategyStore.getById(rec.get('balanceRenewalStrategy_id')).get('name')
                },{
                    name: 'current', label: g('Current total'), value: b.get('currentTotal') + ' &#8364'
                },{
                    name: 'initial', label: g('Transfers from previous balance'), value: b.get('transferred') ? b.get('transferred') + ' &#8364':'-' + ' &#8364'
                }],
                secondary: [{
                    name: 'period', label: g('Valid between'), value: b.get('from') ? Ext.Date.format(b.get('from'), p):'?' + ' - ' + b.get('to') ? Ext.Date.format(b.get('to'), p):'?'
                },{
                    name: 'credit', label: g('Credit'), value: b.getTotalCredit() + ' &#8364'
                },{
                    name: 'spent', label: g('Spent'), value: b.getTotalSpending() + ' &#8364'
                },{
                    name: 'nextcredit', label: g('Next credit date'), value: rec.get('nextBalanceRenewal') ? Ext.Date.format(rec.get('nextBalanceRenewal'), p):'-'
                }]
            }));
        }
    }
});