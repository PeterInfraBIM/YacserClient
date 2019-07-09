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

export interface YacserPerformance extends YacserObject {
  owner: YacserRealisationModule;
  value: YacserValue;
}

export interface YacserRealisationModule extends YacserObject {
  performances: YacserPerformance[];
}
export interface YacserRequirement extends YacserObject {
  owner: YacserObject;
  minValue: YacserValue;
  maxValue: YacserValue;
}

export interface YacserSystemSlot extends YacserObject {
  functions: YacserFunction[];
}

export interface YacserValue extends YacserObject {
  unit: string;
  value: number;
}

export interface Query {
  allModels: YacserModel[];
  allObjects: YacserObject[];
  function: YacserFunction;
  performance: YacserPerformance;
  realisationModule: YacserRealisationModule;
  requirement: YacserRequirement;
  systemSlot: YacserSystemSlot;
  value: YacserValue;
}
