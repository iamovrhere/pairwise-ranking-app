import React from 'react';
import { createSelector } from 'reselect'
import { useLocalStorage } from 'lib/localStorage';
import { restoreProfileState } from './actions';
import { reducer } from './reducers';

/**
 * @typedef {import('./ProfileStructure').ComparisonRow} ComparisonRow
 * @typedef {import('./ProfileStructure').ComparisonCandidate} ComparisonCandidate
 * @typedef {import('./ProfileStructure').ProfileItem} ProfileItem
 * @typedef {import('./ProfileStructure').VotingPair} VotingPair
 * @typedef {import('./reducers').ProfileState} ProfileState
 * @typedef {import('./reducers').Action} Action
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
 * @param {ProfileState} state
 * @return {[VotingPair]} Array of VotingPairs.
 */
export const getPairs = createSelector(
  getCurrentProfile,
  profile => profile ? profile.pairs : []
);

/**
 * @param {ProfileState} state
 * @return {[ComparisonCandidate]}
 */
export const getListValues = createSelector(
  getCurrentProfile,
  profile => profile ? Object.values(profile.list) : []
);

/**
 * @param {ProfileState} state
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
 * @param {ProfileState} state
 * @return {number} The length of comparisons or 1 (to prevent NaN/Infinity).
 */
export const getTotalComparisons = createSelector(
  getCurrentProfile,
  (profile) => (profile && profile.totalComparisons) || 1
);

/**
 * @param {ProfileState} state
 * @return {number}
 */
export const getProgress = createSelector(
  getPairs,
  getTotalComparisons,
  (pairs, total) => pairs ? total - pairs.length : 0
);

/**
 *
 * @param {ProfileState} state
 * @return {number}
 */
export const getUpdatedAtTime = (state) => state.updatedAtTime;

/**
* The profile state with keys for each id.
*
* @typedef ProfileState
*/
const initialState = {
  currentProfile: null,
  updatedAtTime: null,
  profiles: {}
};

export const ProfileContext = React.createContext();

/**
 * Be careful changing this; can use the version number
 * to nail down the storage schema/migrations if necessary.
 * We nest local storage since we expect multiple localhost AND
 * multiple` iamovrhere.github.io` applications.
 */
const localStorageKey = 'pairwise-ranking-app:profiles:v0.1.0';

/**
 * @returns {{ state: ProfileState, dispatch: (Action) => {}}}
 */
export function ProfileProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [storageState, setStorageState] = useLocalStorage(localStorageKey, initialState);

  const storedUpdatedAt = getUpdatedAtTime(storageState);
  const currentUpdatedAt = getUpdatedAtTime(state);
  const isStoredStale = storedUpdatedAt < currentUpdatedAt;

  React.useEffect(() => {
    const currentProfile = getCurrentProfile(state);
    const storedProfile = getCurrentProfile(storageState);
    if (!currentProfile && storedProfile) {
      dispatch(restoreProfileState(storageState));
    }
  }, [dispatch, state, storageState]);

  React.useEffect(() => {
    const currentProfile = getCurrentProfile(state);
    if (!storedUpdatedAt || (currentProfile && isStoredStale)) {
      setStorageState(state);
    }
  }, [state, storedUpdatedAt, isStoredStale, setStorageState]);

  const value = { state, dispatch };

  return (
    <ProfileContext.Provider value={value}>
      {props.children}
    </ProfileContext.Provider>
  );
}
