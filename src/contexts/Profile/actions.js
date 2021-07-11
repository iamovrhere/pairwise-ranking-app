export const PROFILE_ADD = 'PROFILE/ADD';
export const PROFILE_SET_CURRENT = 'PROFILE/SET_CURRENT';
export const PAIR_VOTE = 'PROFILE/PAIR/WINNER'
export const PAIR_SKIP = 'PROFILE/PAIR/SKIP'
export const LIST_EDIT = 'PROFILE/LIST/EDIT';
export const LIST_RESET_ROWS = 'PROFILE/LIST/RESET_ROWS';


/////////////////////////////////////////////////////////////////////////
// Actions
/////////////////////////////////////////////////////////////////////////


/**
 *
 * @param {string} newProfileId
 * @param {string} name
 * @param {Object.<string, ComparisonCandidate>} nameMap
 * @param {Object.<string, VotingPair>} pairList
 * @return {Action}
 */
export const addProfile = (newProfileId, name, nameMap, pairList) => ({
  type: PROFILE_ADD,
  data: {
    newProfileId, name, nameMap, pairList
  }
});

/**
 *
 * @param {string} id
 * @return {Action}
 */
export const setCurrentProfile = (id) => ({
  type: PROFILE_SET_CURRENT,
  data: {
    id
  }
});

/**
 *
 * @param {string} pairIndex
 * @param {string} winnerListId
 * @return {Action}
 */
export const votePair = (pairIndex, winnerListId) => ({
  type: PAIR_VOTE,
  data: {
    pairIndex,
    winnerListId
  }
});

/**
 *
 * @param {string} pairIndex
 * @return {Action}
 */
export const skipPair = (pairIndex) => ({
  type: PAIR_SKIP,
  data: {
    pairIndex
  }
});

/**
 *
 * @param {[string]} listIds
 * @param {Object.<string, ComparisonCandidate>} nameMap
 * @param {[VotingPair]} pairList
 * @return {Action}
 */
export const resetListRows = (nameMap, pairList) => ({
  type: LIST_RESET_ROWS,
  data: {
    nameMap, pairList
  }
});
