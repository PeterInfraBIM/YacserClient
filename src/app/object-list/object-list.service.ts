import {EventEmitter, Injectable} from '@angular/core';
import {
  Mutation,
  Query,
  UpdateFunctionInput,
  UpdateHamburgerInput,
  UpdatePerformanceInput,
  UpdateRealisationModuleInput,
  UpdateRequirementInput,
  UpdateSystemInterfaceInput,
  UpdateSystemSlotInput, UpdateValueInput,
  YacserObject,
  YacserObjectType, YacserRealisationModule
} from '../types';
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
  SYSTEM_SLOT,
  UPDATE_FUNCTION,
  UPDATE_HAMBURGER,
  UPDATE_PERFORMANCE,
  UPDATE_REALISATION_MODULE,
  UPDATE_REQUIREMENT,
  UPDATE_SYSTEM_INTERFACE, UPDATE_SYSTEM_SLOT, UPDATE_VALUE,
  VALUE
} from '../graphql';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  public allObjectsUpdated = new EventEmitter<YacserObject[]>();
  public allObjects: YacserObject[];
  private selectedObject: YacserObject;

  constructor(private apollo: Apollo) {
  }

  getAllObjects$(modelId: string): void {
    this.apollo.watchQuery<Query>({
      query: ALL_OBJECTS,
      variables: {
        modelId
      }
    }).valueChanges.subscribe(result => {
      this.allObjects = result.data.allObjects;
      this.allObjectsUpdated.emit(this.allObjects);
    });
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
          case 'name':
            updateFunctionInput.updateName = value;
            break;
          case 'description':
            updateFunctionInput.updateDescription = value;
            break;
        }
        this.update(updateFunctionInput, UPDATE_FUNCTION, 'updateFunction', []);
        break;
      case YacserObjectType.Hamburger:
        const updateHamburgerInput = new UpdateHamburgerInput(object.id);
        switch (attribute) {
          case 'name':
            updateHamburgerInput.updateName = value;
            break;
          case 'description':
            updateHamburgerInput.updateDescription = value;
            break;
        }
        this.update(updateHamburgerInput, UPDATE_HAMBURGER, 'updateHamburger', []);
        break;
      case YacserObjectType.Performance:
        const updatePerformanceInput = new UpdatePerformanceInput(object.id);
        switch (attribute) {
          case 'name':
            updatePerformanceInput.updateName = value;
            break;
          case 'description':
            updatePerformanceInput.updateDescription = value;
            break;
        }
        this.update(updatePerformanceInput, UPDATE_PERFORMANCE, 'updatePerformance', []);
        break;
      case YacserObjectType.RealisationModule:
        const updateRealisationModuleInput = new UpdateRealisationModuleInput(object.id);
        switch (attribute) {
          case 'name':
            updateRealisationModuleInput.updateName = value;
            break;
          case 'description':
            updateRealisationModuleInput.updateDescription = value;
            break;
          case 'assembly':
            updateRealisationModuleInput.updateAssembly = (value as YacserObject).id;
            if ((object as YacserRealisationModule).assembly.id) {
              this.update(updateRealisationModuleInput, UPDATE_REALISATION_MODULE, 'updateRealisationModule', [{
                query: REALISATION_MODULE,
                variables: {id: (value as YacserObject).id}
              }, {
                query: REALISATION_MODULE, variables: {id: (object as YacserRealisationModule).assembly.id}
              }]);
            } else {
              this.update(updateRealisationModuleInput, UPDATE_REALISATION_MODULE, 'updateRealisationModule', [{
                query: REALISATION_MODULE,
                variables: {id: (value as YacserObject).id}
              }]);
            }
            return;
        }
        this.update(updateRealisationModuleInput, UPDATE_REALISATION_MODULE, 'updateRealisationModule', []);
        break;
      case YacserObjectType.Requirement:
        const updateRequirementInput = new UpdateRequirementInput(object.id);
        switch (attribute) {
          case 'name':
            updateRequirementInput.updateName = value;
            break;
          case 'description':
            updateRequirementInput.updateDescription = value;
            break;
        }
        this.update(updateRequirementInput, UPDATE_REQUIREMENT, 'updateRequirement', []);
        break;
      case YacserObjectType.SystemInterface:
        const updateSystemInterfaceInput = new UpdateSystemInterfaceInput(object.id);
        switch (attribute) {
          case 'name':
            updateSystemInterfaceInput.updateName = value;
            break;
          case 'description':
            updateSystemInterfaceInput.updateDescription = value;
            break;
        }
        this.update(updateSystemInterfaceInput, UPDATE_SYSTEM_INTERFACE, 'updateSystemInterface', []);
        break;
      case YacserObjectType.SystemSlot:
        const updateSystemSlotInput = new UpdateSystemSlotInput(object.id);
        switch (attribute) {
          case 'name':
            updateSystemSlotInput.updateName = value;
            break;
          case 'description':
            updateSystemSlotInput.updateDescription = value;
            break;
        }
        this.update(updateSystemSlotInput, UPDATE_SYSTEM_SLOT, 'updateSystemSlot', []);
        break;
      case YacserObjectType.Value:
        const updateValueInput = new UpdateValueInput(object.id);
        switch (attribute) {
          case 'name':
            updateValueInput.updateName = value;
            break;
          case 'description':
            updateValueInput.updateDescription = value;
            break;
          case 'unit':
            updateValueInput.updateUnit = value;
            break;
          case 'value':
            updateValueInput.updateValue = value;
            break;
        }
        this.update(updateValueInput, UPDATE_VALUE, 'updateValue', []);
        break;
    }
  }

  private update(
    updateInput: any,
    mutation: any,
    response: string,
    refetchQueries: ({ variables: { id: string }; query: any })[]) {
    this.apollo.mutate<Mutation>({
      mutation,
      variables: {input: updateInput},
      refetchQueries
    }).subscribe(
      (result) => console.log(result.data[response]),
      (error) => console.log(error.toString()));
  }
}
