import {Injectable} from '@angular/core';
import {Mutation, Query, YacserObject, YacserObjectType} from '../types';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

const ALL_OBJECTS = gql`
  query allObjects ($modelId: ID!){
    allObjects (modelId: $modelId) {
      id
      name
      description
      type
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  private selectedObject: YacserObject;

  constructor(private apollo: Apollo) {
  }

  getAllObjects$(modelId: string): Observable<YacserObject[]> {
    return this.apollo.watchQuery<Query>({
      query: ALL_OBJECTS,
      variables: {
        modelId
      }
    }).valueChanges.pipe(map(result => result.data.allObjects));
  }

  getSelectedObject$(): Observable<YacserObject> {
    const type = YacserObjectType[this.selectedObject.type];
    switch (type) {
      case YacserObjectType.Function:
        return this.apollo.watchQuery<Query>({
            query: gql`
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
                }
              }
            `,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.function));
      case YacserObjectType.Hamburger:
        return this.apollo.watchQuery<Query>({
            query: gql`
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
            `,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.hamburger));
      case YacserObjectType.Performance:
        return this.apollo.watchQuery<Query>({
            query: gql`
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
            `,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.performance));
      case YacserObjectType.RealisationModule:
        return this.apollo.watchQuery<Query>({
            query: gql`
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
                }
              }
            `,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.realisationModule));
      case YacserObjectType.Requirement:
        return this.apollo.watchQuery<Query>({
            query: gql`
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
            `,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.requirement));
      case YacserObjectType.SystemInterface:
        return this.apollo.watchQuery<Query>(
          {
            query: gql`
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
            `,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.systemInterface));
      case YacserObjectType.SystemSlot:
        return this.apollo.watchQuery<Query>(
          {
            query: gql`
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
            `,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.systemSlot));
      case YacserObjectType.Value:
        return this.apollo.watchQuery<Query>({
            query: gql`
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
            `,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.value));
      default:
        break;
    }
    return null;
  }

  setSelectedObject(object: YacserObject): void {
    this.selectedObject = object;
  }

  public createObject$(modelId: string, type: YacserObjectType, name: string, description: string): Observable<YacserObject> {
    return this.apollo.mutate<Mutation>(
      {
        mutation: gql`
          mutation createObject($modelId: ID!, $type: YacserObjectType!, $name: String, $description: String) {
            createObject(modelId: $modelId, type: $type, name: $name, description: $description){
              id
              name
              description
              type
            }
          }
        `,
        variables: {
          modelId,
          type,
          name,
          description
        }
      }).pipe(map(
      (result) => result.data.createObject));
  }
}

