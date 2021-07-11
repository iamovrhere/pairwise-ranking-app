let valueCache = {};

/**
 * Creates hook like functions for manipulating local storage.
 *
 * @param {string} key
 * @param {object} initialValue
 * @return {[value: any, setValue: (value) => {}]}
 */
export const useLocalStorage = (key, initialValue) => {
  const getValue = () => {
    try {
      const rawItem = window.localStorage.getItem(key);
      return rawItem ? JSON.parse(rawItem) : initialValue;
    } catch (error) {
      console.error('Failed to retrieve value! Using initial value', error);
      return initialValue;
    }
  };

  valueCache[key] = getValue();

  const setValue = (value) => {
    try {
      const valueString = JSON.stringify(value);
      window.localStorage.setItem(key, valueString);
      valueCache[key] = getValue();
    } catch (error) {
      console.error('Failed to store value!', error);
    }
  };

  return [valueCache[key], setValue];
};
