import injectTapEventPlugin from 'react-tap-event-plugin'

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyRouterMiddleware, IndexRoute, Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'react-router-scroll'

injectTapEventPlugin()

import configureStore from 'store'
import App from 'containers/app'

const store = configureStore({ routing: [] })
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} render={
      // Scroll to top when going to a new page, imitating default browser behavior
      applyRouterMiddleware(useScroll((prevProps, props) => {
        if (!prevProps || !props) { return true }
        if (prevProps.location.pathname !== props.location.pathname) { return [0, 0] }
        return true
      }))
    }>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('app')
)
