/**
 * CustomerUser
 * ..description..
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */

Ext.define('DanteFrontend.view.account.EditCustomerUser', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.df-account-editccuser',
    border: false,
    
    initComponent: function() {
        var config = {
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [{
                fieldLabel: g('Login'),
                name: 'login',
                xtype: 'textfield',
                allowBlank: false
            },{
                xtype: 'fieldset',
                title: g('Password change'),
                //layout: 'form',
                items: [{
                    fieldLabel: g('Password'),
                    name: 'password',
                    xtype: 'textfield',
                    inputType: 'password'//,
                    //validator: this.jointValidator('passwordRetype')
                },{
                    fieldLabel: g('Retype password'),
                    name: 'passwordRetype',
                    xtype: 'textfield',
                    inputType: 'password'//,
                    //validator: this.jointValidator('password')
                }]
            }]
        };

        Ext.apply(this, Ext.apply(this.initialConfig, config));
        this.callParent(arguments);
    },

    passwordMatch: function(nonEmpty) {
        var pwd = this.down('field[name=password]').getValue();
        var pwdRetype = this.down('field[name=passwordRetype]').getValue();
        if(nonEmpty) return (!Ext.isEmpty(pwd) && !Ext.isEmpty(pwdRetype) && (pwd == pwdRetype));
        else return (pwd == pwdRetype);   
    }
});