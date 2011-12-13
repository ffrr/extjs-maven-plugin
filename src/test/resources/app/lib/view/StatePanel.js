/**
 * StatePanel
 * Panel with switchable content, showing by default an empty panel with default text.
 * 
 * @author fk
 * @version 0.1
 * @date Oct 7, 2011
 */


Ext.define('DanteFrontend.lib.view.StatePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-statepanel',

    config: { currentWidget: null },
    defaultState: null,
    
    initComponent: function() {
        var config = {
            layout: 'fit',
            border: false,
            items: [],
            defaultState: this.defaultState || 'empty'
        };

        this.initialConfig.content.push(
            { ref: 'empty', border: false, xtype: 'panel', html: this.initialConfig.emptyText || g('Empty panel') }
        );

        Ext.each(this.initialConfig.content, function(conf) {
            this[this._refFn(conf.ref)] = this[this._refFn(conf.ref)] || function() {
                this._showWidgetByConf(conf);
            }
        }, this);


        Ext.apply(this, Ext.apply(this.initialConfig, config));

        this.on('afterrender', function() {
            if(!this.getCurrentWidget())
                this[this._refFn(this.defaultState)]();
        }, this);
        
        this.callParent(arguments);
    },

    showWidget: function(ref) {
        this[this._refFn(ref)]();
    },

    _createWidget: function(conf) {
//        if(Ext.isEmpty(this.widgetCache[conf.ref])) {
//            this.widgetCache[conf.ref] = Ext.widget(conf.xtype, conf);
//        }
//        return this.widgetCache[conf.ref];

        return Ext.widget(conf.xtype, conf)
    },
    
    _refFn: function(ref) {
        return 'show'+ Ext.String.capitalize(ref);
    },

    _showWidgetByConf: function(conf) {
        var w = this._createWidget(conf);
        if(this.getCurrentWidget())
            this.remove(this.getCurrentWidget(), true);
        this.setCurrentWidget(w);
        this.add(w);
    }

});