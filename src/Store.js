import React from 'react';


export const Store = React.createContext();

const initialState = {
  currentProfile: null,
  profiles: []
};

function reducer(state, action) {

}

/**
 * @returns {{ state: initialState, dispatch: reducer }}
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
