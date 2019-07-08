export interface YacserModel {
  id: string;
  name: string;
  description: string;
}

export interface YacserObject {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface YacserFunction extends YacserObject {
  owner: YacserSystemSlot;
}

export interface YacserRequirement extends YacserObject {
  owner: YacserObject;
}

export interface YacserSystemSlot extends YacserObject {
  functions: YacserFunction[];
}

export interface Query {
  allModels: YacserModel[];
  allObjects: YacserObject[];
  function: YacserFunction;
  requirement: YacserRequirement;
  systemSlot: YacserSystemSlot;
}
