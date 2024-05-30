export type AllowedTypeValue = boolean | number | string | null | undefined;

export type urlUpdateType = "push" | "replace";

export type Setting = {
  urlUpdateType?: urlUpdateType;
  ignoreOtherParams: boolean;
};

export type useSyncSearchParamsType = <
  S extends {
    [key: string]: AllowedTypeValue | AllowedTypeValue[];
  }
>(
  state: S,
  option: {
    [Property in keyof S]: {
      enableParam?: boolean;
    } & (
      | {
          type: "number";
          validParams?: Omit<AllowedTypeValue, "string" | "boolean">;
        }
      | {
          type: "string";
          validParams?: Omit<AllowedTypeValue, "number" | "boolean">;
        }
      | {
          type: "boolean";
          validParams?: Omit<AllowedTypeValue, "number" | "string">;
        }
      | {
          type: "number-array";
          validParams?: Omit<AllowedTypeValue, "string" | "boolean">[];
        }
      | {
          type: "string-array";
          validParams?: Omit<AllowedTypeValue, "number" | "boolean">[];
        }
      | {
          type: "boolean-array";
          validParams?: Omit<AllowedTypeValue, "number" | "string">[];
        }
    );
  },
  setting?: Setting
) => void;
