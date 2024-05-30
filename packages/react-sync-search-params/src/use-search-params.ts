import React from "react";
import type { urlUpdateType } from "./types";

const revalidateParam = (param: string[]) => {
  const length = param.length;
  switch (length) {
    case 0:
      return "";
    case 1:
      return param[0];
    default:
      return param;
  }
};
/**
 * Parameters for the useSearchParams function.
 */
type Args = {
  urlUpdateType?: urlUpdateType;
};

/**
 * A custom hook for managing and interacting with URL search parameters.
 *
 * @param args - Parameters for configuring the behavior of the hook.
 * @returns An object containing functions to get, set, get all, and set all search parameters.
 */
export function useSearchParams(args: Args) {
  const [searchParams, setSearchParams] = React.useState(
    new URLSearchParams(window.location.search)
  );

  React.useEffect(() => {
    /**
     * Event handler to update search parameters when the URL changes.
     */
    const updateSearchParams = () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      setSearchParams(urlSearchParams);
    };

    // Listen for changes in the URL
    window.addEventListener("popstate", updateSearchParams);

    return () => {
      // Clean up the event listener
      window.removeEventListener("popstate", updateSearchParams);
    };
  }, [searchParams]);

  /**
   * Get the value of a specific search parameter.
   *
   * @param key - The search parameter key.
   * @returns The value of the search parameter, or null if not found.
   */
  const get = (key: string) => revalidateParam(searchParams.getAll(key));

  /**
   * Set the value of a search parameter and update the URL.
   *
   * @param key - The search parameter key.
   * @param value - The new value for the search parameter.
   */
  const set = (key: string, value: string | string[]) => {
    const searchParamsInstanceCopy = new URLSearchParams(searchParams);

    searchParamsInstanceCopy.delete(key);
    if (typeof value === "string") {
      searchParamsInstanceCopy.set(key, value);
    } else {
      value.forEach((i) => {
        searchParamsInstanceCopy.set(key, i);
      });
    }
    updateUrl(searchParamsInstanceCopy);
  };

  // Helper function to update the URL without a page refresh
  const updateUrl = (newSearchParams: URLSearchParams) => {
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
    if (args.urlUpdateType === "push") {
      window.history.pushState({}, "", newUrl);
    } else {
      window.history.replaceState({}, "", newUrl);
    }
  };

  return { get, set, searchParams };
}
