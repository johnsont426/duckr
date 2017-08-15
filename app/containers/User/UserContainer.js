import React from 'react'
import PropTypes from 'prop-types'
import { User } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import { staleUser, staleDucks } from 'helpers/utils'

class UserContainer extends React.Component {
	componentDidMount () {
		const uid = this.props.match.params.uid
		if (this.props.noUser || staleUser(this.props.lastUpdatedUser)) {
			this.props.fetchAndHandleUser(uid)
		}
		if (this.props.noUser || staleDucks(this.props.lastUpdatedDucks)) {
			this.props.fetchAndHandleUsersDucks(uid)
		}
	}
	goToProfile (uid) {
    this.props.history.push({pathname: `/${uid}`})
  }
  goToDuckDetail (duckId) {
    this.props.history.push({pathname: `/duckDetail/${duckId}`})
  }
  render () {
    return (
      <User
        noUser={this.props.noUser}
        isFetching={this.props.isFetching}
        name={this.props.name}
        error={this.props.error}
        duckIds={this.props.duckIds}
        goToProfile={this.goToProfile.bind(this)}
        goToDuckDetail={this.goToDuckDetail.bind(this)}
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
  fetchAndHandleUsersDucks: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  fetchAndHandleUser: PropTypes.func.isRequired,
  lastUpdatedUser: PropTypes.number.isRequired,
  lastUpdatedDucks: PropTypes.number.isRequired,
}

function mapStateToProps ({users, usersDucks}, props) {
	const specificUsersDucks = usersDucks[props.match.params.uid]
	const user = users[props.match.params.uid]
	const noUser = typeof user === 'undefined'
	return {
		noUser,
		name: noUser ? '' : user.info.name,
		isFetching: users.isFetching || usersDucks.isFetching,
		error: users.error || usersDucks.error,
		duckIds: specificUsersDucks ? specificUsersDucks.duckIds : [],
		lastUpdatedUser: user ? user.lastUpdated : 0,
		lastUpdatedDucks: specificUsersDucks ? specificUsersDucks.lastUpdated : 0
	}
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators({
		...usersActionCreators,
		...usersDucksActionCreators
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
