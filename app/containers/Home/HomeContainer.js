import React from 'react'
import { Home } from 'components'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { bindActionCreators } from 'redux'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class HomeContainer extends React.Component {
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
          <Home />
        )
  }
}

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching,
    error: state.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)