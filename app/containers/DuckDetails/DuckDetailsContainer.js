import React from 'react'
import PropTypes from 'prop-types'
import { DuckDetails } from 'components'
import { connect } from 'react-redux'

class DuckDetailsContainer extends React.Component {
  render () {
    return (
      <DuckDetails
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        error={this.props.error}
        isFetching={this.props.isFetching} />
    )
  }
}

DuckDetailsContainer.propTypes = {
  authedUser: object.isRequired,
  duckId: string.isRequired,
  error: string.isRequired,
  isFetching: bool.isRequired,
}

function mapStateToProps ({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.routeParams.duckId,
    duckAlreadyFetched: !!ducks[props.routeParams.duckId]
  }
}

export default connect()(DuckDetailsContainer)