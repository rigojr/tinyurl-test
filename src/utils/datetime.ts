/**
 * Gets the formatted date.
 *
 * @param date The given unformatted date.
 */
export function getFormattedDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US');
}