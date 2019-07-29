import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** YACSER Function instance. */
export type Function = YacserObject & {
  __typename?: "Function";
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance. */
  type: YacserObjectType;
  /** Owner SystemSlot. */
  owner?: Maybe<SystemSlot>;
  /** Related Requirements. */
  requirements?: Maybe<Array<Maybe<Requirement>>>;
  /** Function input. */
  input?: Maybe<SystemInterface>;
  /** Function output. */
  output?: Maybe<SystemInterface>;
  /** Assembly reference. */
  assembly?: Maybe<Function>;
  /** Parts references. */
  parts?: Maybe<Array<Maybe<Function>>>;
};

/** YACSER Hamburger instance. */
export type Hamburger = YacserObject & {
  __typename?: "Hamburger";
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance, */
  type: YacserObjectType;
  /** Functional Unit reference. */
  functionalUnit?: Maybe<SystemSlot>;
  /** Technical Solution reference. */
  technicalSolution?: Maybe<RealisationModule>;
  /** Port realisations */
  ports?: Maybe<Array<Maybe<PortRealisation>>>;
  /** Assembly reference. */
  assembly?: Maybe<Hamburger>;
  /** Parts references. */
  parts?: Maybe<Array<Maybe<Hamburger>>>;
};

/** All mutations that are defined for this YACSER graphQL server */
export type Mutation = {
  __typename?: "Mutation";
  /** Create a YACSER model. */
  createModel?: Maybe<YacserModel>;
  /** Create a YACSER object. */
  createObject?: Maybe<YacserObject>;
  /** Update Function object. */
  updateFunction?: Maybe<Function>;
  /** Update Hamburger object. */
  updateHamburger?: Maybe<Hamburger>;
  /** Update YacserModel object */
  updateModel?: Maybe<YacserModel>;
  /** Update Performance object */
  updatePerformance?: Maybe<Performance>;
  /** Update PortRealisation object. */
  updatePortRealisation?: Maybe<PortRealisation>;
  /** Update RealisationModule object. */
  updateRealisationModule?: Maybe<RealisationModule>;
  /** Update RealisationPort object. */
  updateRealisationPort?: Maybe<RealisationPort>;
  /** Update Requirement object. */
  updateRequirement?: Maybe<Requirement>;
  /** Update SystemInterface object. */
  updateSystemInterface?: Maybe<SystemInterface>;
  /** Update SystemSlot object. */
  updateSystemSlot?: Maybe<SystemSlot>;
  /** Update Value object. */
  updateValue?: Maybe<Value>;
  /** Save model */
  saveModel?: Maybe<Scalars["Boolean"]>;
  /** Load model */
  loadModel?: Maybe<YacserModel>;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationCreateModelArgs = {
  modelId: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationCreateObjectArgs = {
  modelId: Scalars["ID"];
  type: YacserObjectType;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdateFunctionArgs = {
  input: UpdateFunctionInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdateHamburgerArgs = {
  input: UpdateHamburgerInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdateModelArgs = {
  input: UpdateYacserModelInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdatePerformanceArgs = {
  input: UpdatePerformanceInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdatePortRealisationArgs = {
  input: UpdatePortRealisationInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdateRealisationModuleArgs = {
  input: UpdateRealisationModuleInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdateRealisationPortArgs = {
  input: UpdateRealisationPortInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdateRequirementArgs = {
  input: UpdateRequirementInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdateSystemInterfaceArgs = {
  input: UpdateSystemInterfaceInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdateSystemSlotArgs = {
  input: UpdateSystemSlotInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationUpdateValueArgs = {
  input: UpdateValueInput;
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationSaveModelArgs = {
  modelId: Scalars["ID"];
  filePath: Scalars["String"];
};

/** All mutations that are defined for this YACSER graphQL server */
export type MutationLoadModelArgs = {
  filePath: Scalars["String"];
};

/** YACSER Performance instance. */
export type Performance = YacserObject & {
  __typename?: "Performance";
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance */
  type: YacserObjectType;
  /** Owner RealisationModule */
  owner?: Maybe<RealisationModule>;
  /** Value */
  value?: Maybe<Value>;
};

/** YACSER Port realisation instance. */
export type PortRealisation = YacserObject & {
  __typename?: "PortRealisation";
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance. */
  type: YacserObjectType;
  /** Owner Hamburger. */
  owner?: Maybe<Hamburger>;
  /** System interface reference. */
  interface?: Maybe<SystemInterface>;
  /** Realisation port reference. */
  port?: Maybe<RealisationPort>;
  /** Assembly reference. */
  assembly?: Maybe<PortRealisation>;
  /** Parts references. */
  parts?: Maybe<Array<Maybe<PortRealisation>>>;
};

/** All queries that are defined for this YACSER graphQL server */
export type Query = {
  __typename?: "Query";
  /** List all model files. */
  allModelFiles?: Maybe<Array<Maybe<Scalars["String"]>>>;
  /** List all loaded models. */
  allModels?: Maybe<Array<Maybe<YacserModel>>>;
  /** get Model by ID. */
  model?: Maybe<YacserModel>;
  /** List all YACSER objects */
  allObjects?: Maybe<Array<Maybe<YacserObject>>>;
  /** Get Function object by ID. */
  function?: Maybe<Function>;
  /** Get Hamburger object by ID. */
  hamburger?: Maybe<Hamburger>;
  /** Get Performance object by ID. */
  performance?: Maybe<Performance>;
  /** Get PortRealisation object by ID. */
  portRealisation?: Maybe<PortRealisation>;
  /** Get RealisationModule object by ID. */
  realisationModule?: Maybe<RealisationModule>;
  /** Get RealisationPort object by ID. */
  realisationPort?: Maybe<RealisationPort>;
  /** Get Requirement object by ID. */
  requirement?: Maybe<Requirement>;
  /** Get SystemInterface object by ID. */
  systemInterface?: Maybe<SystemInterface>;
  /** Get SystemSlot object by ID. */
  systemSlot?: Maybe<SystemSlot>;
  /** Get Value object by ID. */
  value?: Maybe<Value>;
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryModelArgs = {
  modelId: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryAllObjectsArgs = {
  modelId: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryFunctionArgs = {
  id: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryHamburgerArgs = {
  id: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryPerformanceArgs = {
  id: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryPortRealisationArgs = {
  id: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryRealisationModuleArgs = {
  id: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryRealisationPortArgs = {
  id: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryRequirementArgs = {
  id: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QuerySystemInterfaceArgs = {
  id: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QuerySystemSlotArgs = {
  id: Scalars["ID"];
};

/** All queries that are defined for this YACSER graphQL server */
export type QueryValueArgs = {
  id: Scalars["ID"];
};

/** YACSER Realisation module instance. */
export type RealisationModule = YacserObject & {
  __typename?: "RealisationModule";
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance. */
  type: YacserObjectType;
  /** Specified performances. */
  performances?: Maybe<Array<Maybe<Performance>>>;
  /** Connection ports */
  ports?: Maybe<Array<Maybe<RealisationPort>>>;
  /** Hamburger references */
  hamburgers?: Maybe<Array<Maybe<Hamburger>>>;
  /** Assembly reference. */
  assembly?: Maybe<RealisationModule>;
  /** Parts references. */
  parts?: Maybe<Array<Maybe<RealisationModule>>>;
};

/** YACSER Realisation port instance. */
export type RealisationPort = YacserObject & {
  __typename?: "RealisationPort";
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance. */
  type: YacserObjectType;
  /** Owner RealisationModule. */
  owner?: Maybe<RealisationModule>;
  /** Port realisation references */
  portRealisations?: Maybe<Array<Maybe<PortRealisation>>>;
  /** Assembly reference. */
  assembly?: Maybe<RealisationPort>;
  /** Parts references. */
  parts?: Maybe<Array<Maybe<RealisationPort>>>;
};

/** YACSER Requirement instance. */
export type Requirement = YacserObject & {
  __typename?: "Requirement";
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance. */
  type: YacserObjectType;
  /** Owner Function, SystemSlot of SystemInterface. */
  owner?: Maybe<YacserObject>;
  /** Minimal value. */
  minValue?: Maybe<Value>;
  /** Maximal value. */
  maxValue?: Maybe<Value>;
};

/** YACSER System interface instance. */
export type SystemInterface = YacserObject & {
  __typename?: "SystemInterface";
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance */
  type: YacserObjectType;
  /** First SystemSlot. */
  systemSlot0?: Maybe<SystemSlot>;
  /** Second SystemSlot. */
  systemSlot1?: Maybe<SystemSlot>;
  /** Input to functions */
  functionInputs?: Maybe<Array<Maybe<Function>>>;
  /** Output from functions */
  functionOutputs?: Maybe<Array<Maybe<Function>>>;
  /** Port realisation references */
  portRealisations?: Maybe<Array<Maybe<PortRealisation>>>;
  /** Assembly reference. */
  assembly?: Maybe<SystemInterface>;
  /** Parts references. */
  parts?: Maybe<Array<Maybe<SystemInterface>>>;
};

/** YACSER System slot instance. */
export type SystemSlot = YacserObject & {
  __typename?: "SystemSlot";
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance */
  type: YacserObjectType;
  /** Specified functions. */
  functions?: Maybe<Array<Maybe<Function>>>;
  /** Related interfaces. */
  interfaces?: Maybe<Array<Maybe<SystemInterface>>>;
  /** Hamburger references */
  hamburgers?: Maybe<Array<Maybe<Hamburger>>>;
  /** Assembly reference. */
  assembly?: Maybe<SystemSlot>;
  /** Parts references. */
  parts?: Maybe<Array<Maybe<SystemSlot>>>;
};

/** Update Function input arguments. */
export type UpdateFunctionInput = {
  /** Function ID. */
  functionId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: add requirements. */
  addRequirements?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove requirements. */
  removeRequirements?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: new input reference. */
  updateInput?: Maybe<Scalars["ID"]>;
  /** If present: new output reference. */
  updateOutput?: Maybe<Scalars["ID"]>;
  /** If present: update assembly. */
  updateAssembly?: Maybe<Scalars["ID"]>;
  /** If present: add parts. */
  addParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove parts. */
  removeParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

/** Update Hamburger input arguments. */
export type UpdateHamburgerInput = {
  /** Hamburger ID. */
  hamburgerId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: new functional unit reference. */
  updateFunctionalUnit?: Maybe<Scalars["ID"]>;
  /** If present: new technical solution reference. */
  updateTechnicalSolution?: Maybe<Scalars["ID"]>;
  /** If present: update assembly. */
  updateAssembly?: Maybe<Scalars["ID"]>;
  /** If present: add realisation ports. */
  addPorts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove realisation ports. */
  removePorts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: add parts. */
  addParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove parts. */
  removeParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

/** Update Performance input arguments. */
export type UpdatePerformanceInput = {
  /** Performance ID. */
  performanceId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: new Value */
  updateValue?: Maybe<Scalars["ID"]>;
};

/** Update PortRealisation input arguments. */
export type UpdatePortRealisationInput = {
  /** Port realisation ID. */
  portRealisationId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: new interface reference. */
  updateInterface?: Maybe<Scalars["String"]>;
  /** If present: new realisation port reference. */
  updatePort?: Maybe<Scalars["String"]>;
  /** If present: update assembly. */
  updateAssembly?: Maybe<Scalars["ID"]>;
  /** If present: add parts. */
  addParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove parts. */
  removeParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

/** Update RealisationModule input arguments. */
export type UpdateRealisationModuleInput = {
  /** RealisationModule ID. */
  realisationModuleId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: add performances. */
  addPerformances?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove performances. */
  removePerformances?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: add ports. */
  addPorts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove ports. */
  removePorts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: update assembly. */
  updateAssembly?: Maybe<Scalars["ID"]>;
  /** If present: add parts. */
  addParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove parts. */
  removeParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

/** Update Realisation port input arguments. */
export type UpdateRealisationPortInput = {
  /** Realisation port ID. */
  realisationPortId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: update assembly. */
  updateAssembly?: Maybe<Scalars["ID"]>;
  /** If present: add parts. */
  addParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove parts. */
  removeParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

/** Update Requirement input arguments. */
export type UpdateRequirementInput = {
  /** Requirement ID. */
  requirementId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: new minimal Value */
  updateMinValue?: Maybe<Scalars["ID"]>;
  /** If present: new maximal Value */
  updateMaxValue?: Maybe<Scalars["ID"]>;
};

/** Update SystemInterface input arguments. */
export type UpdateSystemInterfaceInput = {
  /** SystemInterface ID. */
  systemInterfaceId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: update SystemSlot 0. */
  updateSystemSlot0?: Maybe<Scalars["ID"]>;
  /** If present: update SystemSlot 1. */
  updateSystemSlot1?: Maybe<Scalars["ID"]>;
  /** If present: update assembly. */
  updateAssembly?: Maybe<Scalars["ID"]>;
  /** If present: add parts. */
  addParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove parts. */
  removeParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

/** Update SystemSlot input arguments. */
export type UpdateSystemSlotInput = {
  /** SystemSlot ID. */
  systemSlotId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: add functions. */
  addFunctions?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove functions. */
  removeFunctions?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: update assembly. */
  updateAssembly?: Maybe<Scalars["ID"]>;
  /** If present: add parts. */
  addParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  /** If present: remove parts. */
  removeParts?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

/** Update Value input arguments. */
export type UpdateValueInput = {
  /** Value ID. */
  valueId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
  /** If present: new unit. */
  updateUnit?: Maybe<Scalars["String"]>;
  /** If present: new value. */
  updateValue?: Maybe<Scalars["Float"]>;
};

/** Update YacserModel input arguments. */
export type UpdateYacserModelInput = {
  /** Model ID. */
  modelId: Scalars["ID"];
  /** If present: new name. */
  updateName?: Maybe<Scalars["String"]>;
  /** If present: new description. */
  updateDescription?: Maybe<Scalars["String"]>;
};

/** Value instance. */
export type Value = YacserObject & {
  __typename?: "Value";
  /** Value URI */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance */
  type: YacserObjectType;
  /** Unit string */
  unit?: Maybe<Scalars["String"]>;
  /** Value float */
  value?: Maybe<Scalars["Float"]>;
};

/** YACSER data model */
export type YacserModel = {
  __typename?: "YacserModel";
  /** Base URI of the model. */
  id: Scalars["ID"];
  /** Optional name of the model. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the model. */
  description?: Maybe<Scalars["String"]>;
};

/** YACSER object interface. */
export type YacserObject = {
  /** URI of the object instance. */
  id: Scalars["ID"];
  /** Optional name of the object. */
  name?: Maybe<Scalars["String"]>;
  /** Optional description of the object. */
  description?: Maybe<Scalars["String"]>;
  /** Type of the object instance */
  type: YacserObjectType;
};

/** YACSER object types */
export enum YacserObjectType {
  Function = "Function",
  Hamburger = "Hamburger",
  Performance = "Performance",
  PortRealisation = "PortRealisation",
  RealisationModule = "RealisationModule",
  RealisationPort = "RealisationPort",
  Requirement = "Requirement",
  SystemInterface = "SystemInterface",
  SystemSlot = "SystemSlot",
  Value = "Value"
}
export type ObjectFieldsFragment = {
  __typename?:
    | "Function"
    | "SystemSlot"
    | "SystemInterface"
    | "PortRealisation"
    | "Hamburger"
    | "RealisationModule"
    | "Performance"
    | "Value"
    | "RealisationPort"
    | "Requirement";
} & Pick<YacserObject, "id" | "name" | "description" | "type">;

export type AllObjectsQueryVariables = {
  modelId: Scalars["ID"];
};

export type AllObjectsQuery = { __typename?: "Query" } & {
  allObjects: Maybe<
    Array<
      Maybe<
        {
          __typename?:
            | "Function"
            | "SystemSlot"
            | "SystemInterface"
            | "PortRealisation"
            | "Hamburger"
            | "RealisationModule"
            | "Performance"
            | "Value"
            | "RealisationPort"
            | "Requirement";
        } & ObjectFieldsFragment
      >
    >
  >;
};

export type CreateObjectMutationVariables = {
  modelId: Scalars["ID"];
  type: YacserObjectType;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type CreateObjectMutation = { __typename?: "Mutation" } & {
  createObject: Maybe<
    {
      __typename?:
        | "Function"
        | "SystemSlot"
        | "SystemInterface"
        | "PortRealisation"
        | "Hamburger"
        | "RealisationModule"
        | "Performance"
        | "Value"
        | "RealisationPort"
        | "Requirement";
    } & ObjectFieldsFragment
  >;
};

export type FunctionQueryVariables = {
  id: Scalars["ID"];
};

export type FunctionQuery = { __typename?: "Query" } & {
  function: Maybe<
    { __typename?: "Function" } & {
      owner: Maybe<{ __typename?: "SystemSlot" } & ObjectFieldsFragment>;
      requirements: Maybe<
        Array<Maybe<{ __typename?: "Requirement" } & ObjectFieldsFragment>>
      >;
      input: Maybe<{ __typename?: "SystemInterface" } & ObjectFieldsFragment>;
      output: Maybe<{ __typename?: "SystemInterface" } & ObjectFieldsFragment>;
      assembly: Maybe<{ __typename?: "Function" } & ObjectFieldsFragment>;
      parts: Maybe<
        Array<Maybe<{ __typename?: "Function" } & ObjectFieldsFragment>>
      >;
    } & ObjectFieldsFragment
  >;
};

export type UpdateFunctionMutationVariables = {
  input: UpdateFunctionInput;
};

export type UpdateFunctionMutation = { __typename?: "Mutation" } & {
  updateFunction: Maybe<
    { __typename?: "Function" } & {
      owner: Maybe<{ __typename?: "SystemSlot" } & ObjectFieldsFragment>;
      requirements: Maybe<
        Array<Maybe<{ __typename?: "Requirement" } & ObjectFieldsFragment>>
      >;
      input: Maybe<
        { __typename?: "SystemInterface" } & {
          functionInputs: Maybe<
            Array<Maybe<{ __typename?: "Function" } & ObjectFieldsFragment>>
          >;
        } & ObjectFieldsFragment
      >;
      output: Maybe<
        { __typename?: "SystemInterface" } & {
          functionOutputs: Maybe<
            Array<Maybe<{ __typename?: "Function" } & ObjectFieldsFragment>>
          >;
        } & ObjectFieldsFragment
      >;
      assembly: Maybe<
        { __typename?: "Function" } & {
          parts: Maybe<
            Array<Maybe<{ __typename?: "Function" } & ObjectFieldsFragment>>
          >;
        } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<
          Maybe<
            { __typename?: "Function" } & {
              assembly: Maybe<
                { __typename?: "Function" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
    } & ObjectFieldsFragment
  >;
};

export type HamburgerQueryVariables = {
  id: Scalars["ID"];
};

export type HamburgerQuery = { __typename?: "Query" } & {
  hamburger: Maybe<
    { __typename?: "Hamburger" } & {
      functionalUnit: Maybe<
        { __typename?: "SystemSlot" } & ObjectFieldsFragment
      >;
      technicalSolution: Maybe<
        { __typename?: "RealisationModule" } & ObjectFieldsFragment
      >;
      ports: Maybe<
        Array<Maybe<{ __typename?: "PortRealisation" } & ObjectFieldsFragment>>
      >;
      assembly: Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>;
      parts: Maybe<
        Array<Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>>
      >;
    } & ObjectFieldsFragment
  >;
};

export type UpdateHamburgerMutationVariables = {
  input: UpdateHamburgerInput;
};

export type UpdateHamburgerMutation = { __typename?: "Mutation" } & {
  updateHamburger: Maybe<
    { __typename?: "Hamburger" } & {
      functionalUnit: Maybe<
        { __typename?: "SystemSlot" } & {
          hamburgers: Maybe<
            Array<Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>>
          >;
        } & ObjectFieldsFragment
      >;
      technicalSolution: Maybe<
        { __typename?: "RealisationModule" } & {
          hamburgers: Maybe<
            Array<Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>>
          >;
        } & ObjectFieldsFragment
      >;
      ports: Maybe<
        Array<
          Maybe<
            { __typename?: "PortRealisation" } & {
              owner: Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>;
            } & ObjectFieldsFragment
          >
        >
      >;
      assembly: Maybe<
        { __typename?: "Hamburger" } & {
          parts: Maybe<
            Array<Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>>
          >;
        } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<
          Maybe<
            { __typename?: "Hamburger" } & {
              assembly: Maybe<
                { __typename?: "Hamburger" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
    } & ObjectFieldsFragment
  >;
};

export type PerformanceQueryVariables = {
  id: Scalars["ID"];
};

export type PerformanceQuery = { __typename?: "Query" } & {
  performance: Maybe<
    { __typename?: "Performance" } & {
      owner: Maybe<{ __typename?: "RealisationModule" } & ObjectFieldsFragment>;
      value: Maybe<{ __typename?: "Value" } & ObjectFieldsFragment>;
    } & ObjectFieldsFragment
  >;
};

export type UpdatePerformanceMutationVariables = {
  input: UpdatePerformanceInput;
};

export type UpdatePerformanceMutation = { __typename?: "Mutation" } & {
  updatePerformance: Maybe<
    { __typename?: "Performance" } & {
      owner: Maybe<{ __typename?: "RealisationModule" } & ObjectFieldsFragment>;
      value: Maybe<{ __typename?: "Value" } & ObjectFieldsFragment>;
    } & ObjectFieldsFragment
  >;
};

export type PortRealisationQueryVariables = {
  id: Scalars["ID"];
};

export type PortRealisationQuery = { __typename?: "Query" } & {
  portRealisation: Maybe<
    { __typename?: "PortRealisation" } & {
      owner: Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>;
      interface: Maybe<
        { __typename?: "SystemInterface" } & ObjectFieldsFragment
      >;
      port: Maybe<{ __typename?: "RealisationPort" } & ObjectFieldsFragment>;
      assembly: Maybe<
        { __typename?: "PortRealisation" } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<Maybe<{ __typename?: "PortRealisation" } & ObjectFieldsFragment>>
      >;
    } & ObjectFieldsFragment
  >;
};

export type UpdatePortRealisationMutationVariables = {
  input: UpdatePortRealisationInput;
};

export type UpdatePortRealisationMutation = { __typename?: "Mutation" } & {
  updatePortRealisation: Maybe<
    { __typename?: "PortRealisation" } & {
      owner: Maybe<
        { __typename?: "Hamburger" } & {
          ports: Maybe<
            Array<
              Maybe<{ __typename?: "PortRealisation" } & ObjectFieldsFragment>
            >
          >;
        } & ObjectFieldsFragment
      >;
      interface: Maybe<
        { __typename?: "SystemInterface" } & ObjectFieldsFragment
      >;
      port: Maybe<{ __typename?: "RealisationPort" } & ObjectFieldsFragment>;
      assembly: Maybe<
        { __typename?: "PortRealisation" } & {
          parts: Maybe<
            Array<
              Maybe<{ __typename?: "PortRealisation" } & ObjectFieldsFragment>
            >
          >;
        } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<
          Maybe<
            { __typename?: "PortRealisation" } & {
              assembly: Maybe<
                { __typename?: "PortRealisation" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
    } & ObjectFieldsFragment
  >;
};

export type RealisationModuleQueryVariables = {
  id: Scalars["ID"];
};

export type RealisationModuleQuery = { __typename?: "Query" } & {
  realisationModule: Maybe<
    { __typename?: "RealisationModule" } & {
      performances: Maybe<
        Array<Maybe<{ __typename?: "Performance" } & ObjectFieldsFragment>>
      >;
      ports: Maybe<
        Array<Maybe<{ __typename?: "RealisationPort" } & ObjectFieldsFragment>>
      >;
      hamburgers: Maybe<
        Array<Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>>
      >;
      assembly: Maybe<
        { __typename?: "RealisationModule" } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<
          Maybe<{ __typename?: "RealisationModule" } & ObjectFieldsFragment>
        >
      >;
    } & ObjectFieldsFragment
  >;
};

export type UpdateRealisationModuleMutationVariables = {
  input: UpdateRealisationModuleInput;
};

export type UpdateRealisationModuleMutation = { __typename?: "Mutation" } & {
  updateRealisationModule: Maybe<
    { __typename?: "RealisationModule" } & {
      performances: Maybe<
        Array<Maybe<{ __typename?: "Performance" } & ObjectFieldsFragment>>
      >;
      ports: Maybe<
        Array<
          Maybe<
            { __typename?: "RealisationPort" } & {
              owner: Maybe<
                { __typename?: "RealisationModule" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
      hamburgers: Maybe<
        Array<Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>>
      >;
      assembly: Maybe<
        { __typename?: "RealisationModule" } & {
          parts: Maybe<
            Array<
              Maybe<{ __typename?: "RealisationModule" } & ObjectFieldsFragment>
            >
          >;
        } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<
          Maybe<
            { __typename?: "RealisationModule" } & {
              assembly: Maybe<
                { __typename?: "RealisationModule" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
    } & ObjectFieldsFragment
  >;
};

export type RealisationPortQueryVariables = {
  id: Scalars["ID"];
};

export type RealisationPortQuery = { __typename?: "Query" } & {
  realisationPort: Maybe<
    { __typename?: "RealisationPort" } & {
      owner: Maybe<{ __typename?: "RealisationModule" } & ObjectFieldsFragment>;
      portRealisations: Maybe<
        Array<Maybe<{ __typename?: "PortRealisation" } & ObjectFieldsFragment>>
      >;
      assembly: Maybe<
        { __typename?: "RealisationPort" } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<Maybe<{ __typename?: "RealisationPort" } & ObjectFieldsFragment>>
      >;
    } & ObjectFieldsFragment
  >;
};

export type UpdateRealisationPortMutationVariables = {
  input: UpdateRealisationPortInput;
};

export type UpdateRealisationPortMutation = { __typename?: "Mutation" } & {
  updateRealisationPort: Maybe<
    { __typename?: "RealisationPort" } & {
      owner: Maybe<
        { __typename?: "RealisationModule" } & {
          ports: Maybe<
            Array<
              Maybe<{ __typename?: "RealisationPort" } & ObjectFieldsFragment>
            >
          >;
        } & ObjectFieldsFragment
      >;
      portRealisations: Maybe<
        Array<
          Maybe<
            { __typename?: "PortRealisation" } & {
              port: Maybe<
                { __typename?: "RealisationPort" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
      assembly: Maybe<
        { __typename?: "RealisationPort" } & {
          parts: Maybe<
            Array<
              Maybe<{ __typename?: "RealisationPort" } & ObjectFieldsFragment>
            >
          >;
        } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<
          Maybe<
            { __typename?: "RealisationPort" } & {
              assembly: Maybe<
                { __typename?: "RealisationPort" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
    } & ObjectFieldsFragment
  >;
};

export type RequirementQueryVariables = {
  id: Scalars["ID"];
};

export type RequirementQuery = { __typename?: "Query" } & {
  requirement: Maybe<
    { __typename?: "Requirement" } & {
      owner: Maybe<
        {
          __typename?:
            | "Function"
            | "SystemSlot"
            | "SystemInterface"
            | "PortRealisation"
            | "Hamburger"
            | "RealisationModule"
            | "Performance"
            | "Value"
            | "RealisationPort"
            | "Requirement";
        } & ObjectFieldsFragment
      >;
      minValue: Maybe<{ __typename?: "Value" } & ObjectFieldsFragment>;
      maxValue: Maybe<{ __typename?: "Value" } & ObjectFieldsFragment>;
    } & ObjectFieldsFragment
  >;
};

export type UpdateRequirementMutationVariables = {
  input: UpdateRequirementInput;
};

export type UpdateRequirementMutation = { __typename?: "Mutation" } & {
  updateRequirement: Maybe<
    { __typename?: "Requirement" } & {
      owner: Maybe<
        {
          __typename?:
            | "Function"
            | "SystemSlot"
            | "SystemInterface"
            | "PortRealisation"
            | "Hamburger"
            | "RealisationModule"
            | "Performance"
            | "Value"
            | "RealisationPort"
            | "Requirement";
        } & ObjectFieldsFragment
      >;
      minValue: Maybe<{ __typename?: "Value" } & ObjectFieldsFragment>;
      maxValue: Maybe<{ __typename?: "Value" } & ObjectFieldsFragment>;
    } & ObjectFieldsFragment
  >;
};

export type SystemInterfaceQueryVariables = {
  id: Scalars["ID"];
};

export type SystemInterfaceQuery = { __typename?: "Query" } & {
  systemInterface: Maybe<
    { __typename?: "SystemInterface" } & {
      systemSlot0: Maybe<{ __typename?: "SystemSlot" } & ObjectFieldsFragment>;
      systemSlot1: Maybe<{ __typename?: "SystemSlot" } & ObjectFieldsFragment>;
      functionInputs: Maybe<
        Array<Maybe<{ __typename?: "Function" } & ObjectFieldsFragment>>
      >;
      functionOutputs: Maybe<
        Array<Maybe<{ __typename?: "Function" } & ObjectFieldsFragment>>
      >;
      portRealisations: Maybe<
        Array<Maybe<{ __typename?: "PortRealisation" } & ObjectFieldsFragment>>
      >;
      assembly: Maybe<
        { __typename?: "SystemInterface" } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<Maybe<{ __typename?: "SystemInterface" } & ObjectFieldsFragment>>
      >;
    } & ObjectFieldsFragment
  >;
};

export type UpdateSystemInterfaceMutationVariables = {
  input: UpdateSystemInterfaceInput;
};

export type UpdateSystemInterfaceMutation = { __typename?: "Mutation" } & {
  updateSystemInterface: Maybe<
    { __typename?: "SystemInterface" } & {
      systemSlot0: Maybe<
        { __typename?: "SystemSlot" } & {
          interfaces: Maybe<
            Array<
              Maybe<{ __typename?: "SystemInterface" } & ObjectFieldsFragment>
            >
          >;
        } & ObjectFieldsFragment
      >;
      systemSlot1: Maybe<
        { __typename?: "SystemSlot" } & {
          interfaces: Maybe<
            Array<
              Maybe<{ __typename?: "SystemInterface" } & ObjectFieldsFragment>
            >
          >;
        } & ObjectFieldsFragment
      >;
      functionInputs: Maybe<
        Array<
          Maybe<
            { __typename?: "Function" } & {
              input: Maybe<
                { __typename?: "SystemInterface" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
      functionOutputs: Maybe<
        Array<
          Maybe<
            { __typename?: "Function" } & {
              output: Maybe<
                { __typename?: "SystemInterface" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
      portRealisations: Maybe<
        Array<
          Maybe<
            { __typename?: "PortRealisation" } & {
              interface: Maybe<
                { __typename?: "SystemInterface" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
      assembly: Maybe<
        { __typename?: "SystemInterface" } & {
          parts: Maybe<
            Array<
              Maybe<{ __typename?: "SystemInterface" } & ObjectFieldsFragment>
            >
          >;
        } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<
          Maybe<
            { __typename?: "SystemInterface" } & {
              assembly: Maybe<
                { __typename?: "SystemInterface" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
    } & ObjectFieldsFragment
  >;
};

export type SystemSlotQueryVariables = {
  id: Scalars["ID"];
};

export type SystemSlotQuery = { __typename?: "Query" } & {
  systemSlot: Maybe<
    { __typename?: "SystemSlot" } & {
      functions: Maybe<
        Array<Maybe<{ __typename?: "Function" } & ObjectFieldsFragment>>
      >;
      interfaces: Maybe<
        Array<Maybe<{ __typename?: "SystemInterface" } & ObjectFieldsFragment>>
      >;
      hamburgers: Maybe<
        Array<Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>>
      >;
      assembly: Maybe<{ __typename?: "SystemSlot" } & ObjectFieldsFragment>;
      parts: Maybe<
        Array<Maybe<{ __typename?: "SystemSlot" } & ObjectFieldsFragment>>
      >;
    } & ObjectFieldsFragment
  >;
};

export type UpdateSystemSlotMutationVariables = {
  input: UpdateSystemSlotInput;
};

export type UpdateSystemSlotMutation = { __typename?: "Mutation" } & {
  updateSystemSlot: Maybe<
    { __typename?: "SystemSlot" } & {
      functions: Maybe<
        Array<
          Maybe<
            { __typename?: "Function" } & {
              owner: Maybe<
                { __typename?: "SystemSlot" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
      interfaces: Maybe<
        Array<Maybe<{ __typename?: "SystemInterface" } & ObjectFieldsFragment>>
      >;
      hamburgers: Maybe<
        Array<Maybe<{ __typename?: "Hamburger" } & ObjectFieldsFragment>>
      >;
      assembly: Maybe<
        { __typename?: "SystemSlot" } & {
          parts: Maybe<
            Array<Maybe<{ __typename?: "SystemSlot" } & ObjectFieldsFragment>>
          >;
        } & ObjectFieldsFragment
      >;
      parts: Maybe<
        Array<
          Maybe<
            { __typename?: "SystemSlot" } & {
              assembly: Maybe<
                { __typename?: "SystemSlot" } & ObjectFieldsFragment
              >;
            } & ObjectFieldsFragment
          >
        >
      >;
    } & ObjectFieldsFragment
  >;
};

export type ValueQueryVariables = {
  id: Scalars["ID"];
};

export type ValueQuery = { __typename?: "Query" } & {
  value: Maybe<
    { __typename?: "Value" } & Pick<Value, "unit" | "value"> &
      ObjectFieldsFragment
  >;
};

export type UpdateValueMutationVariables = {
  input: UpdateValueInput;
};

export type UpdateValueMutation = { __typename?: "Mutation" } & {
  updateValue: Maybe<
    { __typename?: "Value" } & Pick<Value, "unit" | "value"> &
      ObjectFieldsFragment
  >;
};
export const ObjectFieldsFragmentDoc = gql`
  fragment ObjectFields on YacserObject {
    id
    name
    description
    type
  }
`;
export const AllObjectsDocument = gql`
  query allObjects($modelId: ID!) {
    allObjects(modelId: $modelId) {
      ...ObjectFields
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class AllObjectsGQL extends Apollo.Query<
  AllObjectsQuery,
  AllObjectsQueryVariables
> {
  document = AllObjectsDocument;
}
export const CreateObjectDocument = gql`
  mutation createObject(
    $modelId: ID!
    $type: YacserObjectType!
    $name: String
    $description: String
  ) {
    createObject(
      modelId: $modelId
      type: $type
      name: $name
      description: $description
    ) {
      ...ObjectFields
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class CreateObjectGQL extends Apollo.Mutation<
  CreateObjectMutation,
  CreateObjectMutationVariables
> {
  document = CreateObjectDocument;
}
export const FunctionDocument = gql`
  query function($id: ID!) {
    function(id: $id) {
      ...ObjectFields
      owner {
        ...ObjectFields
      }
      requirements {
        ...ObjectFields
      }
      input {
        ...ObjectFields
      }
      output {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
      }
      parts {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class FunctionGQL extends Apollo.Query<
  FunctionQuery,
  FunctionQueryVariables
> {
  document = FunctionDocument;
}
export const UpdateFunctionDocument = gql`
  mutation updateFunction($input: UpdateFunctionInput!) {
    updateFunction(input: $input) {
      ...ObjectFields
      owner {
        ...ObjectFields
      }
      requirements {
        ...ObjectFields
      }
      input {
        ...ObjectFields
        functionInputs {
          ...ObjectFields
        }
      }
      output {
        ...ObjectFields
        functionOutputs {
          ...ObjectFields
        }
      }
      assembly {
        ...ObjectFields
        parts {
          ...ObjectFields
        }
      }
      parts {
        ...ObjectFields
        assembly {
          ...ObjectFields
        }
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdateFunctionGQL extends Apollo.Mutation<
  UpdateFunctionMutation,
  UpdateFunctionMutationVariables
> {
  document = UpdateFunctionDocument;
}
export const HamburgerDocument = gql`
  query hamburger($id: ID!) {
    hamburger(id: $id) {
      ...ObjectFields
      functionalUnit {
        ...ObjectFields
      }
      technicalSolution {
        ...ObjectFields
      }
      ports {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
      }
      parts {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class HamburgerGQL extends Apollo.Query<
  HamburgerQuery,
  HamburgerQueryVariables
> {
  document = HamburgerDocument;
}
export const UpdateHamburgerDocument = gql`
  mutation updateHamburger($input: UpdateHamburgerInput!) {
    updateHamburger(input: $input) {
      ...ObjectFields
      functionalUnit {
        ...ObjectFields
        hamburgers {
          ...ObjectFields
        }
      }
      technicalSolution {
        ...ObjectFields
        hamburgers {
          ...ObjectFields
        }
      }
      ports {
        ...ObjectFields
        owner {
          ...ObjectFields
        }
      }
      assembly {
        ...ObjectFields
        parts {
          ...ObjectFields
        }
      }
      parts {
        ...ObjectFields
        assembly {
          ...ObjectFields
        }
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdateHamburgerGQL extends Apollo.Mutation<
  UpdateHamburgerMutation,
  UpdateHamburgerMutationVariables
> {
  document = UpdateHamburgerDocument;
}
export const PerformanceDocument = gql`
  query performance($id: ID!) {
    performance(id: $id) {
      ...ObjectFields
      owner {
        ...ObjectFields
      }
      value {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class PerformanceGQL extends Apollo.Query<
  PerformanceQuery,
  PerformanceQueryVariables
> {
  document = PerformanceDocument;
}
export const UpdatePerformanceDocument = gql`
  mutation updatePerformance($input: UpdatePerformanceInput!) {
    updatePerformance(input: $input) {
      ...ObjectFields
      owner {
        ...ObjectFields
      }
      value {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdatePerformanceGQL extends Apollo.Mutation<
  UpdatePerformanceMutation,
  UpdatePerformanceMutationVariables
> {
  document = UpdatePerformanceDocument;
}
export const PortRealisationDocument = gql`
  query portRealisation($id: ID!) {
    portRealisation(id: $id) {
      ...ObjectFields
      owner {
        ...ObjectFields
      }
      interface {
        ...ObjectFields
      }
      port {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
      }
      parts {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class PortRealisationGQL extends Apollo.Query<
  PortRealisationQuery,
  PortRealisationQueryVariables
> {
  document = PortRealisationDocument;
}
export const UpdatePortRealisationDocument = gql`
  mutation updatePortRealisation($input: UpdatePortRealisationInput!) {
    updatePortRealisation(input: $input) {
      ...ObjectFields
      owner {
        ...ObjectFields
        ports {
          ...ObjectFields
        }
      }
      interface {
        ...ObjectFields
      }
      port {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
        parts {
          ...ObjectFields
        }
      }
      parts {
        ...ObjectFields
        assembly {
          ...ObjectFields
        }
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdatePortRealisationGQL extends Apollo.Mutation<
  UpdatePortRealisationMutation,
  UpdatePortRealisationMutationVariables
> {
  document = UpdatePortRealisationDocument;
}
export const RealisationModuleDocument = gql`
  query realisationModule($id: ID!) {
    realisationModule(id: $id) {
      ...ObjectFields
      performances {
        ...ObjectFields
      }
      ports {
        ...ObjectFields
      }
      hamburgers {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
      }
      parts {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class RealisationModuleGQL extends Apollo.Query<
  RealisationModuleQuery,
  RealisationModuleQueryVariables
> {
  document = RealisationModuleDocument;
}
export const UpdateRealisationModuleDocument = gql`
  mutation updateRealisationModule($input: UpdateRealisationModuleInput!) {
    updateRealisationModule(input: $input) {
      ...ObjectFields
      performances {
        ...ObjectFields
      }
      ports {
        ...ObjectFields
        owner {
          ...ObjectFields
        }
      }
      hamburgers {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
        parts {
          ...ObjectFields
        }
      }
      parts {
        ...ObjectFields
        assembly {
          ...ObjectFields
        }
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdateRealisationModuleGQL extends Apollo.Mutation<
  UpdateRealisationModuleMutation,
  UpdateRealisationModuleMutationVariables
> {
  document = UpdateRealisationModuleDocument;
}
export const RealisationPortDocument = gql`
  query realisationPort($id: ID!) {
    realisationPort(id: $id) {
      ...ObjectFields
      owner {
        ...ObjectFields
      }
      portRealisations {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
      }
      parts {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class RealisationPortGQL extends Apollo.Query<
  RealisationPortQuery,
  RealisationPortQueryVariables
> {
  document = RealisationPortDocument;
}
export const UpdateRealisationPortDocument = gql`
  mutation updateRealisationPort($input: UpdateRealisationPortInput!) {
    updateRealisationPort(input: $input) {
      ...ObjectFields
      owner {
        ...ObjectFields
        ports {
          ...ObjectFields
        }
      }
      portRealisations {
        ...ObjectFields
        port {
          ...ObjectFields
        }
      }
      assembly {
        ...ObjectFields
        parts {
          ...ObjectFields
        }
      }
      parts {
        ...ObjectFields
        assembly {
          ...ObjectFields
        }
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdateRealisationPortGQL extends Apollo.Mutation<
  UpdateRealisationPortMutation,
  UpdateRealisationPortMutationVariables
> {
  document = UpdateRealisationPortDocument;
}
export const RequirementDocument = gql`
  query requirement($id: ID!) {
    requirement(id: $id) {
      ...ObjectFields
      owner {
        ...ObjectFields
      }
      minValue {
        ...ObjectFields
      }
      maxValue {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class RequirementGQL extends Apollo.Query<
  RequirementQuery,
  RequirementQueryVariables
> {
  document = RequirementDocument;
}
export const UpdateRequirementDocument = gql`
  mutation updateRequirement($input: UpdateRequirementInput!) {
    updateRequirement(input: $input) {
      ...ObjectFields
      owner {
        ...ObjectFields
      }
      minValue {
        ...ObjectFields
      }
      maxValue {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdateRequirementGQL extends Apollo.Mutation<
  UpdateRequirementMutation,
  UpdateRequirementMutationVariables
> {
  document = UpdateRequirementDocument;
}
export const SystemInterfaceDocument = gql`
  query systemInterface($id: ID!) {
    systemInterface(id: $id) {
      ...ObjectFields
      systemSlot0 {
        ...ObjectFields
      }
      systemSlot1 {
        ...ObjectFields
      }
      functionInputs {
        ...ObjectFields
      }
      functionOutputs {
        ...ObjectFields
      }
      portRealisations {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
      }
      parts {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class SystemInterfaceGQL extends Apollo.Query<
  SystemInterfaceQuery,
  SystemInterfaceQueryVariables
> {
  document = SystemInterfaceDocument;
}
export const UpdateSystemInterfaceDocument = gql`
  mutation updateSystemInterface($input: UpdateSystemInterfaceInput!) {
    updateSystemInterface(input: $input) {
      ...ObjectFields
      systemSlot0 {
        ...ObjectFields
        interfaces {
          ...ObjectFields
        }
      }
      systemSlot1 {
        ...ObjectFields
        interfaces {
          ...ObjectFields
        }
      }
      functionInputs {
        ...ObjectFields
        input {
          ...ObjectFields
        }
      }
      functionOutputs {
        ...ObjectFields
        output {
          ...ObjectFields
        }
      }
      portRealisations {
        ...ObjectFields
        interface {
          ...ObjectFields
        }
      }
      assembly {
        ...ObjectFields
        parts {
          ...ObjectFields
        }
      }
      parts {
        ...ObjectFields
        assembly {
          ...ObjectFields
        }
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdateSystemInterfaceGQL extends Apollo.Mutation<
  UpdateSystemInterfaceMutation,
  UpdateSystemInterfaceMutationVariables
> {
  document = UpdateSystemInterfaceDocument;
}
export const SystemSlotDocument = gql`
  query systemSlot($id: ID!) {
    systemSlot(id: $id) {
      ...ObjectFields
      functions {
        ...ObjectFields
      }
      interfaces {
        ...ObjectFields
      }
      hamburgers {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
      }
      parts {
        ...ObjectFields
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class SystemSlotGQL extends Apollo.Query<
  SystemSlotQuery,
  SystemSlotQueryVariables
> {
  document = SystemSlotDocument;
}
export const UpdateSystemSlotDocument = gql`
  mutation updateSystemSlot($input: UpdateSystemSlotInput!) {
    updateSystemSlot(input: $input) {
      ...ObjectFields
      functions {
        ...ObjectFields
        owner {
          ...ObjectFields
        }
      }
      interfaces {
        ...ObjectFields
      }
      hamburgers {
        ...ObjectFields
      }
      assembly {
        ...ObjectFields
        parts {
          ...ObjectFields
        }
      }
      parts {
        ...ObjectFields
        assembly {
          ...ObjectFields
        }
      }
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdateSystemSlotGQL extends Apollo.Mutation<
  UpdateSystemSlotMutation,
  UpdateSystemSlotMutationVariables
> {
  document = UpdateSystemSlotDocument;
}
export const ValueDocument = gql`
  query value($id: ID!) {
    value(id: $id) {
      ...ObjectFields
      unit
      value
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class ValueGQL extends Apollo.Query<ValueQuery, ValueQueryVariables> {
  document = ValueDocument;
}
export const UpdateValueDocument = gql`
  mutation updateValue($input: UpdateValueInput!) {
    updateValue(input: $input) {
      ...ObjectFields
      unit
      value
    }
  }
  ${ObjectFieldsFragmentDoc}
`;

@Injectable({
  providedIn: "root"
})
export class UpdateValueGQL extends Apollo.Mutation<
  UpdateValueMutation,
  UpdateValueMutationVariables
> {
  document = UpdateValueDocument;
}
