/**
 * Root dashboard panel controller.
 * 
 * @author fk
 * @version 0.1
 * @date Jun 2, 2011
 */

Ext.define('DanteFrontend.controller.dashboard.Root', {
    extend: 'DanteFrontend.lib.Controller',
    models: ['Task','Project','EmailQueue'],
    stores: ['dashboard.CurrentTasks', 'dashboard.CurrentProjects', 'dashboard.HotlineEmailQueues'],
    views: ['dashboard.Root',
        'dashboard.CurrentProjects', 'dashboard.CurrentTasks',
        'dashboard.AccountManager',
        'dashboard.HotlineEmail','dashboard.HotlinePhone'],
    refs: [{
        selector: 'df-dashboard-hotlineemail',
        ref: 'hotlineForm'
    }],

    rootView: 'df-dashboard-root',

    init: function() {
        this.control({
            'button[action=sendRequest]': {
                click: this.sendHotlineEmail
            }
        });

        this.callParent(arguments);
    },

    sendHotlineEmail: function(){
        this.getHotlineForm().getForm().submit({
                waitTitle: g("Hotline Contact"),
                waitMsg:  g("Please wait, sending e-mail to specified queue..."),
                success:  function(f, a) {
                  DanteFrontend.lib.Notify.success.hotlineEmail();
                },
                failure:  function(f, a) {
                  DanteFrontend.lib.Notify.error.hotlineEmail();
                }
        });
    }
});