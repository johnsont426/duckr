const ADD_LISTENER = 'ADD_LISTENER'

import { Map } from 'immutable'

export function addListener (listenerId) {
  return {
    type: ADD_LISTENER,
    listenerId,
  }
}

export default function listeners (state = Map({}), action) {
  switch (action.type) {
    case ADD_LISTENER :
      return state.merge({
        [action.listenerId]: true,
      })
    default :
      return state
  }
}