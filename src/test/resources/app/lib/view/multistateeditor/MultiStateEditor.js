/**
 * MultiStateEditor
 * Universal editor with multiple states:
 * - full list
 * - mini-list + editor
 *
 * TODO: - view caching with store reload?
 *
 * @author fk
 * @version 0.1
 * @date Aug 4, 2011
 */


Ext.define('DanteFrontend.lib.view.multistateeditor.MultiStateEditor', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-msedit',

    /**
     * Configuration for the brief editor column.
     */
    briefGridConfig: {
        column: {
            /**
             * which column of 'fullColumns' config to use as base column of the brief editor
             * @required
             */
            dataIndex: null,
            /**
             * base column template
             * @alternate('tpl', 'renderer')
             */
            tpl: '',
            /**
             * base column renderer
             * @alternate('tpl', 'renderer')
             */
            renderer: null
        }
    },

    /**
     *
     */
    

    config: {
        currentState: null,
        currentIndex: null,
        previousIndex: null,
        selectedRecord: null
    },


    initComponent: function() {
        
        this.states = new Ext.util.MixedCollection();
        this.states.addAll({
            fullGrid: {
                selector: '*[ref=grid-full]',
                view: null
            },
            editorWithBriefGrid: {
                selector: '*[ref=editor-grid-brief]',
                view: null
            },
            editor: {
                selector: '*[ref=editor]',
                view: null
            },
            briefGrid: {
                selector: '*[ref=grid-brief]',
                view: null
            }
        });

        this.addEvents('selectitem', 'createitem');

        var config =  {
            //autoScroll: true,
            border: false,
            layout: {
                type: 'fit'
            },
            startState: this.getStartState(),
            items: [],
            tools: [{
                type: 'prev',
                renderTpl: DanteFrontend.view.Renderers.tool(g('back to full list')),
                handler: function() {
                    this.loadFullGrid();
                },
                scope: this
//            },{
//                type: 'toggle',
//                renderTpl: DanteFrontend.view.Renderers.tool(g('hide filter')),
//                handler: function() {
//                    this.toggleFilter();
//                },
//                scope: this
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));

        this.store = Ext.data.StoreManager.lookup(this.initialConfig.store);

        this.store.on('aftersync', this.onStoreSync, this);

        this.on('render', this.onEditorReady, this);
        this.callParent();
    },

    
    getStartState: function() {
        if(!this.initialConfig.fullGridConfig) return 'editorWithBriefGrid';
        return this.initialConfig.startState || 'fullGrid';
    },

    onEditorReady: function() {
        this['load' + Ext.String.capitalize(this.startState)]();
    },

    onStoreSync: function() {
        var v = this.getView('briefGrid');
        if(v) {
            v.getView().select(this.getCurrentIndex());
            this.selectBriefGridItem(this.store.getAt(this.getCurrentIndex()));
        }
    },


    onNewItem: function(v, r) {
        this.setSelectedRecord(r);
        this.fireEvent('createitem', r);
    },

    onRemovedItem: function(v, r) {
        var rec = this.store.getAt(0);
        if(rec)
            this.selectBriefGridItem(rec);

    },

    onFullGridNewItem: function(v, r) {
        this.confirmFullGridItem(r);
        this.onNewItem(v, r);
    },


    loadFullGrid: function() {
        this.loadStateView('fullGrid');
        this.down('tool[type=prev]').hide();
    },

    loadEditorWithBriefGrid: function(rec) {
        var prevTool = this.down('tool[type=prev]');
        if(Ext.isEmpty(rec)) {
            rec = this.store.first();
        }
        if(this.initialConfig.fullGridConfig) prevTool.show();
        else prevTool.hide();
        this.loadStateView('editorWithBriefGrid');

        if(rec) {
            this.query('*[ref=grid-brief]').shift().getSelectionModel().select(rec);
            this.selectBriefGridItem(rec);
        }
    },
    
    getView: function(viewName) {
        return this.query(this.states.get(viewName).selector).shift();
    },

    getStateByName: function(stateName) {
        return this.states.get(stateName);
    },

    loadStateView: function(stateName) {
        this.resetState();
        this.add(this.instantiateView(stateName));
        this.setCurrentState(this.getStateByName(stateName));
    },
    
    resetState: function() {
        if(!Ext.isEmpty(this.getCurrentState())) {
            this.remove(this.getCurrentState().view, false);
            //this.getCurrentState().view = null;
        }

    },

    instantiateView: function(stateName) {
        var state = this.states.get(stateName), instance, conf,
            postProcessor = this['process' + Ext.String.capitalize(stateName)] || false;
        if(Ext.isEmpty(state.view)) {
            conf = this['get' + Ext.String.capitalize(stateName) + 'ViewConfig'](stateName);
            state.view  = postProcessor ?
                postProcessor(Ext.widget(conf.xtype, conf)):Ext.widget(conf.xtype, conf);
        }
        return state.view;
    },

    // listener handlers
    
    confirmFullGridItem: function(rec) {
        this.loadEditorWithBriefGrid(rec);
    },

    selectBriefGridItem: function(rec) {
        this.setSelectedRecord(rec);
        this.fireEvent('selectitem', rec);
    },

    setSelectedRecord: function(rec) {
        this.setPreviousIndex(this.getCurrentIndex());
        this.setCurrentIndex((!Ext.isEmpty(rec.index)) ?
            rec.index:this.store.lastIndex);

        if(rec.phantom) {
            this.setCurrentIndex(this.store.getCount() - 1);
        }
        
        this._selectedRecord = rec;
    },

    getSelectedRecord: function() {
        return this._selectedRecord;
    },
    
    // configuration getters

    /**
     * A base state view config: a full grid panel. Double clicking an item
     * switches to brief grid with editor state.
     */
    getFullGridViewConfig: function() {
        var lst = this.fullGridConfig.listeners || {};
        lst = {
            itemdblclick: function(v, r) { this.confirmFullGridItem(r); },
            itemadded: this.onFullGridNewItem,
            scope: this
        };

        Ext.apply(this.fullGridConfig, {
            store: this.store,
            xtype: 'df-grid',
            listeners: lst,
            flex: 1,
            border: false,
            bodyStyle: 'border-width: 1px 0 1px 0',
            toolbar: true
        });

        var items = [];

        if(!Ext.isEmpty(this.filterConfig)) {
            Ext.apply(this.filterConfig, {
                xtype: this.filterConfig.xtype || 'df-filter',
                height: 62,
                store: this.store
            });
            items.push(Ext.clone(this.filterConfig));
        }

        items.push(Ext.clone(this.fullGridConfig));

        return {
            xtype: 'panel',
            ref: 'fullGrid',
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: items
        };
    },
    
    /**
     * A base state view config: a border-layout panel with brief grid and editor.
     */
    getEditorWithBriefGridViewConfig: function() {
        return {
            animate: true,
            border: false,
            layout: {
                type: 'border'
            },
            xtype: 'panel',
            ref: 'editorWithBriefGrid',
            items: [
                Ext.apply({
                    region: 'west',
                    //flex: this.briefGridConfig.splitterFlex,
                    //width: 230,
                    split: true,
                    //frame: true,
                    margin: '2 0 2 2'
                }, this.getBriefGridViewConfig()),
                Ext.apply({
                    //frame: true,
                    region: 'center',
                    margin: '2 2 2 0'
                }, this.getEditorViewConfig())
            ]
        };
    },
    
    /**
     * Get brief grid view config: a one-column aggregated list, allowing to
     * quickly switch between edited items.
     */
    getBriefGridViewConfig: function() {
        var bgc = this.briefGridConfig,
            fgc = this.fullGridConfig,
            briefColumn = null,
            config = null;


        //select column from full grid config
        if(!Ext.isEmpty(fgc) && !Ext.isEmpty(fgc.columns)) {
            Ext.Array.each(fgc.columns, function(col) {
                if(col.dataIndex == bgc.column.dataIndex) {
                    briefColumn = Ext.clone(col);
                    return false;
                }
                return true;
            });
            Ext.apply(briefColumn, bgc.column);
            Ext.apply({ flex: 1 }, briefColumn);
        //apply column from brief grid config
        } else {
                briefColumn = bgc.column;
            //or don't apply anything and rely on xtype
        }

        var lst = bgc.listeners || {};

        lst = {
            scope: this,
            itemclick: function(v, r) {
                this.selectBriefGridItem(r);
            },
            itemadded: this.onNewItem,
            itemremoved: this.onRemovedItem
        };

        var gridConfig  = {
            toolbar: true,
            xtype: bgc.xtype || 'df-grid',
            store: this.store,
            ref: 'grid-brief',
            listeners: lst };

        if (briefColumn) gridConfig.columns = [briefColumn];
        else if (!bgc.xtype)
            throw new Ext.Error('You need to either specify the ' +
                'brief list xtype, or the brief column config.');

        Ext.apply(gridConfig, bgc);

        if(gridConfig.showFilter) {
            Ext.apply(this.filterConfig, {
                xtype: this.filterConfig.xtype || 'df-filter',
                height: 62,
                store: this.store
            });
            
            config = {
                layout: { type: 'vbox', align: 'stretch' },
                items: [this.filterConfig, gridConfig],
                flex: gridConfig.flex,
                border: false
            }
        } else {
            config = gridConfig;
        }
        
        
        return config;
    },

    /**
     * Get editor view config:  a form based on 'df-form' widget.
     */
    getEditorViewConfig: function() {
        return Ext.apply({
            ref: 'editor',
            accessor: {
                scope: this,
                fn: this.getSelectedRecord
            }
        }, this.initialConfig.editor);
    }
});