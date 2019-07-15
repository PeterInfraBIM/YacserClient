import {EventEmitter, Injectable} from '@angular/core';
import {Mutation, Query, UpdateFunctionInput, YacserObject, YacserObjectType} from '../types';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
  ALL_OBJECTS,
  CREATE_OBJECT,
  FUNCTION,
  HAMBURGER,
  PERFORMANCE,
  REALISATION_MODULE,
  REQUIREMENT,
  SYSTEM_INTERFACE,
  SYSTEM_SLOT, UPDATE_FUNCTION,
  VALUE
} from '../graphql';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  public allObjectsUpdated = new EventEmitter<YacserObject[]>();
  private selectedObject: YacserObject;

  constructor(private apollo: Apollo) {
  }

  getAllObjects$(modelId: string): void {
    this.apollo.watchQuery<Query>({
      query: ALL_OBJECTS,
      variables: {
        modelId
      }
    }).valueChanges.subscribe(result => this.allObjectsUpdated.emit(result.data.allObjects));
  }

  getSelectedObject$(): Observable<YacserObject> {
    const type = YacserObjectType[this.selectedObject.type];
    switch (type) {
      case YacserObjectType.Function:
        return this.apollo.watchQuery<Query>({
            query: FUNCTION,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.function));
      case YacserObjectType.Hamburger:
        return this.apollo.watchQuery<Query>({
            query: HAMBURGER,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.hamburger));
      case YacserObjectType.Performance:
        return this.apollo.watchQuery<Query>({
            query: PERFORMANCE,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.performance));
      case YacserObjectType.RealisationModule:
        return this.apollo.watchQuery<Query>({
            query: REALISATION_MODULE,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.realisationModule));
      case YacserObjectType.Requirement:
        return this.apollo.watchQuery<Query>({
            query: REQUIREMENT,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.requirement));
      case YacserObjectType.SystemInterface:
        return this.apollo.watchQuery<Query>(
          {
            query: SYSTEM_INTERFACE,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.systemInterface));
      case YacserObjectType.SystemSlot:
        return this.apollo.watchQuery<Query>(
          {
            query: SYSTEM_SLOT,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.systemSlot));
      case YacserObjectType.Value:
        return this.apollo.watchQuery<Query>({
            query: VALUE,
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
        mutation: CREATE_OBJECT,
        variables: {
          modelId,
          type,
          name,
          description
        },
        refetchQueries: [{query: ALL_OBJECTS, variables: {modelId}}]
      }).pipe(map(
      (result) => result.data.createObject));
  }

  public updateObject(object: YacserObject, attribute: string, value: any) {
    const type = YacserObjectType[object.type];
    switch (type) {
      case YacserObjectType.Function:
        const updateFunctionInput = new UpdateFunctionInput(object.id);
        switch (attribute) {
          case 'description':
            updateFunctionInput.updateDescription = value;
            break;
        }
        this.apollo.mutate<Mutation>({
          mutation: UPDATE_FUNCTION,
          variables: {input: updateFunctionInput}
        }).subscribe(
          (result) => console.log(result.data.updateFunction),
          (error) => console.log(error.toString()));
        break;
    }
  }
}

