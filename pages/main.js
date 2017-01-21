var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var login = require('../elements/login-form')
var logout = require('../elements/logout-button')
var register = require('../elements/register-form')

var commands = html`<pre class="pa4 white bg-dark-gray"><code>npm i -g staticland
staticland register
staticland path/to/files example.com
</code></pre>
`

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  var list = state.sites.list
  var fetchedList = state.sites.fetchedList
  var ready = authenticated && fetchedList

  var prefix = css`
    :host {
      width: 500px;
      margin-bottom: 50px;
    }
  `

  if (authenticated) {
    if (fetchedList) {
      var elements

      if (list.length) {
        elements = html`<di>${list.map(function (item) {
          return html`<a href="/site?domain=${item.domain}"><h3 class="f3 dark-gray">${item.domain}</h1></a>`
        })}</div>`
      } else {
        elements = html`<div>
          <h3 class="f3 dark-gray">No sites yet! Deploy one!</h3>
          ${commands}
          <p><a href="https://docs.static.land" class="link blue hover-dark-blue">Read the docs for more info</a></p>
        </div>`
      }

      return html`<div class="">
        <h2 class="f2 ttu dark-gray">Sites</h2>
        ${elements}
      </div>`
    } else {
      send('sites:list')

      return html`<div class="${prefix}">
        <h2 class="f2 ttu dark-gray">Sites</h2>
        <p class="i f6">loading...</p>
      </div>`
    }
  } else {
    return html`<div class="${prefix}">
      <h1 class="f1 dark-gray">Welcome to StaticLand</h1>
      <p class="f3"><a href="/login" class="link blue hover-dark-blue"> Log in</a> or <a href="/register" class="link blue hover-dark-blue">register</a> to manage your static sites.</p>
      <p class="f3">Learn more by <a href="https://docs.static.land" class="link blue hover-dark-blue">reading the docs</a>.</p>
      <p>Find StaticLand on <a href="https://github.com/staticland" class="link blue hover-dark-blue"><b>GitHub</b></a> and <a href="https://twitter.com/static_land" class="link blue hover-dark-blue"><b>Twitter</b></a>.</p>
    </div>`
  }
}
