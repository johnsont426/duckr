import React from 'react'
import PropTypes from 'prop-types'
import { DuckDetails } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as duckActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'

class DuckDetailsContainer extends React.Component {
	componentDidMount () {
    if (this.props.duckAlreadyFetched === false) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
    this.props.initLikeFetch(this.props.duckId)
    this.props.checkAuth.apply(this)
  }
  goToProfile (uid) {
    this.props.history.push({pathname: `/${uid}`})
  }
  goToDuckDetail (duckId) {
    this.props.history.push({pathname: `/duckDetail/${duckId}`})
  }
  render () {
    return (
      <DuckDetails
      	addAndHandleReply={this.props.addAndHandleReply}
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        error={this.props.error}
        isFetching={this.props.isFetching}
        goToProfile={this.goToProfile.bind(this)}
        goToDuckDetail={this.goToDuckDetail.bind(this)} />
    )
  }
}

const {object, string, bool, func} = PropTypes
DuckDetailsContainer.propTypes = {
  authedUser: object.isRequired,
  duckId: string.isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
  removeFetching: func.isRequired,
  fetchAndHandleDuck: func.isRequired,
  duckAlreadyFetched: bool.isRequired,
  initLikeFetch: func.isRequired,
  addAndHandleReply: func.isRequired,
}

function mapStateToProps ({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.match.params.duckId,
    duckAlreadyFetched: !!ducks[props.match.params.duckId]
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...duckActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DuckDetailsContainer)