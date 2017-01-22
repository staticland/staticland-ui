var html = require('choo/html')
var css = require('sheetify')
var serialize = require('form-serialize')

var login = require('../elements/login-form')
var logout = require('../elements/logout-button')
var register = require('../elements/register-form')

module.exports = function (state, prev, send) {
  var authenticated = state.account.authenticated
  var domain = state.location.search.domain
  var fetchedSite = state.sites.fetchedSite
  var fetching = state.sites.fetchingSite
  var site = state.sites.currentSite
  var ready = authenticated && fetchedSite && !fetching



  var prefix = css`
    :host {
      width: 500px;
      margin-bottom: 50px;
    }
  `

  function onclickConfirm (e) {
    e.preventDefault()
    send('sites:confirmDestroyingSite', true)
  }

  function onclickDestroySite (e) {
    e.preventDefault()
    send('sites:destroySite', domain)
  }

  var destroyAreYouSure = html`<div class="ph3 pv2 hover-bg-washed-yellow ba b--light-gray">
  <p>Do you really want to delete your work? Do you have the source fies saved somewhere?</p>
  <p class="mt4"><a class="link pa2 bg-washed-red hover-bg-light-red white mb4 pointer" onclick=${onclickConfirm}>I'm ready to delete ${domain}</a></p>
  </div>`

  var destroyForReal = html`<div class="ph3 pv2 bg-washed-red  ba b--washed-red">
    <p>There's no going back from this. If you click that delete button, ${domain} is gone forever.</p>
    <p class="mt4"><a class="link pa2 bg-red hover-bg-dark-red white mb4 pointer" onclick=${onclickDestroySite}>Yes I really want to delete ${domain}!</a></p>
  </div>`

  if (!fetching && !fetchedSite) {
    send('sites:site', domain)
    return html`<div></div>`
  } else if (fetching) {
    return html`<div class="">
      <h2 class="f5 ttu dark-gray">${domain}</h2>
      <p>loading</p>
    </div>`
  } else {
    return html`<div class="">
      <h2 class="f2 ttu dark-gray mb4">${domain}</h2>
      <p><a href="https://${domain}" class="link pa2 bg-blue hover-bg-dark-blue white mb4">View ${domain}</a></p>

      <h3 class="f3 dark-gray mt5">Site information</h3>
      <p><b>Created:</b> ${site.created}</p>
      ${site.updated ? html`<p><b>Last updated:</b> ${site.updated}</p>` : ''}
      <p><b>Deploys:</b> ${site.deploys}</p>

      <h3 class="f3 dark-gray mt5">Delete this site</h3>
      ${state.sites.confirmDestroyingSite === true 
        ? destroyForReal
        : destroyAreYouSure
      }
    </div>`
  } 
}
