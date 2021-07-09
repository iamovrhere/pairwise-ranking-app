
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
 *  winner: string|null,
 *  skipped: number,
 * }} VotingPair
 */

/**
* Profile items as they appear in the profiles map.
* Where the `pairs` are "to be voted" and `voted` past pairs.
*
* @typedef {{
 *   id: string,
 *   name: string,
 *   list: Object.<string, ComparisonCandidate>,
 *   dateTime: number,
 *   pairs: Object.<string, VotingPair>,
 *   voted: Object.<string, VotingPair>,
 * }} ProfileItem
 */

/**
 * This gives every combination between `item` and `list` (excluding itself).
 * The result is n!/r!(n-r)!.
 *
 * @param {[string, ComparisonRow]} param0
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
        winner: null,
        skipped: 0
      };
    }
    return pairMap;
  }, {});

/**
 * This gives every combination between all items in `list`
 * but not against themselves & disregarding order.
 * The result is  n!/r!(n-r)!.
 *
 * @param {Object.<string, ComparisonCandidate>} list
 * @return {[VotingPair]}
 */
export const createPairMap = list => Object.entries(list).reduce(
  (result, item) => ({ ...result, ...createPairs(item, list, result) }),
  {}
);

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
