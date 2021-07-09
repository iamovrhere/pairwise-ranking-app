import React from 'react';
import { createSelector } from 'reselect'
import { generateNewKey } from 'lib';
import { createNameMap, createPairMap } from './ProfileStructure';

/**
 * @typedef {import('./ProfileStructure').ComparisonRow} ComparisonRow
 * @typedef {import('./ProfileStructure').ComparisonCandidate} ComparisonCandidate
 * @typedef {import('./ProfileStructure').ProfileItem} ProfileItem
 * @typedef {import('./ProfileStructure').VotingPair} VotingPair
 */

export const ProfileContext = React.createContext();

/////////////////////////////////////////////////////////////////////////
// Actions
/////////////////////////////////////////////////////////////////////////

export const PROFILE_ADD = 'PROFILE/ADD';
export const PROFILE_SET_CURRENT = 'PROFILE/SET_CURRENT';

/**
 *
 * @param {string} name
 * @param {[ComparisonRow]} list
 */
export const addProfile = (name, list) => ({
  type: PROFILE_ADD,
  data: {
    name,
    list
  }
});

/**
 *
 * @param {string} id
 */
export const setCurrentProfile = (id) => ({
  type: PROFILE_SET_CURRENT,
  data: {
    id
  }
});

/////////////////////////////////////////////////////////////////////////
// Selectors
/////////////////////////////////////////////////////////////////////////

/**
 * @param {ProfileState} state
 * @returns {[ProfileItem]}
 */
export const getProfiles = state => Object.entries(state.profiles)
  .map(([id, profile]) => ({ ...profile, id }));

/**
 * @param {ProfileState} state
 * @returns {ProfileItem|null} Null if no profile selected.
 */
export const getCurrentProfile = state => state.currentProfile ? ({
  ...state.profiles[state.currentProfile],
  id: state.currentProfile
}) : null;

/**
 * @return {[[string, VotingPair]]} Array of key + VotingPairs.
 */
export const getPairsEntries = createSelector(
  getCurrentProfile,
  profile => Object.entries(profile.pairs)
);

/**
 * @return {[[string, VotingPair]]} Array of key + VotingPairs.
 */
export const getVotedEntries = createSelector(
  getCurrentProfile,
  profile => Object.entries(profile.voted)
);

/**
 * @return {[ComparisonCandidate]}
 */
export const getListValues = createSelector(
  getCurrentProfile,
  profile => Object.values(profile.list)
);

/**
 * @return {number} The max score for the current list.
 */
export const getMaxScore = createSelector(
  getListValues,
  listValues => listValues.reduce(
    (max, item) => max < item.score ? item.score : max,
    0
  )
);

/**
 * @return {number} The length of comparisons or 1 (to prevent NaN/Infinity).
 */
export const getTotalComparisons = createSelector(
  getPairsEntries,
  getVotedEntries,
  (pairs, voted) => (pairs.length + voted.length || 1)
);

/**
 * @return {number}
 */
export const getProgress = createSelector(
  getVotedEntries,
  voted => voted.length
);

/////////////////////////////////////////////////////////////////////////
// Reducer
/////////////////////////////////////////////////////////////////////////

/**
 * The profile state with keys for each id.
 *
 * @typedef {{
 * currentProfile: string | null,
 * profiles: Object.<string, Profile>
 * }} ProfileState
 */
const initialState = {
  currentProfile: null,
  profiles: {}
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
      const nameMap = createNameMap(action.data.list);
      let newProfileId = generateNewKey(action.data.name);
      let safetyCheck = 100;

      // Guarantee uniqueness.
      while (state.profiles[newProfileId]) {
        if (safetyCheck--) {
          newProfileId = generateNewKey(action.data.name);
        } else {
          console.error('Failed uniqueness 100 times! Play the lottery?')
          break;
        }
      }

      state.profiles[newProfileId] = {
        ...action.data,
        list: nameMap,
        dateTime: new Date().getTime(),
        pairs: createPairMap(nameMap),
        voted: {}
      };

      return {
        ...state,
        currentProfile: newProfileId,
        profiles: {
          ...state.profiles
        }
      };
    case PROFILE_SET_CURRENT:
      const currentProfileId = action.data.id;
      if (!state.profiles[currentProfileId]) {
        throw new Error(`Invalid profile supplied: '${currentProfileId}'`)
      }
      return {
        ...state,
        currentProfile: currentProfileId
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
