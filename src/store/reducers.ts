import { combineReducers } from 'redux'
import navigation from 'src/store/navigation.actions'

const rootReducer = combineReducers({
  navigation,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
