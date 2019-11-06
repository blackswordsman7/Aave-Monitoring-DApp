/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react'
import ReactDOM from 'react-dom'

// Redux
import configureStore, { history } from './redux/store'
import { ConnectedRouter } from 'connected-react-router'
import { Provider as ReduxProvider } from 'react-redux'

// Styles
import 'assets/vendor/nucleo/css/nucleo.css'
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/app.scss'

import App from './views/App'

// Service Worker
import * as serviceWorker from './serviceWorker'

const reduxStore = configureStore()

ReactDOM.render(
  <ReduxProvider store={reduxStore}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </ReduxProvider>,
  document.getElementById('app')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
