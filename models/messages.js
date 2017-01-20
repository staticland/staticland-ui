module.exports = function (config) {
  return {
    namespace: 'messages',
    state: {
      list: []
    },
    reducers: {
      message: function (state, data) {
        state.list.push(data)
        return state
      },
      clearAll: function (state, data) {
        state.list = []
        return state
      },
      error: function (state, data) {
        var message = {
          level: 'error',
          text: data
        }
        state.list.push(message)
        return state
      },
      info: function (state, data) {
        var message = {
          level: 'info',
          text: data
        }
        state.list.push(message)
        return state
      }
    },
    effects: {}
  }
}
