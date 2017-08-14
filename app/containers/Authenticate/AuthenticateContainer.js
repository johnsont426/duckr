import React from 'react'
import { Authenticate } from 'components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { bindActionCreators } from 'redux'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class AuthenticateContainer extends React.Component {
	constructor (props) {
		super(props);
		this.handleAuth = this.handleAuth.bind(this)
	}
  handleAuth () {
  	this.props.fetchAndHandleAuthedUser()
  		.then(() => this.props.history.push({pathname: '/feed'}))
  }
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.history.push({pathname: '/feed'})
      } else {
        this.props.removeFetchingUser()
      }
    })
    this.props.checkAuth.apply(this)
  }
  render () {
    return this.props.isFetching === true
      ? null
      : (
          <Authenticate
            isFetching={this.props.isFetching}
            error={this.props.error}
            onAuth={this.handleAuth} />
        )
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired
}

function mapStateToProps ({users}) {
  return {
    isFetching: users.isFetching,
    error: users.error
  }
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(userActionCreators, dispatch)
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthenticateContainer)