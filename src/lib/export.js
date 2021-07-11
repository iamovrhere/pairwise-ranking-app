const csvHeader = "data:text/csv;charset=utf-8,";

/**
 * Generates the CSV content from rows.
 * Then uses a hidden element to prompt the CSV.
 *
 * @param {[[string]]} rows An array of arrays
 * @param {string} delimiter
 * @param {string} title Function will append .csv
 * @throws Error If there's a mismatched row
 */
export const exportCsv = (rows, delimiter, title) => {
  let rowWidth = 0;
  const csvContent = csvHeader + rows.map((row, index) => {
    if (!rowWidth) {
      rowWidth = row.length;
    }
    if (rowWidth !== row.length) {
      throw new Error(
        `Mismatched length; expected ${rowWidth} received ${row.length} ` +
        `at row ${index}`
      );
    }
    return row.join(delimiter);
  }).join('\n');

  const hiddenElement = document.createElement('a');
  hiddenElement.href = csvContent;
  hiddenElement.target = '_blank';

  //provide the name for the CSV file to be downloaded
  hiddenElement.download = `${title}.csv`;
  hiddenElement.click();
};
