/**
 * Represents the properties passed to a page component.
 *
 * @typedef {Object} PageProps
 * @property {Object} params - An object containing route parameters.
 * @property {Object.<string, string>} params - Additional route parameters.
 * @property {Object.<string, (string | string[] | undefined)>} searchParams - An object containing query parameters.
 */
export type PageProps = {
  params: {
    [key: string]: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
