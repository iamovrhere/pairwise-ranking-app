import React from 'react';

export const AppContext = React.createContext();

// TODO clean up the profile vs. Profile.js
const PROFILE_ADD = 'PROFILE/ADD';
const PROFILE_SET_CURRENT = 'PROFILE/SET_CURRENT';

/**
 * React reducer action.
 * @typedef {{
 *  type: string, data: any
 * }} Action
 */

/**
 * Dispatch action.
 *
 * @param {string} key
 * @return {Action}
 */
export const setCurrentProfile = (key) => ({
  type: PROFILE_ADD,
  data: key
});

/**
 * Dispatch action.
 *
 * @param {string} name
 * @param {string} key
 * @return {Action}
 */
export const addProfile = (name, key) => ({
  type: PROFILE_ADD,
  data: {
    name,
    key
  }
});

/**
 * Base store.
 * @typedef {{
  currentProfile: null,
  profiles: {{name: string, key: string}}
  * }} BaseState
  */
const initialState = {
  currentProfileKey: null,
  profiles: []
};


/**
 *
 * @param {initialState} state
 * @param {Action} action
 * @return {initialState}
 */
function reducer(state, action) {
  switch (action.type) {
    case PROFILE_ADD:
      return {
        ...state,
        profiles: [...state.profiles, action.data]
      };
    case PROFILE_SET_CURRENT:
      return {
        ...state,
        currentProfileKey: action.data
      };
    default:
      return state;
  }
}

/**
 * @returns {{ state: initialState, dispatch: (Action) => {}}}
 */
export function AppProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}
