import { combineReducers } from 'redux'

import navigation from 'src/store/navigation.actions'
import settings from 'src/store/settings.actions'

const rootReducer = combineReducers({
  navigation,
  settings
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
