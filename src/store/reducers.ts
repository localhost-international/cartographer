import { combineReducers } from 'redux'

import navigation from 'src/store/navigation.reducer'
import settings from 'src/store/settings.reducer'
import ethereum from 'src/store/ethereum.reducer'

const rootReducer = combineReducers({
  navigation,
  settings,
	ethereum
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
