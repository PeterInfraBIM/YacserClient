import {Injectable} from '@angular/core';
import {Query, YacserObject} from '../types';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  private selectedObject: YacserObject;

  constructor(private apollo: Apollo) {
  }

  getSelectedObject$(): Observable<YacserObject> {
    const type = ObjectType[this.selectedObject.type];
    switch (type) {
      case ObjectType.Function:
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
      case ObjectType.Hamburger:
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
      case ObjectType.Performance:
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
      case ObjectType.RealisationModule:
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
      case ObjectType.Requirement:
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
      case ObjectType.SystemInterface:
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
      case ObjectType.SystemSlot:
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
      case ObjectType.Value:
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
}

enum ObjectType {
  Function,
  Hamburger,
  Performance,
  PortRealisation,
  RealisationModule,
  RealisationPort,
  Requirement,
  SystemInterface,
  SystemSlot,
  Value
}
