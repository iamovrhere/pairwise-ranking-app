import {
  LIST_RESET_ROWS,
  PAIR_SKIP,
  PAIR_VOTE,
  PROFILE_ADD,
  PROFILE_RESTORE_STATE,
  PROFILE_SET_CURRENT,
} from './actions';

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
 * @typedef {{
 * currentProfile: string | null,
 * updatedAtTime: number | null,
 * profiles: Object.<string, ProfileItem>
 * }} ProfileState
 */

/**
 *
 * @param {ProfileState} state
 * @param {Action} action
 * @return {ProfileState}
 */
export function reducer(state, action) {
  switch (action.type) {
    case PROFILE_RESTORE_STATE:
      return {
        ...state,
        ...action.data.profileState
      };
    default:
      return {
        ...rootReducer(state, action),
        updatedAtTime: new Date().getTime()
      };
  }
}
/**
 *
 * @param {ProfileState} state
 * @param {Action} action
 * @return {ProfileState}
 */
function rootReducer(state, action) {
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
      return {
        ...state,
        currentProfile: data.newProfileId,
        profiles: profileReducer(state.profiles, action, data.newProfileId)
      };
    case LIST_RESET_ROWS:
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
      const newProfile = {};
      newProfile[currentProfile] = {
        name: data.name,
        list: data.nameMap,
        dateTime: new Date().getTime(),
        pairs: data.pairList,
        totalComparisons: data.pairList.length
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
        pairs: pairReducer(state[currentProfile].pairs, action, data.pairIndex)
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
        pairs: pairReducer(state[currentProfile].pairs, action, data.pairIndex)
      };
      return {
        ...state,
        ...voteProfile
      };
    case LIST_RESET_ROWS:
      const resetRowsProfile = {};
      resetRowsProfile[currentProfile] = {
        ...state[currentProfile],
        dateTime: new Date().getTime(),
        list: listReducer(state[currentProfile].list, action),
        pairs: pairReducer(state[currentProfile].pairs, action)
      };
      return {
        ...state,
        ...resetRowsProfile
      };
    default:
      return state;
  }
}

/**
 *
 * @param {Object.<string, ComparisonCandidate>} state
 * @param {Action} action
 * @param {string|null} listId
 */
function listReducer(state, action, listId = null) {
  const { type, data } = action;
  switch (type) {
    case LIST_RESET_ROWS:
      return {
        ...state,
        ...data.nameMap
      }
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
 * @param {[VotingPair]} state
 * @param {Action} action
 * @param {string|null} pairIndex
 */
function pairReducer(state, action, pairIndex = null) {
  const { type, data } = action;
  switch (type) {
    case LIST_RESET_ROWS:
      const resetPairs = [
        // Merge new data first as we'll be filtering array, first entry wins.
        ...data.pairList,
        ...state,
      ];
      return resetPairs.filter((pair, index) => (
        resetPairs.findIndex(
          pairCheck => pairCheck.id === pair.id || pairCheck.rid === pair.id
        ) === index
      ));
    case PAIR_VOTE:
      const pairNext = [
        ...state,
      ];
      pairNext.splice(pairIndex, 1);
      return pairNext;
    case PAIR_SKIP:
      const pairSkip = [
        ...state,
      ];
      pairSkip[pairIndex].skipped++;
      return pairSkip;
    default:
      return state;
  }
}
