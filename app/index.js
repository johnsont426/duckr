import React from 'react'
import ReactDOM from 'react-dom'
import { MainContainer } from 'containers'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { checkIfAuthed } from 'helpers/auth'
import * as reducers from 'redux/modules'

const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

function checkAuth () {
  if (store.getState().users.isFetching === true) {
    return
  }

  const isAuthed = checkIfAuthed(store)
  const pathName = this.props.match.path
  if (pathName === '/' || pathName === '/auth') {
  	if (isAuthed === true) {
  		this.props.history.push({pathname: '/feed'})
  	}
  }else {
		if (isAuthed !== true) {
			this.props.history.push({pathname: '/auth'})
		}
	}
}


ReactDOM.render(
  <Provider store={store}>
		<MainContainer checkAuth={checkAuth}/>
  </Provider>,
	document.getElementById('app')
)
