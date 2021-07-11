
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
 *
 * @typedef {{
 *  id: string,
 *  rid: string,
 *  left: ComparisonCandidate,
 *  right: ComparisonCandidate,
 *  skipped: number,
 * }} VotingPair
 */

/**
* Profile items as they appear in the profiles map.
* Where the `pairs` are "to be voted". Performance works best
* as an array for the pairs.
*
* @typedef {{
 *   id: string,
 *   name: string,
 *   list: Object.<string, ComparisonCandidate>,
 *   dateTime: number,
 *   pairs: [VotingPair],
 *   totalComparisons: number
 * }} ProfileItem
 */

/**
 * This gives every combination between `firstEntry` and `list`.
 * It does not account for duplicates, so list may need to be filtered.
 *
 * @param {[string, ComparisonCandidate]} firstEntry
 * @param {Object.<string, ComparisonCandidate>} list
 * @return {[VotingPair]}
 */
const createPairs = (firstEntry, list) => {
  const [firstKey, firstItem] = firstEntry;
  return list.map(([secondKey, secondItem]) => ({
    id: `${firstKey}${secondKey}`,
    rid: `${secondKey}${firstKey}`,
    left: firstItem,
    right: secondItem,
    skipped: 0
  }));
};

/**
 * This gives every combination between all items in `list`
 * but not against themselves & disregarding order.
 * The result is  n!/r!(n-r)!.
 *
 * @param {Object.<string, ComparisonCandidate>} list
 * @return {[VotingPair]}
 */
export const createPairList = (list) => {
  const listEntries = Object.entries(list);
  return createPairListRecursive(listEntries);
}

/**
 * This gives every combination between all items in `list`
 * but not against themselves & disregarding order.
 * The result is  n!/r!(n-r)!.
 *
 * @param {[ComparisonCandidate]} listEntries
 * @return {[VotingPair]}
 */
const createPairListRecursive = (listEntries) => {
  if (listEntries.length < 2) {
    return [];
  }
  // By reducing the remainder by one, we ensure no
  // mirror duplicates.
  const firstItem = listEntries[0];
  const remainder = listEntries.slice(1);

  const pairs = createPairs(firstItem, remainder);
  return pairs.concat(createPairListRecursive(remainder));
};

/**
 * This gives every combination between all items in `list`
 * but not against themselves & disregarding order.
 * The result is  n!/r!(n-r)!.
 *
 * @param {Object.<string, ComparisonCandidate>} resetList
 * @param {Object.<string, ComparisonCandidate>} list
 * @return {[VotingPair]}
 */
export const resetPairList = (resetList, list) => {
  const key = 0;
  const resetEntries = Object.entries(resetList);
  let listEntries = Object.entries(list);

  return resetEntries.reduce((result, firstItem) => {
    // We remove each matching record first, to prevent a double list.
    listEntries = listEntries.filter((item) => firstItem[key] !== item[key]);
    return result.concat(createPairs(firstItem, listEntries));
  }, []);
}

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
