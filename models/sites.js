var apiClient = require('staticland')
var store = require('store')

module.exports = function (config) {
  config = config || {}
  var api = apiClient(config)

  return {
    namespace: 'sites',
    state: {
      list: [],
      fetchedList: false,
      currentSite: null,
      fetchedSite: false,
      fetchingSite: false
    },
    reducers: {
      setList: function (state, data) {
        state.list = data
        return state
      },
      unsetList: function (state, data) {
        return { list: [], fetchedList: false }
      },
      fetchedList: function (state, data) {
        return { fetchedList: data }
      },
      fetchingSite: function (state, data) {
        return { fetchingSite: data }
      },
      destroyingSite: function (state, data) {
        return { destroyingSite: data }
      },
      setCurrentSite: function (state, data) {
        return { currentSite: data, fetchedSite: true }
      },
      unsetCurrentSite: function (state, data) {
        return { currentSite: null, fetchedSite: false }
      }
    },
    effects: {
      site: function (state, data, send, done) {
        send('sites:fetchingSite', true, function () {
          send('sites:unsetCurrentSite', function () {
            api.site({ domain: data }, function (err, res, body) {
              if (err) {
                send('messages:error', err.message, function () {
                  send('sites:fetchingSite', false, done)
                })
              } else {
                send('sites:setCurrentSite', body, function () {
                  send('sites:fetchingSite', false, done)
                })
              }
            })
          })
        })
      },
      list: function (state, data, send, done) {
        var data = store.get(config.clientHost)

        if (data && data.key) {
          api.sites({ owner: data.key }, function (err, res, body) {
            if (err) return send('messages:error', err.message, done)
            send('sites:setList', body, function () {
              send('sites:fetchedList', true, done)
            })
          })
        }
      },
      destroySite: function (state, data, send, done) {
        var account = store.get(config.clientHost)

        if (account && account.token) {
          send('sites:destroyingSite', true, function () {
            api.destroySite({ domain: data, token: account.token }, function (err, res, body) {
              if (err) {
                send('messages:error', err.message, function () {
                  send('sites:destroyingSite', false, done)
                })
              } else {
                send('go', '/', function () {
                  send('sites:list', function () {
                    send('messages:info', data + ' is deleted!', done)
                  })
                })
              }
            })
          })
        }
      }
    },
    subscriptions: {}
  }
}
