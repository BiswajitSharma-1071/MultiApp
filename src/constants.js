// CODINGBOX constants

export const CB_ROOT_NODE_ID = "0";
export const CB_NODETYPE_ROOT = "ROOT";
export const CB_NODETYPE_CUSTOMDATAPOINT = "CUSTOMDATAPOINT";
export const CB_NODETYPE_SAVEDDATAPOINT = "SAVEDDATAPOINT";
export const CB_NODETYPE_OPERATOR = "OPERATOR";
export const CB_NODETYPE_FUNCTION = "FUNCTION";

export const CB_OPERATORS = {
  type: {
    and: { label: "AND", symbol: "AND" },
    or: { label: "OR", symbol: "OR" },
    andnot: { label: "AND NOT", symbol: "AND NOT" },
    ornot: { label: "OR NOT", symbol: "OR NOT" },
    xor: { label: "XOR", symbol: "XOR" },
    not: { label: "NOT", symbol: "NOT" },
  },
  isTop: false,
};

export const CB_APPLY_OPTIONS = [
  { label: "to a Group", key: 0, funcName: 0 },
  { label: "to Each item", key: 1, funcName: 1 },
];
