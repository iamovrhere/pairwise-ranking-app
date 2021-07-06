import React from 'react';

export const ProfileContext = React.createContext();

export const PROFILE_ADD = 'PROFILE/ADD';

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
 *
 * @param {[ComparisonItem]} list
 */
const uniqueByTitles = list => Object.values(
  list.reduce((titleMap, item) => {
    titleMap[item.title] = item;
    return titleMap;
  }, {})
).sort();


/**
 * @param {string} name
 * @return {string} New pseudo-random key
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
 * Base store.
 * @typedef {{
  currentProfile: null,
  profiles: {{name: string, id: string}}
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
      const newList = uniqueByTitles(action.data.list);
      const newProfile = {
        ...action.data,
        list: newList,
        id: generateNewKey(action.data.name),
        dateTime: new Date().getTime(),
        pairs: createPairList(newList)
      };

      return {
        ...state,
        profiles: [...state.profiles, newProfile]
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

