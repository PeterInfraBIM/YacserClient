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
  requirements: YacserRequirement[];
  input: YacserSystemInterface;
  output: YacserSystemInterface;
  assembly: YacserFunction;
  parts: YacserFunction[];
}

export class UpdateFunctionInput {
  updateName: string;
  updateDescription: string;
  constructor(private functionId: string) {
  }
}

export interface YacserHamburger extends YacserObject {
  functionalUnit: YacserSystemSlot;
  technicalSolution: YacserRealisationModule;
}

export interface YacserPerformance extends YacserObject {
  owner: YacserRealisationModule;
  value: YacserValue;
}

export interface YacserRealisationModule extends YacserObject {
  performances: YacserPerformance[];
  hamburgers: YacserHamburger[];
  assembly: YacserRealisationModule;
  parts: YacserRealisationModule[];
}

export interface YacserRequirement extends YacserObject {
  owner: YacserObject;
  minValue: YacserValue;
  maxValue: YacserValue;
}

export interface YacserSystemInterface extends YacserObject {
  systemSlot0: YacserSystemSlot;
  systemSlot1: YacserSystemSlot;
  functionInputs: YacserFunction[];
  functionOutputs: YacserFunction;
}

export interface YacserSystemSlot extends YacserObject {
  functions: YacserFunction[];
  interfaces: YacserSystemInterface;
  hamburgers: YacserHamburger[];
}

export interface YacserValue extends YacserObject {
  unit: string;
  value: number;
}

export interface Query {
  allModels: YacserModel[];
  allObjects: YacserObject[];
  function: YacserFunction;
  hamburger: YacserHamburger;
  performance: YacserPerformance;
  realisationModule: YacserRealisationModule;
  requirement: YacserRequirement;
  systemInterface: YacserSystemInterface;
  systemSlot: YacserSystemSlot;
  value: YacserValue;
}

export interface Mutation {
  createModel: YacserModel;
  createObject: YacserObject;
}

export enum YacserObjectType {
  Function = 'Function',
  Hamburger = 'Hamburger',
  Performance = 'Performance',
  PortRealisation = 'PortRealisation',
  RealisationModule = 'RealisationModule',
  RealisationPort = 'RealisationPort',
  Requirement = 'Requirement',
  SystemInterface = 'SystemInterface',
  SystemSlot = 'SystemSlot',
  Value = 'Value'
}
