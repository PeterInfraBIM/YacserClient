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
  functionId: string;
  updateName: string;
  updateDescription: string;

  constructor(functionId: string) {
    this.functionId = functionId;
  }
}

export interface YacserHamburger extends YacserObject {
  functionalUnit: YacserSystemSlot;
  technicalSolution: YacserRealisationModule;
}

export class UpdateHamburgerInput {
  hamburgerId: string
  updateName: string;
  updateDescription: string;

  constructor(hamburgerId: string) {
    this.hamburgerId = hamburgerId;
  }
}

export interface YacserPerformance extends YacserObject {
  owner: YacserRealisationModule;
  value: YacserValue;
}

export class UpdatePerformanceInput {
  performanceId: string
  updateName: string;
  updateDescription: string;

  constructor(performanceId: string) {
    this.performanceId = performanceId;
  }
}

export interface YacserRealisationModule extends YacserObject {
  performances: YacserPerformance[];
  hamburgers: YacserHamburger[];
  assembly: YacserRealisationModule;
  parts: YacserRealisationModule[];
}

export class UpdateRealisationModuleInput {
  realisationModuleId: string
  updateName: string;
  updateDescription: string;
  updateAssembly: string;

  constructor(realisationModuleId: string) {
    this.realisationModuleId = realisationModuleId;
  }
}

export interface YacserRequirement extends YacserObject {
  owner: YacserObject;
  minValue: YacserValue;
  maxValue: YacserValue;
}

export class UpdateRequirementInput {
  requirementId: string
  updateName: string;
  updateDescription: string;

  constructor(requirementId: string) {
    this.requirementId = requirementId;
  }
}

export interface YacserSystemInterface extends YacserObject {
  systemSlot0: YacserSystemSlot;
  systemSlot1: YacserSystemSlot;
  functionInputs: YacserFunction[];
  functionOutputs: YacserFunction;
}

export class UpdateSystemInterfaceInput {
  systemInterfaceId: string
  updateName: string;
  updateDescription: string;

  constructor(systemInterfaceId: string) {
    this.systemInterfaceId = systemInterfaceId;
  }
}

export interface YacserSystemSlot extends YacserObject {
  functions: YacserFunction[];
  interfaces: YacserSystemInterface;
  hamburgers: YacserHamburger[];
}

export class UpdateSystemSlotInput {
  systemSlotId: string
  updateName: string;
  updateDescription: string;

  constructor(systemSlotId: string) {
    this.systemSlotId = systemSlotId;
  }
}

export interface YacserValue extends YacserObject {
  unit: string;
  value: number;
}

export class UpdateValueInput {
  valueId: string
  updateName: string;
  updateDescription: string;
  updateUnit: string;
  updateValue: number;

  constructor(valueId: string) {
    this.valueId = valueId;
  }
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
