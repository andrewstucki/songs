import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from 'reducers'

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore)

export default function configureStore(initialState) {
  return finalCreateStore(reducers, initialState)
}
