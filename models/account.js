var apiClient = require('staticland')
var store = require('store')

module.exports = function (config) {
  config = config || {}
  var api = apiClient(config)

  return {
    namespace: 'account',
    state: {
      checkingAuth: true,
      authenticated: false,
      account: null,
      passwordResetResponse: null,
      passwordResetConfirmResponse: null
    },
    reducers: {
      set: function (state, data) {
        return { authenticated: true, account: data }
      },
      unset: function (state, data) {
        return { authenticated: false, account: null }
      },
      finishAuthCheck: function (state, data) {
        return { checkingAuth: false }
      },
      passwordResetResponse: function (state, data) {
        return { passwordResetResponse: data }
      },
      passwordResetConfirmResponse: function (state, data) {
        return { passwordResetConfirmResponse: data, passwordResetResponse:null }
      }
    },
    effects: {
      register: function (state, data, send, done) {
        api.register({
          email: data.email,
          password: data.password
        }, function (err, res, body) {
          if (err) return send('messages:error', err.message, done)
          store.set(config.clientHost, body)
          send('account:set', body, function () {
            send('go', '/', done)
          })
        })
      },
      login: function (state, data, send, done) {
        api.login(data, function (err, res, body) {
          if (err) return send('messages:error', err.message, done)

          store.set(config.clientHost, body)
          send('account:set', body, function () {
            send('go', '/', done)
          })
        })
      },
      logout: function (state, data, send, done) {
        var data = store.get(config.clientHost)

        if (data && data.token) {
          api.logout({ token: data.token }, function (err, res, body) {
            if (err) return send('messages:error', err.message, done)
            store.remove(config.clientHost)

            send('account:unset', function () {
              send('sites:unsetList', function () {
                send('go', '/', done)
              })
            })
          })
        }
      },
      resetPassword: function (state, data, send, done) {
        var email = data || state.account.auth.basic.email

        api.resetPassword({ email: email }, function (err, res, body) {
          if (err) return send('messages:error', err.message, done)
          send('account:passwordResetResponse', body.message, done)
        })
      },
      resetPasswordConfirmation: function (state, data, send, done) {
        api.resetPasswordConfirmation(data, function (err, res, body) {
          if (err) return send('messages:error', err.message, done)
          send('account:passwordResetConfirmResponse', body.message, done)
        })
      }
    },
    subscriptions: [
      function (send, done) {
        var data = store.get(config.clientHost)
        if (!data || !data.token) return send('account:finishAuthCheck', done)

        api.verify({ token: data.token }, function (err, res, body) {
          if (err) {
            return send('messages:error', err.message, function () {
              send('account:finishAuthCheck', done)
            })
          }

          send('account:set', body, function () {
            send('account:finishAuthCheck', done)
          })
        })
      }
    ]
  }
}
