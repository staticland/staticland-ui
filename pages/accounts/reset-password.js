var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var login = require('../../elements/login-form')
var logout = require('../../elements/logout-button')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  var checkingAuth = state.account.checkingAuth

  var accountKey = state.location.search.accountKey
  var resetToken = state.location.search.resetToken
  var userEmail = state.location.search.email

  function onsubmitConfirm (e) {
    e.preventDefault()
    var form = e.target
    var data = serialize(form, { hash: true })
    data.accountKey = accountKey
    data.resetToken = resetToken
    data.email = userEmail
    send('account:resetPasswordConfirmation', data)
  }

  function onsubmitEmail (e) {
    e.preventDefault()
    var form = e.target
    var data = serialize(form, { hash: true })
    console.log('data.email onsubmitEmail', data.email)
    send('account:resetPassword', data.email)
  }

  if (accountKey && resetToken) {
    if (state.account.passwordResetConfirmResponse) {
      return html`<div>
        <h2 class="f2 ttu dark-gray">Reset your password</h2>
        <p class="f3 pa3 bg-washed-yellow dib">${state.account.passwordResetConfirmResponse}</p>
      </div>`
    } else {
      return html`<div>
        <h2 class="f2 ttu dark-gray">Reset your password</h2>

        <form action="" method="POST" id="password-reset-confirm-form" onsubmit=${onsubmitConfirm}>
          <div class="mb3">
            <label class="tracked ttu f6 gray">
              <span>New password</span><br>
              <input type="password" class="pa2 w5 ba b--silver mt2" name="newPassword">
            </label>
          </div>
          <input type="submit" class="pa3 bg-light-gray hover-bg-gray hover-white pointer bn ba0"  value="Reset your password">
        </form>
      </div>`
    }
    
  } else {
    if (state.account.passwordResetResponse) {
      return html`<div>
        <h2 class="f2 ttu dark-gray">Reset your password</h2>
        <p class="f3 pa3 bg-washed-yellow dib">${state.account.passwordResetResponse}</p>
      </div>`
    } else {
      return html`<div>
        <h2 class="f2 ttu dark-gray">Reset your password</h2>
        <form action="" method="POST" id="password-reset-form" onsubmit=${onsubmitEmail}>
          <div class="mb3">
            <label class="tracked ttu f6 gray">
              <span>Your email</span><br>
              <input type="email" class="pa2 w5 ba b--silver mt2" name="email">
            </label>
          </div>
          <input type="submit" class="pa3 bg-light-gray hover-bg-gray hover-white pointer bn ba0" value="Reset your password">
        </form>
      </div>`
    }
  }

  
}
