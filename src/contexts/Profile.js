import React from 'react';

export const ProfileContext = React.createContext();

export const PROFILE_ADD = 'PROFILE/ADD';

/**
 * Base store.
 * @typedef {{
  currentProfile: null,
  profiles: []
  * }} BaseState
  */
const initialState = {
  currentProfile: null,
  profiles: []
};

/**
 * React reducer action.
 * @typedef {{
 *  type: string, data: any
 * }} Action
 */

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
    default:
      return state;
  }
}

/**
 * @returns {{ state: initialState, dispatch: (Action) => {}}}
 */
export function ProfileProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <ProfileContext.Provider value={value}>
      {props.children}
    </ProfileContext.Provider>
  );
}
