
/**
 * The individual units that are being compared.
 * @typedef {{
  * name: string,
  * image: string
  * }} ComparisonRow
  */

/**
* The individual units that are being compared, with meta-data.
*
* @typedef {{
* id: string,
* name: string,
* image: string,
* score: number
* }} ComparisonCandidate
*/

/**
 * A voting pair to compare against each other.
 * Default for `winner` is `false`, string value is winner.
 *
 * @typedef {{
 *  left: ComparisonCandidate,
 *  right: ComparisonCandidate,
 *  skipped: number,
 * }} VotingPair
 */

/**
* Profile items as they appear in the profiles map.
* Where the `pairs` are "to be voted".
*
* @typedef {{
 *   id: string,
 *   name: string,
 *   list: Object.<string, ComparisonCandidate>,
 *   dateTime: number,
 *   pairs: Object.<string, VotingPair>,
 *   totalComparisons: number
 * }} ProfileItem
 */

/**
 * This gives every combination between `item` and `list` (excluding itself).
 * The result is n!/r!(n-r)!.
 *
 * @param {[string, ComparisonRow]} rowEntry
 * @param {Object.<string, ComparisonCandidate>} list
 * @param {Object.<string, ComparisonCandidate>} result
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
        skipped: 0
      };
    }
    return pairMap;
  }, {});

// TODO: RE-Refactor to use Arrays instead of maps.
// Hash maps are a poor match due to the cloning that occurs.

/**
 * This gives every combination between all items in `list`
 * but not against themselves & disregarding order.
 * The result is  n!/r!(n-r)!.
 *
 * @param {Object.<string, ComparisonCandidate>} list
 * @return {[VotingPair]}
 */
export const createPairMap = list => resetPairMap(list, list);

/**
 * This gives every combination between all items in `list`
 * but not against themselves & disregarding order.
 * The result is  n!/r!(n-r)!.
 *
 * @param {Object.<string, ComparisonCandidate>} resetList
 * @param {Object.<string, ComparisonCandidate>} list
 * @return {[VotingPair]}
 */
// TODO: this is a resource hog even when it's done in a Promise.
export const resetPairMap = (resetList, list) => Object.entries(resetList).reduce(
  (result, item) => ({ ...result, ...createPairs(item, list, result) }),
  {}
);

/*
    const invertedPairKey = `${secondKey}${key}`;
    if (key !== secondKey && !result[invertedPairKey]) {
      pairMap[pairKey] = {
        left: item,
        right: secondItem,
        skipped: 0
      };
*/

// TODO this works a lot better but doesn't solve the reset issue.
function pairwise(list) {
  if (list.length < 2) {
    return [];
  }
  const [key, first] = list[0];
  const rest = list.slice(1);

  const pairs = rest.map(function ([secondKey, second]) {
    return {
      id: `${key}${secondKey}`,
      left: first,
      right: second,
      skipped: 0
    };
  });
  return pairs.concat(pairwise(rest));
}

// export const resetPairMap = (resetList, list) => {
//   const resetEntries = Object.entries(resetList);
//   const listEntries = Object.entries(list);

//   return pairwise(listEntries);
// };

/**
 * Removes all duplicates based on the name. Adds score + id.
 *
 * @param {[ComparisonRow]} list
 * @return {Object.<string, ComparisonCandidate>}
 */
export const createNameMap = list => list.reduce((nameMap, item) => {
  const id = '_' + item.name;
  nameMap[id] = {
    ...item,
    id,
    score: 0,
  };
  return nameMap;
}, {});
