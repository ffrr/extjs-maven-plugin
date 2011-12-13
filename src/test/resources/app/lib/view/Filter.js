/**
 * Filter
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Aug 16, 2011
 */

Ext.define('DanteFrontend.lib.view.Filter', {
    extend: 'Ext.form.Panel',
    alias: 'widget.df-filter',
    
    labelAlign: 'top',
    store: null,
    
    initComponent: function() {

        this.types =  ['date', 'numeric', 'boolean', 'list', 'string', 'month'];

        this.processItems(this.items);
        this.parseFilters(this.items);

        if(Ext.isEmpty(this.store)) {
            Ext.Error.raise('You need to define a store for a filter!');
        }

        this.items.push([{
            xtype: 'button',
            ref: 'apply',
            text: g('Apply'),
            margin: '10 0 0 6',
            iconCls: 'btn-applyfilter'
        },{
            xtype: 'button',
            ref: 'clear',
            text: g('Clear'),
            margin: '10 0 0 6',
            iconCls: 'btn-clearfilter'
        }]);
        
        var config = {
            border: false,
            padding: 6,
            layout: {
                type: 'hbox'
            },
            defaults: {
                labelAlign: 'top',
                margin: '0 6 0 0'
            },
            appliedFilters: []
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);

        this.store = Ext.isString(this.store) ?
            Ext.data.StoreManager.lookup(this.store):this.store;

        this.store.on('beforeload', this.onBeforeStoreLoad, this);
        this.on('render', function() {
            var nav = new Ext.util.KeyNav(this.getEl(), {
                "enter" : this.applyFilters,
                "esc": this.clearFilters,
                scope : this
            });
            
        }, this);
        
        this.on('destroy', function() {
            this.store.un('beforeload', this.onBeforeStoreLoad, this);
        }, this);
        
        this.query('button[ref=apply]').shift().setHandler(this.applyFilters, this);
        this.query('button[ref=clear]').shift().setHandler(this.clearFilters, this);

    },


    processItems: function(items) {
        var processor = function(i) {
            i.emptyText = '<' + g('not filtered') + '>';
        }
        Ext.each(items, processor, this);
    },

    parseFilters: function(items) {
        this.filters = [];

        var parser = function(item) {
            var fType, confProcessor;
            fType = Ext.isString(item.filter) ?
                item.filter: Ext.isObject(item.filter) ? item.filter.type:null;

            confProcessor = (fType == 'month') ? 'monthConfProcessor':'defaultConfProcessor';
            if(Ext.Array.contains(this.types, fType))  {
                this[confProcessor](this.filters, fType, item);
            }
            else Ext.Error.raise('Unknown filter type: ' + fType);
        };

        Ext.each(items, parser, this);
    },

    defaultConfProcessor: function(filters, fType, item) {
        var incomingConf = Ext.isString(item.filter) ? {}:item.filter;
        filters.push(Ext.apply(
            {field: item.name, type: fType}, Ext.applyIf(incomingConf, {
            comparison: 'eq'
        })));
    },

    monthConfProcessor: function(filters, fType, item) {
        filters.push({field: item.name, type: 'date', month: true, comparison: 'gt'});
        filters.push({field: item.name, type: 'date', month: true, comparison: 'lt'});
    },

    processDefaultValue: function(filter, value) {
        return value;
    },

    processMonthValue: function(filter, value) {
        var begin = Ext.Date.parse('1/'+ value, Ext.Date.patterns.MonthFilter, true);
        if(filter.comparison === 'gt') {
            return Ext.Date.format(begin, 'Y-m-d 00:00:00');
        } else {
            return Ext.Date.format(begin, 'Y-m-t 23:59:59')
        }
    },

    applyFilters: function() {
        //prevent duplication
        this.appliedFilters = [];
        Ext.each(this.filters, function(f) {
            var field = this.getForm().findField(f.field);
            var valueProcessorName = (f.hasOwnProperty('month') && f.month) ? 'month':'default';
            if (!Ext.isEmpty(field.getValue())) this.appliedFilters.push(
                Ext.apply(f, {value: this['process' +
                    Ext.String.capitalize(valueProcessorName) + 'Value'](f, field.getValue())
                })
            );
        }, this);


        if(!Ext.isEmpty(this.appliedFilters)) {
            this.store.load();
//{
//                callback: function() {
//                    if(this.store.sorters.getCount()) {
//                        this.store.sort();
//                    }
//                },
//                scope: this
//            }            
            //this.store.clearFilter();
            //this.store.filter(appliedFilters);
        } else {
            this.clearFilters();
            DanteFrontend.lib.Notify.base.success(g('Empty filters'),
                g('Cleared all filters.'));
        }
    },

    onBeforeStoreLoad: function(store, options) {
        options.params = {} || options.params;
        Ext.apply(options.params, {filter: this.appliedFilters});
    },

    clearFilters: function() {
        this.appliedFilters = [];
        this.store.load();
        this.getForm().reset();
    }
    
//    buildQuery : function (filters) {
//        var p = {}, i, f, root, dataPrefix, key, tmp,
//            len = filters.length;
//
//        if (!this.encode){
//            for (i = 0; i < len; i++) {
//                f = filters[i];
//                root = [this.paramPrefix, '[', i, ']'].join('');
//                p[root + '[field]'] = f.field;
//
//                dataPrefix = root + '[data]';
//                for (key in f.data) {
//                    p[[dataPrefix, '[', key, ']'].join('')] = f.data[key];
//                }
//            }
//        } else {
//            tmp = [];
//            for (i = 0; i < len; i++) {
//                f = filters[i];
//                tmp.push(Ext.apply(
//                    {},
//                    {field: f.field},
//                    f.data
//                ));
//            }
//            // only build if there is active filter
//            if (tmp.length > 0){
//                p[this.paramPrefix] = Ext.JSON.encode(tmp);
//            }
//        }
//        return p;
//    },
//
//    cleanParams : function (p) {
//        // if encoding just delete the property
//        if (this.encode) {
//            delete p[this.paramPrefix];
//        // otherwise scrub the object of filter data
//        } else {
//            var regex, key;
//            regex = new RegExp('^' + this.paramPrefix + '\[[0-9]+\]');
//            for (key in p) {
//                if (regex.test(key)) {
//                    delete p[key];
//                }
//            }
//        }
//    },
//
//    getFilterData : function (filters) {
//        var out = [], i, len;
//
//        filters.each(function (f) {
//            if (f.active) {
//                var d = [].concat(f.serialize());
//                for (i = 0, len = d.length; i < len; i++) {
//                    out.push({
//                        field: f.dataIndex,
//                        data: d[i]
//                    });
//                }
//            }
//        });
//        return out;
//    }
});
