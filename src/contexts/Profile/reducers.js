import {
  LIST_RESET_ROWS,
  PAIR_SKIP,
  PAIR_VOTE,
  PROFILE_ADD,
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
 * profiles: Object.<string, ProfileItem>
 * }} ProfileState
 */

// TODO purify reducers - I'm doing too much work in these; they should
// be pure functions (data in, minimal transformation).
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
        pairs: data.pairMap,
        totalComparisons: Object.values(data.pairMap).length
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
    case LIST_RESET_ROWS:
      const resetRowsProfile = {};
      resetRowsProfile[currentProfile] = {
        ...state[currentProfile],
        dateTime: new Date().getTime(),
        list: {
          ...state[currentProfile].list,
          ...data.nameMap
        },
        pairs: {
          ...state[currentProfile].pairs,
          ...data.pairMap
        }
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
