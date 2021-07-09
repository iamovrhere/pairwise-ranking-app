import React from 'react';
import { createSelector } from 'reselect'
import { generateNewKey } from 'lib';

export const ProfileContext = React.createContext();

/**
 * The individual units that are being compared.
 * @typedef {{
 * name: string,
 * image: string
 * }} ComparisonItem
 */

/**
* The individual units that are being compared, with meta-data.
*
* @typedef {{
* id: string,
* name: string,
* image: string,
* score: number
* }} ProcessedComparisonItem
*/

/**
 * A voting pair to compare against each other.
 * Default for `winner` is `false`, string value is winner.
 *
 * @typedef {{
 *  left: ProcessedComparisonItem,
 *  right: ProcessedComparisonItem,
 *  winner: string|null,
 *  skipped: number,
 * }} VotingPair
 */

/**
* Profile items as they appear in the profiles map.
* Where the `pairs` are "to be voted" and `voted` past pairs.
*
* @typedef {{
 *   id: string,
 *   name: string,
 *   list: Object.<string, ProcessedComparisonItem>,
 *   dateTime: number,
 *   pairs: Object.<string, VotingPair>,
 *   voted: Object.<string, VotingPair>,
 * }} ProfileItem
 */

/**
 * This gives every combination between `item` and `list` (excluding itself).
 * The result is n!/r!(n-r)!.
 *
 * @param {[string, ComparisonItem]} param0
 * @param {Object.<string, ProcessedComparisonItem>} list
 * @param {Object.<string, ProcessedComparisonItem>} result
 * @return {[VotingPair]}
 */
const createPairs = ([key, item], list, result) => Object.entries(list)
  .reduce((pairMap, [secondKey, secondItem]) => {
    const pairKey = `${key}${secondKey}`;
    const invertedPairKey = `${secondKey}${key}`;
    if (key !== secondKey && !result[invertedPairKey]) {
      pairMap[pairKey] = {
        left: item,
        right: secondItem,
        winner: null,
        skipped: 0
      };
    }
    return pairMap;
  }, {});

/**
 * This gives every combination between all items in `list`
 * but not against themselves & disregarding order.
 * The result is  n!/r!(n-r)!.
 *
 * @param {Object.<string, ProcessedComparisonItem>} list
 * @return {[VotingPair]}
 */
const createPairMap = list => Object.entries(list).reduce(
  (result, item) => ({ ...result, ...createPairs(item, list, result) }),
  {}
);

/**
 * Removes all duplicates based on the name. Adds score + id.
 *
 * @param {[ComparisonItem]} list
 * @return {Object.<string, ProcessedComparisonItem>}
 */
const uniqueByName = list => list.reduce((nameMap, item) => {
  const id = '_' + item.name;
  nameMap[id] = {
    ...item,
    id,
    score: 0,
  };
  return nameMap;
}, {});

/////////////////////////////////////////////////////////////////////////
// Actions
/////////////////////////////////////////////////////////////////////////

export const PROFILE_ADD = 'PROFILE/ADD';
export const PROFILE_SET_CURRENT = 'PROFILE/SET_CURRENT';

/**
 *
 * @param {string} name
 * @param {[ComparisonItem]} list
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
 * @return {[ProcessedComparisonItem]}
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
      const nameMap = uniqueByName(action.data.list);
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

