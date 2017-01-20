var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated

  var prefix = css`
    :host {}
  `

  function onclick (e) {
    e.preventDefault()
    console.log('clicked?')
    send('account:logout')
  }

  if (authenticated) {
    return html`<a class="${prefix} link blue hover-dark-blue" href="#" onclick=${onclick}>log out</a>`
  }
}
