import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, hashHistory, Switch } from 'react-router-dom'
import { HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer, UserContainer, DuckDetailsContainer } from 'containers'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import { firebaseAuth } from 'config/constants'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { formatUserInfo } from 'helpers/utils'


class MainContainer extends React.Component {
	componentDidMount () {
		firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
      } else {
        this.props.removeFetchingUser()
      }
    })
	}
	render () {
		return this.props.isFetching === true
			? null
			: (
					<BrowserRouter history={hashHistory}>
						<div className={container}>
				      <Navigation isAuthed={this.props.isAuthed} />
				      <div className={innerContainer}>
				      	<Switch>
					        <Route exact path='/' render={(props) => <HomeContainer {...props} checkAuth={this.props.checkAuth} />} />
					        <Route path='/auth' render={(props) => <AuthenticateContainer {...props} checkAuth={this.props.checkAuth} />} />
					        <Route path='/feed' render={(props) => <FeedContainer {...props} checkAuth={this.props.checkAuth} />} />
					        <Route path='/logout' component={LogoutContainer} />
					        <Route path='/duckDetail/:duckId' render={(props) => <DuckDetailsContainer {...props} checkAuth={this.props.checkAuth} />} />
					        <Route path='/duckDetail' component={HomeContainer} />
					        <Route path='/:uid' render={(props) => <UserContainer {...props} checkAuth={this.props.checkAuth} />} />
					        <Route component={HomeContainer} />
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
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  (dispatch) => bindActionCreators({
    ...usersLikesActionCreators,
    ...userActionCreators,
  }, dispatch)
)(MainContainer)
