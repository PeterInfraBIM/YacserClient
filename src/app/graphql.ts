import gql from 'graphql-tag';

export const MODEL = gql`
    query model($modelId: ID!){
        model (modelId: $modelId){
            id
            name
            description
        }
    }
`;

export const ALL_MODEL_FILES = gql`
    query allModelFiles{allModelFiles}
`;

export const UPDATE_MODEL = gql`
    mutation updateModel($input: UpdateYacserModelInput!) {
        updateModel (input: $input){
            id
            name
            description
        }
    }
`;

export const OBJECT_FIELDS = gql`
    fragment ObjectFields on YacserObject {
        id
        name
        description
        type
    }
`;

export const ALL_OBJECTS = gql`
    query allObjects ($modelId: ID!) {
        allObjects (modelId: $modelId) {
            ...ObjectFields }
    }
    ${OBJECT_FIELDS}
`;

export const CREATE_OBJECT = gql`
    mutation createObject($modelId: ID!, $type: YacserObjectType!, $name: String, $description: String) {
        createObject(modelId: $modelId, type: $type, name: $name, description: $description) {
            ...ObjectFields }
    }
    ${OBJECT_FIELDS}
`;

export const DELETE_OBJECT = gql`
  mutation deleteObject($id: ID!) {
      deleteObject(id: $id)
  }
`;

export const FUNCTION = gql`
    query function($id: ID!){
        function (id: $id){
            ...ObjectFields
            owner {
                ...ObjectFields }
            requirements {
                ...ObjectFields }
            input {
                ...ObjectFields }
            output {
                ...ObjectFields }
            assembly {
                ...ObjectFields }
            parts {
                ...ObjectFields }
        }
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_FUNCTION = gql`
    mutation updateFunction($input: UpdateFunctionInput!) {
        updateFunction(input: $input){
            ...ObjectFields
            owner {
                ...ObjectFields }
            requirements {
                ...ObjectFields }
            input {
                ...ObjectFields
                functionInputs {
                    ...ObjectFields }}
            output {
                ...ObjectFields
                functionOutputs {
                    ...ObjectFields }}
            assembly {
                ...ObjectFields
                parts {
                    ...ObjectFields }}
            parts {
                ...ObjectFields
                assembly {
                    ...ObjectFields }}
        }
    }
    ${OBJECT_FIELDS}
`;

export const HAMBURGER = gql`
    query hamburger($id: ID!) {
        hamburger (id: $id) {
            ...ObjectFields
            functionalUnit {
                ...ObjectFields }
            technicalSolution {
                ...ObjectFields }
            ports {
                ...ObjectFields }
            assembly {
                ...ObjectFields }
            parts {
                ...ObjectFields }
        }
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_HAMBURGER = gql`
    mutation updateHamburger($input: UpdateHamburgerInput!) {
        updateHamburger (input: $input) {
            ...ObjectFields
            functionalUnit {
                ...ObjectFields
                hamburgers {
                    ...ObjectFields }}
            technicalSolution {
                ...ObjectFields
                hamburgers {
                    ...ObjectFields }}
            ports {
                ...ObjectFields
                owner {
                    ...ObjectFields }}
            assembly {
                ...ObjectFields
                parts {
                    ...ObjectFields }}
            parts {
                ...ObjectFields
                assembly {
                    ...ObjectFields }}
        }
    }
    ${OBJECT_FIELDS}
`;

export const PERFORMANCE = gql`
    query performance($id: ID!){
        performance (id: $id){
            ...ObjectFields
            owner {
                ...ObjectFields
            }
            value {
                ...ObjectFields
            }
        }
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_PERFORMANCE = gql`
    mutation updatePerformance($input: UpdatePerformanceInput!) {
        updatePerformance (input: $input){
            ...ObjectFields
            owner {
                ...ObjectFields
            }
            value {
                ...ObjectFields
            }
        }
    }
    ${OBJECT_FIELDS}
`;

export const PORT_REALISATION = gql`
    query portRealisation($id: ID!) {
        portRealisation (id: $id) {
            ...ObjectFields
            owner {
                ...ObjectFields }
            interface {
                ...ObjectFields }
            port {
                ...ObjectFields }
            assembly {
                ...ObjectFields }
            parts {
                ...ObjectFields }
        }
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_PORT_REALISATION = gql`
    mutation updatePortRealisation($input: UpdatePortRealisationInput!) {
        updatePortRealisation (input: $input) {
            ...ObjectFields
            owner {
                ...ObjectFields
                ports {
                    ...ObjectFields }}
            interface {
                ...ObjectFields }
            port {
                ...ObjectFields }
            assembly {
                ...ObjectFields
                parts {
                    ...ObjectFields }}
            parts {
                ...ObjectFields
                assembly {
                    ...ObjectFields }}
        }
    }
    ${OBJECT_FIELDS}
`;

export const REALISATION_MODULE = gql`
    query realisationModule($id: ID!) {
        realisationModule (id: $id) {
            ...ObjectFields
            performances {
                ...ObjectFields }
            ports {
                ...ObjectFields }
            hamburgers {
                ...ObjectFields }
            assembly {
                ...ObjectFields }
            parts {
                ...ObjectFields }
        }
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_REALISATION_MODULE = gql`
    mutation updateRealisationModule($input: UpdateRealisationModuleInput!) {
        updateRealisationModule (input: $input) {
            ...ObjectFields
            performances {
                ...ObjectFields }
            ports {
                ...ObjectFields
                owner {
                    ...ObjectFields }}
            hamburgers {
                ...ObjectFields }
            assembly {
                ...ObjectFields
                parts {
                    ...ObjectFields }}
            parts {
                ...ObjectFields
                assembly {
                    ...ObjectFields }}
        }
    }
    ${OBJECT_FIELDS}
`;

export const REALISATION_PORT = gql`
    query realisationPort($id: ID!) {
        realisationPort (id: $id) {
            ...ObjectFields
            owner {
                ...ObjectFields }
            portRealisations {
                ...ObjectFields }
            assembly {
                ...ObjectFields }
            parts {
                ...ObjectFields }
        }
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_REALISATION_PORT = gql`
    mutation updateRealisationPort($input: UpdateRealisationPortInput!) {
        updateRealisationPort (input: $input) {
            ...ObjectFields
            owner {
                ...ObjectFields
                ports {
                    ...ObjectFields }}
            portRealisations {
                ...ObjectFields
                port {
                    ...ObjectFields }}
            assembly {
                ...ObjectFields
                parts {
                    ...ObjectFields }}
            parts {
                ...ObjectFields
                assembly {
                    ...ObjectFields }}
        }
    }
    ${OBJECT_FIELDS}
`;

export const REQUIREMENT = gql`
    query requirement($id: ID!){
        requirement (id: $id) {
            ...ObjectFields
            owner {
                ...ObjectFields }
            minValue {
                ...ObjectFields }
            maxValue {
                ...ObjectFields }
        }
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_REQUIREMENT = gql`
    mutation updateRequirement($input: UpdateRequirementInput!) {
        updateRequirement (input: $input){
            ...ObjectFields
            owner {
                ...ObjectFields }
            minValue {
                ...ObjectFields }
            maxValue {
                ...ObjectFields }
        }
    }
    ${OBJECT_FIELDS}
`;

export const SYSTEM_INTERFACE = gql`
    query systemInterface($id: ID!){
        systemInterface (id: $id) {
            ...ObjectFields
            systemSlot0 {
                ...ObjectFields }
            systemSlot1 {
                ...ObjectFields }
            requirements {
                ...ObjectFields }
            functionInputs {
                ...ObjectFields }
            functionOutputs {
                ...ObjectFields }
            portRealisations {
                ...ObjectFields }
            assembly {
                ...ObjectFields }
            parts {
                ...ObjectFields }}
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_SYSTEM_INTERFACE = gql`
    mutation updateSystemInterface($input: UpdateSystemInterfaceInput!) {
        updateSystemInterface (input: $input) {
            ...ObjectFields
            systemSlot0 {
                ...ObjectFields
                interfaces {
                    ...ObjectFields }}
            systemSlot1 {
                ...ObjectFields
                interfaces {
                    ...ObjectFields }}
            requirements {
                ...ObjectFields 
                owner {
                    ...ObjectFields }}
            functionInputs {
                ...ObjectFields
                input {
                    ...ObjectFields }}
            functionOutputs {
                ...ObjectFields
                output {
                    ...ObjectFields }}
            portRealisations {
                ...ObjectFields
                interface {
                    ...ObjectFields }}
            assembly {
                ...ObjectFields
                parts {
                    ...ObjectFields }}
            parts {
                ...ObjectFields
                assembly {
                    ...ObjectFields }}
        }
    }
    ${OBJECT_FIELDS}
`;

export const SYSTEM_SLOT = gql`
    query systemSlot($id: ID!){
        systemSlot (id: $id){
            ...ObjectFields
            functions {
                ...ObjectFields }
            requirements {
                ...ObjectFields }
            interfaces {
                ...ObjectFields }
            hamburgers {
                ...ObjectFields }
            assembly {
                ...ObjectFields }
            parts {
                ...ObjectFields }
        }
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_SYSTEM_SLOT = gql`
    mutation updateSystemSlot($input: UpdateSystemSlotInput!) {
        updateSystemSlot (input: $input) {
            ...ObjectFields
            functions {
                ...ObjectFields
                owner {
                    ...ObjectFields }}
            requirements {
                ...ObjectFields
                owner {
                    ...ObjectFields }}
            interfaces {
                ...ObjectFields      }
            hamburgers {
                ...ObjectFields      }
            assembly {
                ...ObjectFields
                parts {
                    ...ObjectFields }}
            parts {
                ...ObjectFields
                assembly {
                    ...ObjectFields }}
        }
    }
    ${OBJECT_FIELDS}
`;

export const VALUE = gql`
    query value($id: ID!){
        value (id: $id){
            ...ObjectFields
            unit
            value
        }
    }
    ${OBJECT_FIELDS}
`;

export const UPDATE_VALUE = gql`
    mutation updateValue($input: UpdateValueInput!) {
        updateValue (input: $input){
            ...ObjectFields
            unit
            value
        }
    }
    ${OBJECT_FIELDS}
`;
