/**
 * PartialController
 * A controller class corresponding to partial views.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 30, 2011
 */

Ext.define('DanteFrontend.lib.PartialController', {
    extend: 'Ext.app.Controller',
    config: {
        parent: null
    },

    partialInit: function(parent) {
        this.setParent(parent);
        if(this.partialRefs)
            this.partialRef(this.partialRefs);
    },

    partialRef: function(pRefs) {
        Ext.Array.map(pRefs, function(pRef) {
            pRef.selector = this.addParentPrefix(pRef.selector);
        }, this);
    },


    control: function(selectors) {
        if(Ext.isObject(selectors)) {
            Ext.Object.each(selectors, function(k, v) {
                delete selectors[k];
                selectors[this.addParentPrefix(k)] = v;
            }, this);
        } else {
            Ext.Error.raise('Currently, the partial control fn works only with object key selectors.');
        }
        this.callParent([selectors]);
    },

    addParentPrefix: function(s) {
        return this.getParent().getRootView() + ' ' + s;
    }
});