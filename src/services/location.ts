import { isNullish, isObject } from "@/utils/type-checking";

/**
 * The geonames data structure.
 */
type Geoname = {
  'name': string;
  'countryCode': string;
}

/**
 * Indicates whether the value is geoname or not
 *
 * @param value The unknown value.
 */
function isGeonames(value: unknown): value is Geoname[] {
  return Array.isArray(value); // TODO: more validation to check.
}

/**
 * Builds the location search url.
 *
 * @param query         The search query
 * @param maximumCounts The optional maximum result counts.
 *
 * @throws {Error} If the API configuration is not valid.
 */
function buildUrl(query: string, maximumCounts: number): string {
  const baseUrl = process.env.VUE_APP_GEONAMES_API_URL;
  const username = process.env.VUE_APP_GEONAMES_API_USERNAME;

  if (isNullish(baseUrl) || isNullish(username)) {
    throw new Error('API configuration is not properly defined.');
  }

  return `${baseUrl}?q=${query}&featureClass=P&username=${username}&maxRows=${maximumCounts}`;
}

/**
 * Builds the location collection.
 *
 * @param data The raw data.
 *
 * @throws {Error} If raw data is ill-formed.
 */
function buildLocation(data: unknown): string[] {
  if (!isObject(data)) {
    throw new Error('Response data is not an object.');
  }

  if (isNullish(data.geonames) || !isGeonames(data.geonames)) {
    throw new Error('Response geonames object is not properly formed.');
  }

  return data.geonames.map((payload) => `${payload.countryCode} - ${payload.name}`);
}

/**
 * Searches location with the given query.
 *
 * @param query         The search query
 * @param maximumCounts The optional maximum result counts.
 *
 * @throws {Error} If response is not ok.
 * @throws {Error} If something unexpected went wrong in the API call.
 */
export async function searchLocation(query: string, maximumCounts = 10): Promise<string[]> {
  const url = buildUrl(query, maximumCounts);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Something went wrong, please try again later.');
  }

  return buildLocation(await response.json());
}