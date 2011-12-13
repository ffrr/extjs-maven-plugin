/**
 * Login
 * Login screen - (refactoring unnecessary, as this is a standalone screen).
 * 
 * @author fk
 * @author mx
 * @version 0.1
 * @date Jul 11, 2011
 */

Ext.onReady(function() {
    Ext.BLANK_IMAGE_URL = media('/img/s.gif');

    var formSubmitHandler = function() {
      var loginForm = Ext.getCmp('loginForm');
      loginForm.getForm().submit({
        waitTitle: g('Login in progress'),
        waitMsg:  g('Please wait, authenticating...'),
        success:  function(f, a) {
            window.location.href = approot('/app/');
        },
        failure:  function(f, a) {
          switch (a.failureType) {
            case Ext.form.Action.CLIENT_INVALID:
              Ext.Msg.alert(g('Login error'), g('Invalid field values. Please check your input.'));
              break;

            case Ext.form.Action.CONNECT_FAILURE:
              Ext.Msg.alert(g('Login error'), g('Communication with server failed. Please try again.'));
              break;

            case Ext.form.Action.SERVER_INVALID:
            default:
              Ext.Msg.alert(g('Login error'), a.result.loginError);
              break;
          }
        }
      })
    }

    var win = Ext.create('Ext.window.Window', {
      border:         false,
      title:          g('Dante Login'),
      width:          300,
      closable:       false,
      draggable:      true,
      resizable:      false,
      y:              300,
      items: [
        {
          id:             'loginForm',
          xtype:          'form',
          layout:         'anchor',
          frame:          true,
          border:         false,
          buttonAlign:    'center',
          url:            approot('/j_spring_security_check'),
          items: [
            {
              xtype:      'textfield',
              fieldLabel: g('Username'),
              name:       'j_username',
              width:      '100%',
              listeners: {
                specialkey: function(f, e) {
                  if (e.getKey() == e.ENTER) {
                    formSubmitHandler();
                  }
                }
              }
            },
            {
              xtype:      'textfield',
              inputType:  'password',
              fieldLabel: g('Password'),
              name:       'j_password',
              width:      '100%',
              listeners: {
                specialkey: function(f, e) {
                  if (e.getKey() == e.ENTER) {
                    formSubmitHandler();
                  }
                }
              }
            }
          ],
          buttons: [
            {
              text: g('<b>Login</b> to Dante'),
              handler: function() {
                formSubmitHandler();
              }
            }
          ]
        }
      ]
    });
    
    win.show();
});
