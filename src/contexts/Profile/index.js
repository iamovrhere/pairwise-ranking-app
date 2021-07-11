import React from 'react';
import { createSelector } from 'reselect'
import { reducer } from './reducers';

/**
 * @typedef {import('./ProfileStructure').ComparisonRow} ComparisonRow
 * @typedef {import('./ProfileStructure').ComparisonCandidate} ComparisonCandidate
 * @typedef {import('./ProfileStructure').ProfileItem} ProfileItem
 * @typedef {import('./ProfileStructure').VotingPair} VotingPair
 * @typedef {import('./reducer').ProfileState} ProfileState
 * @typedef {import('./reducer').Action} Action
 */

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
 * @return {[VotingPair]} Array of VotingPairs.
 */
export const getPairs = createSelector(
  getCurrentProfile,
  profile => profile ? profile.pairs : []
);

/**
 * @return {[ComparisonCandidate]}
 */
export const getListValues = createSelector(
  getCurrentProfile,
  profile => profile ? Object.values(profile.list) : []
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
  getCurrentProfile,
  (profile) => (profile && profile.totalComparisons) || 1
);

/**
 * @return {number}
 */
export const getProgress = createSelector(
  getPairs,
  getTotalComparisons,
  (pairs, total) => pairs ? total - pairs.length : 0
);


/**
* The profile state with keys for each id.
*
* @typedef ProfileState
*/
const initialState = {
  currentProfile: null,
  profiles: {}
};

export const ProfileContext = React.createContext();

/**
 * @returns {{ state: ProfileState, dispatch: (Action) => {}}}
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
