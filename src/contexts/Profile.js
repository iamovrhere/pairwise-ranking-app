import React from 'react';

export const ProfileContext = React.createContext();

export const PROFILE_ADD = 'PROFILE/ADD';
export const PROFILE_SET_CURRENT = 'PROFILE/SET_CURRENT';

/**
 * The individual units that are being compared.
 * @typedef {{title: string, image: string}} ComparisonItem
 */

/**
* The individual units that are being compared, with meta-data.
*
* @typedef {{
* title: string,
* image: string,
* score: number
* }} ProcessedComparisonItem
*/

/**
 * A voting pair to compare against each other.
 * Default for `voted` is `false`, string value is winner.
 *
 * @typedef {{
 *  left: {title: string, image: string},
 *  right: {title: string, image: string},
 *  voted: string|boolean
 * }} VotingPair
 */

/**
* Profile items as they appear in the profiles map.
*
* @typedef {{
 *   id: string,
 *   name: string,
 *   list: [ProcessedComparisonItem],
 *   dateTime: number,
 *   pairs: [VotingPair]
 * }} ProfileItem
 */

/**
 * This gives every combination between `item` and `list` (excluding itself).
 * The result is N -1.
 *
 * @param {ComparisonItem} item
 * @param {[ComparisonItem]} list
 * @return {[VotingPair]}
 */
const createPairs = (item, list) => list.reduce((pairList, pairItem) => {
  if (item.title !== pairItem.title) {
    pairList.push({
      left: item,
      right: pairItem,
      voted: false
    });
  }
  return pairList;
}, []);

/**
 * This gives every combination between all items in `list`
 * (but not against themselves). The result is (N - 1)^2.
 *
 * @param {[ComparisonItem]} list
 * @return {[VotingPair]}
 */
const createPairList = list => list.reduce((result, item) =>
  result.concat(createPairs(item, list)), []);

/**
 * Removes all duplicates based on the name.
 *
 * @param {[ComparisonItem]} list
 * @return {[ComparisonItem]}
 */
const uniqueByTitles = list => Object.values(
  list.reduce((titleMap, item) => {
    titleMap[item.title] = item;
    return titleMap;
  }, {})
).sort();

/**
 * @param {string} name
 * @return {string} Pseudo-random key of the form ${10CharName}_${getTime()}_${random32Num}
 */
const generateNewKey = (name) =>
  `${name.substring(0, 10)}_` +
  `${new Date().getTime()}_` +
  `${Math.random().toString(36).substring(2, 4)}`;

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
 * @param {string} name
 * @param {[ComparisonItem]} list
 */
export const setCurrentProfile = (id) => ({
  type: PROFILE_SET_CURRENT,
  data: {
    id
  }
});

/**
 * @param {ProfileState} state
 * @returns {[ProfileItem]}
 */
export const getProfiles = state => Object.keys(state.profiles).map((id) => ({
  ...state.profiles[id],
  id
}));

/**
 * @param {ProfileState} state
 * @returns {ProfileItem}
 */
export const getCurrentProfile = state => ({
  ...state.profiles[state.currentProfile],
  id: state.currentProfile
});


/**
 * The profile state with keys for each id.
 *
 * @typedef {{
 * currentProfile: string | null,
 * profiles: {$id: Profile}
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
      const uniqList = uniqueByTitles(action.data.list);
      let newProfileId = generateNewKey(action.data.name);
      let safetyCheck = 100;

      // Guarantee uniqueness.
      while (state.profiles[newProfileId]) {
        if (safetyCheck--) {
          newProfileId = generateNewKey(action.data.name);
        } else {
          console.warn('Failed uniqueness 100 times! Play the lottery?')
          break;
        }
      }

      state.profiles[newProfileId] = {
        ...action.data,
        list: uniqList,
        dateTime: new Date().getTime(),
        pairs: createPairList(uniqList)
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

