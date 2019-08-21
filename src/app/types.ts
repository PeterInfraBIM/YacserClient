export interface YacserModel {
  id: string;
  name: string;
  description: string;
}

export class UpdateYacserModelInput {
  modelId: string;
  updateName: string;
  updateDescription: string;

  constructor(modelId: string) {
    this.modelId = modelId;
  }
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
  addRequirements: string[];
  removeRequirements: string[];
  updateInput: string;
  updateOutput: string;
  updateAssembly: string;
  addParts: string[]
  removeParts: string[];

  constructor(functionId: string) {
    this.functionId = functionId;
  }
}

export interface YacserHamburger extends YacserObject {
  functionalUnit: YacserSystemSlot;
  technicalSolution: YacserRealisationModule;
  ports: YacserPortRealisation[];
  assembly: YacserHamburger;
  parts: YacserHamburger[];
}

export class UpdateHamburgerInput {
  hamburgerId: string
  updateName: string;
  updateDescription: string;
  updateFunctionalUnit: string;
  updateTechnicalSolution: string;
  addPorts: string[]
  removePorts: string[];
  updateAssembly: string;
  addParts: string[]
  removeParts: string[];

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
  updateValue: string;

  constructor(performanceId: string) {
    this.performanceId = performanceId;
  }
}

export interface YacserPortRealisation extends YacserObject {
  owner: YacserHamburger;
  interface: YacserSystemInterface;
  port: YacserRealisationPort;
  assembly: YacserPortRealisation;
  parts: YacserPortRealisation[];
}

export class UpdatePortRealisationInput {
  portRealisationId: string;
  updateName: string;
  updateDescription: string;
  updateInterface: string;
  updatePort: string;
  updateAssembly: string;
  addParts: string[];
  removeParts: string[];

  constructor(portRealisationId: string) {
    this.portRealisationId = portRealisationId;
  }
}

export interface YacserRealisationModule extends YacserObject {
  performances: YacserPerformance[];
  ports: YacserRealisationPort[];
  hamburgers: YacserHamburger[];
  assembly: YacserRealisationModule;
  parts: YacserRealisationModule[];
}

export class UpdateRealisationModuleInput {
  realisationModuleId: string
  updateName: string;
  updateDescription: string;
  addPerformances: string[];
  removePerformances: string[];
  addPorts: string[];
  removePorts: string[];
  updateAssembly: string;
  addParts: string[];
  removeParts: string[];

  constructor(realisationModuleId: string) {
    this.realisationModuleId = realisationModuleId;
  }
}

export interface YacserRealisationPort extends YacserObject {
  owner: YacserRealisationModule;
  portRealisations: YacserPortRealisation[];
  assembly: YacserRealisationPort;
  parts: YacserRealisationPort[];
}

export class UpdateRealisationPortInput {
  realisationPortId: string
  updateName: string;
  updateDescription: string;
  updateAssembly: string;
  addParts: string[];
  removeParts: string[];

  constructor(realisationPortId: string) {
    this.realisationPortId = realisationPortId;
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
  updateMinValue: string;
  updateMaxValue: string;

  constructor(requirementId: string) {
    this.requirementId = requirementId;
  }
}

export interface YacserSystemInterface extends YacserObject {
  systemSlot0: YacserSystemSlot;
  systemSlot1: YacserSystemSlot;
  functionInputs: YacserFunction[];
  functionOutputs: YacserFunction[];
  portRealisations: YacserPortRealisation[];
  assembly: YacserSystemInterface;
  parts: YacserSystemInterface[];
}

export class UpdateSystemInterfaceInput {
  systemInterfaceId: string
  updateName: string;
  updateDescription: string;
  updateSystemSlot0: string;
  updateSystemSlot1: string;
  updateAssembly: string;
  addParts: string[];
  removeParts: string[];

  constructor(systemInterfaceId: string) {
    this.systemInterfaceId = systemInterfaceId;
  }
}

export interface YacserSystemSlot extends YacserObject {
  functions: YacserFunction[];
  interfaces: YacserSystemInterface;
  hamburgers: YacserHamburger[];
  assembly: YacserSystemSlot;
  parts: YacserSystemSlot[];

}

export class UpdateSystemSlotInput {
  systemSlotId: string
  updateName: string;
  updateDescription: string;
  addFunctions: string[];
  removeFunctions: string[];
  updateAssembly: string;
  addParts: string[];
  removeParts: string[];

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
  allModelFiles: string[];
  allModels: YacserModel[];
  model: YacserModel;
  allObjects: YacserObject[];
  function: YacserFunction;
  hamburger: YacserHamburger;
  performance: YacserPerformance;
  portRealisation: YacserPortRealisation;
  realisationModule: YacserRealisationModule;
  realisationPort: YacserRealisationPort;
  requirement: YacserRequirement;
  systemInterface: YacserSystemInterface;
  systemSlot: YacserSystemSlot;
  value: YacserValue;
}

export interface Mutation {
  createModel: YacserModel;
  createObject: YacserObject;
  deleteObject: boolean;
  loadModel: YacserModel;
  updateFunction: YacserFunction;
  updateHamburger: YacserHamburger;
  updatePerformance: YacserPerformance;
  updatePortRealisation: YacserPortRealisation;
  updateRealisationModule: YacserRealisationModule;
  updateRealisationPort: YacserRealisationPort;
  updateRequirement: YacserRequirement;
  updateSystemInterface: YacserSystemInterface;
  updateSystemSlot: YacserSystemSlot;
  updateValue: YacserValue;
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
