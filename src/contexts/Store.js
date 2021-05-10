import React from 'react';


export const Store = React.createContext();

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

}

/**
 * @returns {{ state: initialState, dispatch: (Action) => {}}}
 */
export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  );
}
