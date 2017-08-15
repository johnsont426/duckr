import React from 'react'
import { Home } from 'components'

class HomeContainer extends React.Component {
  componentDidMount () {
    this.props.checkAuth.apply(this)
  }
  render () {
    return <Home />
  }
}

export default HomeContainer