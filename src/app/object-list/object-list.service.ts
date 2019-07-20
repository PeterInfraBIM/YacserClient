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
  UpdateSystemSlotInput, UpdateValueInput, YacserFunction, YacserHamburger,
  YacserObject,
  YacserObjectType, YacserRealisationModule, YacserRequirement, YacserSystemInterface, YacserSystemSlot
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
    const refetchQueries = [];
    switch (type) {
      case YacserObjectType.Function:
        const yacserFunction = object as YacserFunction;
        const updateFunctionInput = new UpdateFunctionInput(object.id);
        switch (attribute) {
          case 'name':
            updateFunctionInput.updateName = value;
            break;
          case 'description':
            updateFunctionInput.updateDescription = value;
            break;
          case 'input':
            const oldInput = yacserFunction.input;
            const newInput = value as YacserObject;
            updateFunctionInput.updateInput = newInput ? newInput.id : '';
            if (oldInput) {
              refetchQueries.push({
                query: SYSTEM_INTERFACE, variables: {id: oldInput.id}
              });
            }
            if (newInput) {
              refetchQueries.push({
                query: SYSTEM_INTERFACE, variables: {id: newInput.id}
              });
            }
            break;
          case 'output':
            const oldOutput = yacserFunction.output;
            const newOutput = value as YacserObject;
            updateFunctionInput.updateOutput = newOutput ? newOutput.id : '';
            if (oldOutput) {
              refetchQueries.push({
                query: SYSTEM_INTERFACE, variables: {id: oldOutput.id}
              });
            }
            if (newOutput) {
              refetchQueries.push({
                query: SYSTEM_INTERFACE, variables: {id: newOutput.id}
              });
            }
            break;
          case 'assembly':
            const oldAssembly = yacserFunction.assembly;
            const newAssembly = value as YacserObject;
            updateFunctionInput.updateAssembly = newAssembly ? newAssembly.id : '';
            if (newAssembly) {
              refetchQueries.push({
                query: FUNCTION,
                variables: {id: newAssembly.id}
              });
            }
            if (oldAssembly) {
              refetchQueries.push({
                query: FUNCTION,
                variables: {id: oldAssembly.id}
              });
            }
            break;
        }
        this.update(updateFunctionInput, UPDATE_FUNCTION, 'updateFunction', refetchQueries);
        break;
      case YacserObjectType.Hamburger:
        const updateHamburgerInput = new UpdateHamburgerInput(object.id);
        const yacserHamburger = object as YacserHamburger;
        switch (attribute) {
          case 'name':
            updateHamburgerInput.updateName = value;
            break;
          case 'description':
            updateHamburgerInput.updateDescription = value;
            break;
          case 'functionalUnit':
            const oldFunctionalUnit = yacserHamburger.functionalUnit;
            const newFunctionalUnit = value as YacserObject;
            updateHamburgerInput.updateFunctionalUnit = newFunctionalUnit ? newFunctionalUnit.id : '';
            if (oldFunctionalUnit) {
              refetchQueries.push({
                query: SYSTEM_SLOT, variables: {id: oldFunctionalUnit.id}
              });
            }
            if (newFunctionalUnit) {
              refetchQueries.push({
                query: SYSTEM_SLOT, variables: {id: newFunctionalUnit.id}
              });
            }
            break;
          case 'technicalSolution':
            const oldTechnicalSolution = yacserHamburger.technicalSolution;
            const newTechnicalSolution = value as YacserObject;
            updateHamburgerInput.updateTechnicalSolution = newTechnicalSolution ? newTechnicalSolution.id : '';
            if (oldTechnicalSolution) {
              refetchQueries.push({
                query: REALISATION_MODULE, variables: {id: oldTechnicalSolution.id}
              });
            }
            if (newTechnicalSolution) {
              refetchQueries.push({
                query: REALISATION_MODULE, variables: {id: newTechnicalSolution.id}
              });
            }
            break;
        }
        this.update(updateHamburgerInput, UPDATE_HAMBURGER, 'updateHamburger', refetchQueries);
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
        const yacserRealisationModule = object as YacserRealisationModule;
        const updateRealisationModuleInput = new UpdateRealisationModuleInput(yacserRealisationModule.id);
        switch (attribute) {
          case 'name':
            updateRealisationModuleInput.updateName = value;
            break;
          case 'description':
            updateRealisationModuleInput.updateDescription = value;
            break;
          case 'assembly':
            const oldAssembly = yacserRealisationModule.assembly;
            const newAssembly = value as YacserObject;
            updateRealisationModuleInput.updateAssembly = newAssembly ? newAssembly.id : '';
            if (newAssembly) {
              refetchQueries.push({
                query: REALISATION_MODULE,
                variables: {id: newAssembly.id}
              });
            }
            if (oldAssembly) {
              refetchQueries.push({
                query: REALISATION_MODULE,
                variables: {id: oldAssembly.id}
              });
            }
            break;
        }
        this.update(updateRealisationModuleInput, UPDATE_REALISATION_MODULE, 'updateRealisationModule', refetchQueries);
        break;
      case YacserObjectType.Requirement:
        const yacserRequirement = object as YacserRequirement;
        const updateRequirementInput = new UpdateRequirementInput(object.id);
        switch (attribute) {
          case 'name':
            updateRequirementInput.updateName = value;
            break;
          case 'description':
            updateRequirementInput.updateDescription = value;
            break;
          case 'minValue':
            const oldMinValue = yacserRequirement.minValue;
            const newMinValue = value as YacserObject;
            updateRequirementInput.updateMinValue = newMinValue ? newMinValue.id : '';
            if (oldMinValue) {
              refetchQueries.push({
                query: VALUE, variables: {id: oldMinValue.id}
              });
            }
            if (newMinValue) {
              refetchQueries.push({
                query: VALUE, variables: {id: newMinValue.id}
              });
            }
            break;
          case 'maxValue':
            const oldMaxValue = yacserRequirement.maxValue;
            const newMaxValue = value as YacserObject;
            updateRequirementInput.updateMaxValue = newMaxValue ? newMaxValue.id : '';
            if (oldMaxValue) {
              refetchQueries.push({
                query: VALUE, variables: {id: oldMaxValue.id}
              });
            }
            if (newMaxValue) {
              refetchQueries.push({
                query: VALUE, variables: {id: newMaxValue.id}
              });
            }
            break;
        }
        this.update(updateRequirementInput, UPDATE_REQUIREMENT, 'updateRequirement', refetchQueries);
        break;
      case YacserObjectType.SystemInterface:
        const yacserSystemInterface = object as YacserSystemInterface;
        const updateSystemInterfaceInput = new UpdateSystemInterfaceInput(object.id);
        switch (attribute) {
          case 'name':
            updateSystemInterfaceInput.updateName = value;
            break;
          case 'description':
            updateSystemInterfaceInput.updateDescription = value;
            break;
          case 'systemSlot0':
            const oldSystemSlot0 = yacserSystemInterface.systemSlot0;
            const newSystemSlot0 = value as YacserObject;
            updateSystemInterfaceInput.updateSystemSlot0 = newSystemSlot0 ? newSystemSlot0.id : '';
            if (newSystemSlot0) {
              refetchQueries.push({
                query: SYSTEM_SLOT,
                variables: {id: newSystemSlot0.id}
              });
            }
            if (oldSystemSlot0) {
              refetchQueries.push({
                query: SYSTEM_SLOT,
                variables: {id: oldSystemSlot0.id}
              });
            }
            break;
          case 'systemSlot1':
            const oldSystemSlot1 = yacserSystemInterface.systemSlot1;
            const newSystemSlot1 = value as YacserObject;
            updateSystemInterfaceInput.updateSystemSlot1 = newSystemSlot1 ? newSystemSlot1.id : '';
            if (newSystemSlot1) {
              refetchQueries.push({
                query: SYSTEM_SLOT,
                variables: {id: newSystemSlot1.id}
              });
            }
            if (oldSystemSlot1) {
              refetchQueries.push({
                query: SYSTEM_SLOT,
                variables: {id: oldSystemSlot1.id}
              });
            }
            break;
          case 'assembly':
            const oldAssembly = yacserSystemInterface.assembly;
            const newAssembly = value as YacserObject;
            updateSystemInterfaceInput.updateAssembly = newAssembly ? newAssembly.id : '';
            if (newAssembly) {
              refetchQueries.push({
                query: SYSTEM_INTERFACE,
                variables: {id: newAssembly.id}
              });
            }
            if (oldAssembly) {
              refetchQueries.push({
                query: SYSTEM_INTERFACE,
                variables: {id: oldAssembly.id}
              });
            }
            break;
        }
        this.update(updateSystemInterfaceInput, UPDATE_SYSTEM_INTERFACE, 'updateSystemInterface', refetchQueries);
        break;
      case YacserObjectType.SystemSlot:
        const yacserSystemSlot = object as YacserSystemSlot;
        const updateSystemSlotInput = new UpdateSystemSlotInput(object.id);
        switch (attribute) {
          case 'name':
            updateSystemSlotInput.updateName = value;
            break;
          case 'description':
            updateSystemSlotInput.updateDescription = value;
            break;
          case 'assembly':
            const oldAssembly = yacserSystemSlot.assembly;
            const newAssembly = value as YacserObject;
            updateSystemSlotInput.updateAssembly = newAssembly ? newAssembly.id : '';
            if (newAssembly) {
              refetchQueries.push({
                query: SYSTEM_SLOT,
                variables: {id: newAssembly.id}
              });
            }
            if (oldAssembly) {
              refetchQueries.push({
                query: SYSTEM_SLOT,
                variables: {id: oldAssembly.id}
              });
            }
            break;
        }
        this.update(updateSystemSlotInput, UPDATE_SYSTEM_SLOT, 'updateSystemSlot', refetchQueries);
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
        this.update(updateValueInput, UPDATE_VALUE, 'updateValue', refetchQueries);
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
