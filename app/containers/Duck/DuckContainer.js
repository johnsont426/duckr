import React from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Duck } from 'components'
import { connect } from 'react-redux'
import * as usersLikesActions from 'redux/modules/usersLikes'

class DuckContainer extends React.Component {
  render () {
    return (
      <Duck
        goToProfile={this.props.goToProfile}
        goToDuckDetail={this.props.hideReplyBtn === true ? null : this.props.goToDuckDetail}
        {...this.props} />
    )
  }
}

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true
}

const { bool, func, object, number} = PropTypes
DuckContainer.propTypes = {
  duck: object.isRequired,
  numberOfLikes: number.isRequired,
  isLiked: bool.isRequired,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: bool.isRequired,
  handleDeleteLike: func.isRequired,
  addAndHandleLike: func.isRequired,
  goToProfile: func.isRequired,
  goToDuckDetail: func.isRequired,
}

function mapStateToProps ({ducks, likeCount, usersLikes}, props) {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(usersLikesActions, dispatch)
)(DuckContainer)