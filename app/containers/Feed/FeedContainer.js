import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Feed } from 'components'
import { bindActionCreators } from 'redux'
import * as feedActionCreators from 'redux/modules/feed'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { firebaseAuth } from 'config/constants'
import { formatUserInfo } from 'helpers/utils'

class FeedContainer extends React.Component {
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        this.props.setUsersLikes()
        this.props.history.push({pathname: '/feed'})
      } else {
        this.props.removeFetchingUser()
      }
    })
    this.props.checkAuth.apply(this)
    this.props.setAndHandleFeedListener()
  }
  goToProfile (uid) {
    this.props.history.push({pathname: `/${uid}`})
  }
  goToDuckDetail (duckId) {
    this.props.history.push({pathname: `/duckdetail/${duckId}`})
  }
  render () {
    return (
      <Feed
        duckIds={this.props.duckIds}
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable}
        goToProfile={this.goToProfile.bind(this)}
        goToDuckDetail={this.goToDuckDetail.bind(this)} />
    )
  }
}

FeedContainer.propTypes = {
  duckIds: PropTypes.array.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  setAndHandleFeedListener: PropTypes.func.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

function mapStateToProps ({feed}) {
  const { newDucksAvailable, error, isFetching, duckIds } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
    duckIds,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators({
    ...userActionCreators,
    ...feedActionCreators,
    ...usersLikesActionCreators
  },dispatch)
)(FeedContainer)