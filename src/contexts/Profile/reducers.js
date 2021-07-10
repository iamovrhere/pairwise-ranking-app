import {
  PROFILE_ADD,
  PROFILE_SET_CURRENT,
  PAIR_VOTE,
  PAIR_SKIP
} from './actions';
import { generateNewKey } from 'lib';
import { createNameMap, createPairMap } from './ProfileStructure';

/**
 * @typedef {import('./ProfileStructure').ComparisonRow} ComparisonRow
 * @typedef {import('./ProfileStructure').ComparisonCandidate} ComparisonCandidate
 * @typedef {import('./ProfileStructure').ProfileItem} ProfileItem
 * @typedef {import('./ProfileStructure').VotingPair} VotingPair
 */


/**
 * React reducer action.
 * @typedef {{
 *  type: string, data: any
 * }} Action
 */

/**
 *
 * @param {ProfileState} state
 * @param {Action} action
 * @return {ProfileState}
 */
export function reducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case PROFILE_SET_CURRENT:
      const currentProfileId = data.id;
      if (!state.profiles[currentProfileId]) {
        throw new Error(`Invalid profile supplied: '${currentProfileId}'`);
      }
      return {
        ...state,
        currentProfile: currentProfileId
      };
    case PROFILE_ADD:
      let newProfileId = generateNewKey(data.name);
      let safetyCheck = 100;

      // Guarantee uniqueness.
      while (state.profiles[newProfileId]) {
        if (safetyCheck--) {
          newProfileId = generateNewKey(data.name);
        } else {
          console.error('Failed uniqueness 100 times! Play the lottery?')
          break;
        }
      }

      return {
        ...state,
        currentProfile: newProfileId,
        profiles: profileReducer(state.profiles, action, newProfileId)
      };
    case PAIR_SKIP:
    case PAIR_VOTE:
      if (!state.profiles[state.currentProfile]) {
        throw new Error(`No profile selected!`);
      }
      return {
        ...state,
        profiles: profileReducer(state.profiles, action, state.currentProfile)
      };
    default:
      return state;
  }
}

/**
 *
 * @param {Object.<string, ProfileItem>} state
 * @param {Action} action
 * @param {string} currentProfile
 */
function profileReducer(state, action, currentProfile) {
  const { type, data } = action;
  switch (type) {
    case PROFILE_ADD:
      const nameMap = createNameMap(data.list);
      const pairMap = createPairMap(nameMap);
      const newProfile = {};
      newProfile[currentProfile] = {
        name: data.name,
        list: nameMap,
        dateTime: new Date().getTime(),
        pairs: pairMap,
        totalComparisons: Object.values(pairMap).length
      };

      return {
        ...state,
        ...newProfile
      };
    case PAIR_SKIP:
      const skipProfile = {};
      skipProfile[currentProfile] = {
        ...state[currentProfile],
        dateTime: new Date().getTime(),
        pairs: pairReducer(state[currentProfile].pairs, action, data.pairId)
      };
      return {
        ...state,
        ...skipProfile
      };
    case PAIR_VOTE:
      const voteProfile = {};
      voteProfile[currentProfile] = {
        ...state[currentProfile],
        dateTime: new Date().getTime(),
        list: listReducer(state[currentProfile].list, action, data.winnerListId),
        pairs: pairReducer(state[currentProfile].pairs, action, data.pairId)
      };
      return {
        ...state,
        ...voteProfile
      };
    default:
      return state;
  }
}

/**
 *
 * @param {Object.<string, ComparisonCandidate>} state
 * @param {Action} action
 * @param {string} listId
 */
function listReducer(state, action, listId) {
  const { type } = action;
  switch (type) {
    case PAIR_VOTE:
      const voteListRow = {}
      voteListRow[listId] = {
        ...state[listId],
      };
      voteListRow[listId].score++;
      return {
        ...state,
        ...voteListRow
      };
    default:
      return state;
  }
}

/**
 *
 * @param {Object.<string, VotingPair>} state
 * @param {Action} action
 * @param {string} pairId
 */
function pairReducer(state, action, pairId) {
  const { type } = action;
  switch (type) {
    case PAIR_VOTE:
      const pairNext = {
        ...state,
      };
      delete pairNext[pairId];
      return pairNext;
    case PAIR_SKIP:
      const pairSkip = {};
      pairSkip[pairId] = {
        ...state[pairId],
      };
      pairSkip[pairId].skipped++;
      return {
        ...state,
        ...pairSkip
      };
    default:
      return state;
  }
}
