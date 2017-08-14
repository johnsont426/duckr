import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, hashHistory, IndexRoute, Switch } from 'react-router-dom'
import { HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer, UserContainer } from 'containers'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import { firebaseAuth } from 'config/constants'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'


class MainContainer extends React.Component {
	render () {
		return (
			<BrowserRouter history={hashHistory}>
				<div className={container}>
		      <Navigation isAuthed={this.props.isAuthed} />
		      <div className={innerContainer}>
		      	<Switch>
			        <Route exact path='/' render={(props) => <HomeContainer {...props} checkAuth={this.props.checkAuth} />} />
			        <Route path='/auth' render={(props) => <AuthenticateContainer {...props} checkAuth={this.props.checkAuth} />} />
			        <Route path='/feed' render={(props) => <FeedContainer {...props} checkAuth={this.props.checkAuth} />} />
			        <Route path='/logout' component={LogoutContainer} />
			        <Route path='/:uid' component={UserContainer} />
			      </Switch>
		      </div>
		    </div>
		  </BrowserRouter>
		)
	}
}

MainContainer.propTypes = {
	isAuthed: PropTypes.bool.isRequired,
}

export default connect(
	({users}) => ({isAuthed: users.isAuthed}),
)(MainContainer)
