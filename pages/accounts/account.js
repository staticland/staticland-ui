var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var login = require('../../elements/login-form')
var logout = require('../../elements/logout-button')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  var checkingAuth = state.account.checkingAuth

  function onclick (e) {
    send('account:resetPassword')
  }

  if (!checkingAuth) {
    if (!authenticated) {
      send('go', '/')
    } else {
      return html`<div>
        <h2 class="f2 ttu dark-gray">Your account</h2>


        <h3 class="f6 ttu dark-gray">Password</h3>
        <p>This is description text</p>
        <button class="pa3 bg-light-gray hover-bg-gray hover-white pointer bn ba0" onclick=${onclick}>Reset your password now</button>
      </div>`
    }
  }
}
