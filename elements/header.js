var html = require('choo/html')
var css = require('sheetify')

var logout = require('./logout-button')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  var checkingAuth = state.account.checkingAuth

  var prefix = css`
    :host {
      
    }
  `

  var accountLinks

  if (!checkingAuth) {
    if (authenticated) {
      accountLinks = html`<ul class="list ma0 pa0">
        <li class="dib mr2"><a href="/" class="link blue hover-dark-blue">sites</a></li>
        <li class="dib mr2"><a href="https://docs.static.land" class="link blue hover-dark-blue">docs</a></li>
        <li class="dib mr2"><a href="/account" class="link blue hover-dark-blue">account</a></li>
        <li class="dib">${logout(state, prev, send)}</li>
      </ul>`
    } else {
      accountLinks = html`<ul class="list ma0 pa0">
        <li class="dib mr2"><a href="https://docs.static.land" class="link blue hover-dark-blue">docs</a></li>
        <li class="dib mr2"><a href="/login" class="link blue hover-dark-blue">log in</a></li>
        <li class="dib"><a href="/register" class="link blue hover-dark-blue">register</a></li>
      </ul>`
    }  
  }

  return html`<header class="${prefix} mt3 mb4">
    <div class="container">
      <h1 style="display:none"><a href="/">staticland</a></h1>
      <a href="/"><img src="https://static.land/logo-600x600.jpg" class="br2 w2 v-mid mr2"></a>
      <div class="header-links dib v-mid">
      ${accountLinks}
      </div>
    </div>
  </header>`
}
