/**
 * Form
 *
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.lib.view.Form', {
    extend: 'Ext.form.Panel',

    labelAlign: 'top',

    accessor: {
    },

    initComponent: function() {
        var config = {
            validationMessages: [],
            bbar: {
                items: ['->',{
                    text: g('Save'),
                    action: 'save',
                    iconCls: 'icon-save',
                    cls: 'button-save',
                    handler: function() {
                        this.fireEvent('save', this.getRecord());
                    },
                    scope: this
                }/*,{
                    text: g('Cancel'),
                    action: 'cancel',
                    iconCls: 'icon-cancel',
                    cls: 'button-cancel',
                    handler: function() {
                        this.fireEvent('cancel', this.getRecord());
                    },
                    scope: this
                }*/]
            }
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));

        this.callParent(arguments);
    },

    addValidationMessage: function(msg) {
        this.validationMessages.push(msg);
    },

    validateAndUpdate: function() {
        if(this.getForm().isValid()) {
            this.getForm().updateRecord(this.accessRecord());
            return true;
        }
        this.alertValidation();
        return false;
    },

    alertValidation: function() {
        var msgs = this.validationMessages;
        if(Ext.isEmpty(msgs)) {
            DanteFrontend.lib.Notify.error.formValidation();
        } else {
            Ext.each(msgs, function(m) {
                DanteFrontend.lib.Notify.base.error(g('Validation problem'), m);
            })
        }
        //flush
        this.validationMessages = [];
    },


    // toto by mohlo byt zastresene notifikacnym mechanizmom medzi storeom a
    // formom, form musi vzdy reloadnut record, ktory updatol. store po syncu
    // record destroyne a nanovo nacita - vo forme zostava referencia na stary
    // neaktualny (dirty) record

    //inak - vezmi z recordu ref na store, reloadni podla id. ak si natiahol phantom record,
    //skus podla poradia v store?
    
    accessRecord: function() {
        return this.accessor.fn.apply(this.accessor.scope);
    },

    accessAndLoad: function() {
        var rec = this.accessRecord();
        this.loadRecord(rec);
        return rec;
    },

    setRecordAccessor: function(accessFn, scope) {
        this.accessor = {
            fn: accessFn,
            scope: scope
        };
    },

//    onRender: function() {
//        this.mask = Ext.createWidget()
//        this.callParent(arguments);
//    },

    onBeforeSync: function() {
        this.setLoading(true);
    },

    onAfterSync: function() {
        this.setLoading(false);
    }

});
