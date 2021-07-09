/**
 * Collection of simple lib/util functions.
 * Be wary of making this a dumping ground.
 */


/**
 * @param {string} base
 * @return {string} Random key of the form: `${10CharBase}_${getTime()}_${random32Num}`
 */
export const generateNewKey = (base) =>
  `${base.substring(0, 10)}_` +
  `${new Date().getTime()}_` +
  `${Math.random().toString(36).substring(2, 4)}`;

/**
 * @return {boolean}
 */
export const flipCoin = () => Math.round(Math.random() * 2) % 2 === 0;
