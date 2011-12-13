/**
 * Notify
 * Basic notification shortcuts
 * 
 * @author fk
 * @version 0.1
 * @date Jun 22, 2011
 */
Ext.require('DanteFrontend.lib.ux.Growl');

Ext.define('DanteFrontend.lib.Notify', {
    singleton: true,
   
    base: {
        success: function(title, message) {
            DanteFrontend.lib.ux.Growl.notify({
                title: title,
                message: message,
                iconCls: "x-growl-success"
            });
        },
        error: function(title, message) {
            //console.error(message, title);
            DanteFrontend.lib.ux.Growl.notify({
                title: title,
                message: message,
                iconCls: "x-growl-error"
            });
        }
    },


    error: {
        formSave: function() {
            DanteFrontend.lib.Notify.base.error(g("Save unsuccessful"), g("The form has not been saved."));
        },
        formValidation: function() {
            DanteFrontend.lib.Notify.base.error(g("Validation problem"), g("Invalid form values are present, please correct them."));
        },
        hotlineEmail: function() {
            DanteFrontend.lib.Notify.base.error(g("Error"), g("Your email to the specified queue has not been sent."));
        }
    },

    success: {
        formSave: function() {
            DanteFrontend.lib.Notify.base.success(g("Save successful"), g("The form has been saved."));
        },
        hotlineEmail: function() {
            DanteFrontend.lib.Notify.base.success(g("Success"), g("Your email to the specified queue has been sent."));
        },
        storeUpdate: function() {
            DanteFrontend.lib.Notify.base.success(g("Update successful"), g("Your data has been saved."));
        }
    }
});
