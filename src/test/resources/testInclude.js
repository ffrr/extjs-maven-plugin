/**
 * Customer model
 * 
 * @author fk
 * @version 0.1
 * @date Jun 17, 2011
 */
Ext.define('DanteFrontend.model.Customer', {
    extend: 'Ext.data.Model',

    fields: [
        'id', 'taxID', 'tradeID', 'web', 'email', 'emailFormat',
        {
            name: 'name',
            convert: function(v) {
                return v.replace("\n", " ");
            } //ugly little workaround
            //TODO: override the displayTpl of the cmbbox class -
            //probably use an own class, since we will need it to support adding...
        }
    ],


    statics: {
        instanceDefaults: {
            emailFormat: 1
        }
    }
});