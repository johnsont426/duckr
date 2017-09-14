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
		super(props)
		this.handleAuth = this.handleAuth.bind(this)
	}
  handleAuth () {
  	this.props.fetchAndHandleAuthedUser()
  		.then(() => this.props.history.push({pathname: '/feed'}))
  }
  componentDidMount () {
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