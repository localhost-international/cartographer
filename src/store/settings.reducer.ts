export const SETTINGS_REF = 'settings/settings-ref'

type SettingsState = {
  settingsRef: null
}

const initialState: SettingsState = {
  settingsRef: null
}

export default (state: SettingsState = initialState, action: any) => {
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
