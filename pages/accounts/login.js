var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var login = require('../../elements/login-form')
var logout = require('../../elements/logout-button')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  var checkingAuth = state.account.checkingAuth

  if (!checkingAuth) {
    if (authenticated) {
      send('go', '/')
      return html`<div></div>`
    } else {
      return html`<div>
        <h2 class="f2 ttu dark-gray">Log in</h2>
        ${login(state, prev, send)}
        <p class="f6"><a href="/reset-password" class="link blue hover-dark-blue">Forgot your password?</a></p>
      </div>`
    }
  } else {
    return html`<div></div>`
  }
}
