var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

module.exports = function (state, prev, send) {
  var prefix = css`
    :host {}
  `

  function onsubmit (e) {
    e.preventDefault()
    var form = e.target
    var data = serialize(form, { hash: true })
    send('account:login', data)
  }

  return html`<div class="${prefix} form-block">
    <form action="" method="POST" id="account-login-form" onsubmit=${onsubmit}>
      <div class="mb3">
        <label class="tracked ttu f6 gray">
          <span>Email</span><br>
          <input type="text" class="pa2 w5 ba b--silver mt2" name="email">
        </label>
      </div>
      <div class="mb3">
        <label class="tracked ttu f6 gray">
          <span>Password</span><br>
          <input type="password" class="pa2 w5 ba b--silver mt2" name="password">
        </label>
      </div>
      <input type="submit" class="pa3 bg-light-gray hover-bg-gray hover-white pointer bn ba0" value="Log in">
    </form>
  </div>`
}
