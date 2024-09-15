/**
 * Parses an ISO string (e.g., "2024-09-15T00:00") to extract the date in "YYYY-MM-DD" format
 * and the hour in "HH" format.
 *
 * @param {string} isoString - The ISO string to parse, expected in the format "YYYY-MM-DDTHH:mm".
 * @returns {Object} An object containing:
 *  - `date` {string}: The date in "YYYY-MM-DD" format.
 *  - `hour` {string}: The hour in "HH" format (24-hour clock).
 *
 * @example
 * const result = parseISOString("2024-09-15T00:00");
 * console.log(result.date); // Output: "2024-09-15"
 * console.log(result.hour); // Output: "00"
 *
 * @throws {Error} Will throw an error if the input string is not a valid ISO format.
 */
export function parseISOString(isoString) {
  // Create a new Date object from the ISO string
  const dateObj = new Date(isoString);

  // Validate the date
  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid ISO string format');
  }

  // Extract the date in YYYY-MM-DD format
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(dateObj.getDate()).padStart(2, '0');

  // Extract the hour in HH format
  const hours = String(dateObj.getHours()).padStart(2, '0');

  // Construct the final date and hour strings
  const formattedDate = `${year}-${month}-${day}`;
  const formattedHour = hours;

  return {
    date: formattedDate,
    hour: formattedHour,
  };
}

/**
 * Gets the day of the week abbreviation from a Date object
 * @param {Date} date - The Date object
 * @returns {string} The day of the week abbreviation (e.g., "Su", "Mo", etc.)
 */
export function getWeekdayAbbr(date) {
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return weekdays[date.getDay()];
}
