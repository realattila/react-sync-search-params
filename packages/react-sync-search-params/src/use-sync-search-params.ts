import { useSearchParams } from "./use-search-params";

import type { useSyncSearchParamsType } from "./types/index.ts";

export const useSyncSearchParams: useSyncSearchParamsType = (
  state,
  option,
  setting = { urlUpdateType: "push", ignoreOtherParams: true }
) => {
  const { get, searchParams, set } = useSearchParams({
    urlUpdateType: setting.urlUpdateType,
  });
};
