export const SETTINGS_REF = 'settings/settings-ref'

type SettingsState = {
  settingsRef: null
}

const initialState: SettingsState = {
  settingsRef: null
}

type SettingsRef = {
	type: typeof SETTINGS_REF
	settingsOpen: boolean
}

type SettingsActionTypes = SettingsRef


export default (
	state: SettingsState = initialState, 
	action: SettingsActionTypes
) => {
  switch (action.type) {
    case SETTINGS_REF: {
      return {
        ...state,
        settingsOpen: action.settingsOpen
      }
    }
    default: {
      return { ...state }
    }
  }
}
