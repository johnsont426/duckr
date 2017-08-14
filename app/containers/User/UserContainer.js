import React from 'react'
import PropTypes from 'prop-types'
import { User } from 'components'
import { connect } from 'react-redux'

class UserContainer extends React.Component {
  render () {
    return (
      <User
        noUser={this.props.noUser}
        isFetching={this.props.isFetching}
        name={this.props.name}
        error={this.props.error}
        duckIds={this.props.duckIds}
      />
    )
  }
}

UserContainer.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired,
}
export default UserContainer