// src/utils/dateUtils.js

/**
 * Parses an ISO string into a Date object
 * @param {string} isoString - The ISO string to parse (e.g., "2024-09-15T00:00")
 * @returns {Date} The parsed Date object
 */
export function parseISOString(isoString) {
  return new Date(isoString);
}

/**
 * Formats a Date object to a readable string
 * @param {Date} date - The Date object to format
 * @returns {string} A formatted date string (e.g., "Sunday, September 15, 2024")
 */
export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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
