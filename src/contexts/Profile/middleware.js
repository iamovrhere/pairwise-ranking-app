import { getCurrentProfile } from 'contexts/Profile';
import { addProfile, resetListRows } from 'contexts/Profile/actions';
import { generateNewKey } from 'lib';
import { createNameMap, createPairList, resetPairList } from './ProfileStructure';

/**
 * @typedef {import('./ProfileStructure').ComparisonRow} ComparisonRow
 * @typedef {import('./ProfileStructure').ComparisonCandidate} ComparisonCandidate
 * @typedef {import('./ProfileStructure').ProfileItem} ProfileItem
 * @typedef {import('./ProfileStructure').VotingPair} VotingPair
 */

// 4 spaces, because tabs are difficult in browsers.
// TODO change to multiple space + http://
const SEPARATOR = '    ';

/**
 * Does the process of creating the new profile + pair list.
 * Then dispatches.
 *
 * @param {{ state: any, dispatch: Function}} dispatch
 * @param {string} name
 * @param {string} listText text with a separator (current 4 tabs)
 */
export const asyncCreateProfile = async (context, name, listText) => {
  const { state, dispatch } = context;
  const list = listText.split('\n').map((row) => {
    const [name, image] = row.split(SEPARATOR);
    return { name, image };
  }).filter(({ name, image }) => name || image);

  let newProfileId = generateNewKey(name);
  let safetyCheck = 100;

  // Guarantee uniqueness.
  while (state.profiles[newProfileId]) {
    if (safetyCheck--) {
      newProfileId = generateNewKey(name);
    } else {
      console.error('Failed uniqueness 100 times! Play the lottery?')
      break;
    }
  }

  const nameMap = createNameMap(list);
  const pairList = createPairList(nameMap);
  console.log(nameMap, pairList);
  dispatch(addProfile(newProfileId, name, nameMap, pairList));
};

/**
 * Does the process of creating the new profile + pair list.
 * Then dispatches.
 *
 * @param {{ state: any, dispatch: Function}} dispatch
 * @param {[string]} listIds
 */
export const asyncResetListRows = async (context, listIds) => {
  const { state, dispatch } = context;
  const profile = getCurrentProfile(state);
  const nameMap = listIds.reduce((map, id) => {
    const resetItem = { ...profile.list[id] };
    resetItem.score = 0;
    map[id] = resetItem;
    return map;
  }, {});
  const pairList = resetPairList(nameMap, profile.list);
  console.log(nameMap, pairList);
  dispatch(resetListRows(nameMap, pairList));
};
