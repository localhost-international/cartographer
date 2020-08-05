import { combineReducers } from 'redux'

import navigation from 'src/store/navigation.reducer'
import settings from 'src/store/settings.reducer'

const rootReducer = combineReducers({
  navigation,
  settings
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
