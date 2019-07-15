import gql from 'graphql-tag';

export const ALL_OBJECTS = gql`
  query allObjects ($modelId: ID!){
    allObjects (modelId: $modelId) {
      id
      name
      description
      type
    }
  }
`;

export const CREATE_OBJECT = gql`
  mutation createObject($modelId: ID!, $type: YacserObjectType!, $name: String, $description: String) {
    createObject(modelId: $modelId, type: $type, name: $name, description: $description){
      id
      name
      description
      type
    }
  }
`;

export const FUNCTION = gql`
  query function($id: ID!){
    function (id: $id){
      id
      name
      description
      type
      owner {
        id
        name
        description
        type
      }
      requirements {
        id
        name
        description
        type
      }
      input {
        id
        name
        description
        type
      }
      output {
        id
        name
        description
        type
      }
      assembly {
        id
        name
        description
        type
      }
      parts {
        id
        name
        description
        type
      }
    }
  }
`;

export const UPDATE_FUNCTION = gql`
  mutation updateFunction($input: UpdateFunctionInput!) {
    updateFunction(input: $input){
      id
      name
      description
      type
      owner {
        id
        name
        description
        type
      }
      requirements {
        id
        name
        description
        type
      }
      input {
        id
        name
        description
        type
      }
      output {
        id
        name
        description
        type
      }
      assembly {
        id
        name
        description
        type
      }
      parts {
        id
        name
        description
        type
      }
    }
  }
`;

export const HAMBURGER = gql`
  query hamburger($id: ID!){
    hamburger (id: $id){
      id
      name
      description
      type
      functionalUnit {
        id
        name
        description
        type
      }
      technicalSolution {
        id
        name
        description
        type
      }
    }
  }
`;

export const PERFORMANCE = gql`
  query performance($id: ID!){
    performance (id: $id){
      id
      name
      description
      type
      owner {
        id
        name
        description
        type
      }
      value {
        id
        name
        description
        type
      }
    }
  }
`;

export const REALISATION_MODULE = gql`
  query realisationModule($id: ID!){
    realisationModule (id: $id){
      id
      name
      description
      type
      performances {
        id
        name
        description
        type
      }
      hamburgers {
        id
        name
        description
        type
      }
      assembly {
        id
        name
        description
        type
      }
      parts {
        id
        name
        description
        type
      }
    }
  }
`;

export const REQUIREMENT = gql`
  query requirement($id: ID!){
    requirement (id: $id){
      id
      name
      description
      type
      owner {
        id
        name
        description
        type
      }
      minValue {
        id
        name
        description
        type
      }
      maxValue {
        id
        name
        description
        type
      }
    }
  }
`;

export const SYSTEM_INTERFACE = gql`
  query systemInterface($id: ID!){
    systemInterface (id: $id){
      id
      name
      description
      type
      systemSlot0 {
        id
        name
        description
        type
      }
      systemSlot1 {
        id
        name
        description
        type
      }
      functionInputs {
        id
        name
        description
        type
      }
      functionOutputs {
        id
        name
        description
        type
      }
    }
  }
`;

export const SYSTEM_SLOT = gql`
  query systemSlot($id: ID!){
    systemSlot (id: $id){
      id
      name
      description
      type
      functions {
        id
        name
        description
        type
      }
      interfaces {
        id
        name
        description
        type
      }
      hamburgers {
        id
        name
        description
        type
      }
    }
  }
`;

export const VALUE = gql`
  query value($id: ID!){
    value (id: $id){
      id
      name
      description
      type
      unit
      value
    }
  }
`;
