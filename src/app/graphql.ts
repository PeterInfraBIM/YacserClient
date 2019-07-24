import gql from 'graphql-tag';

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

export const REALISATION_MODULE = gql`
    query realisationModule($id: ID!) {
        realisationModule (id: $id) {
            ...ObjectFields
            performances {
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
            functionInputs {
                ...ObjectFields }
            functionOutputs {
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
            functionInputs {
                ...ObjectFields
                input {
                    ...ObjectFields }}
            functionOutputs {
                ...ObjectFields
                output {
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
                ...ObjectFields      }
            interfaces {
                ...ObjectFields      }
            hamburgers {
                ...ObjectFields      }
            assembly {
                ...ObjectFields
            }
            parts {
                ...ObjectFields
            }
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
