import {EventEmitter, Injectable} from '@angular/core';
import {
  Mutation,
  Query,
  UpdateFunctionInput,
  UpdateHamburgerInput, UpdateYacserModelInput,
  UpdatePerformanceInput, UpdatePortRealisationInput,
  UpdateRealisationModuleInput, UpdateRealisationPortInput,
  UpdateRequirementInput,
  UpdateSystemInterfaceInput,
  UpdateSystemSlotInput,
  UpdateValueInput,
  YacserFunction,
  YacserHamburger, YacserModel,
  YacserObject,
  YacserObjectType,
  YacserPerformance, YacserPortRealisation,
  YacserRealisationModule, YacserRealisationPort,
  YacserRequirement,
  YacserSystemInterface,
  YacserSystemSlot
} from '../types';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
  ALL_MODEL_FILES,
  ALL_OBJECTS,
  CREATE_OBJECT, DELETE_OBJECT,
  FUNCTION,
  HAMBURGER, MODEL,
  PERFORMANCE, PORT_REALISATION,
  REALISATION_MODULE, REALISATION_PORT,
  REQUIREMENT,
  SYSTEM_INTERFACE,
  SYSTEM_SLOT,
  UPDATE_FUNCTION,
  UPDATE_HAMBURGER, UPDATE_MODEL,
  UPDATE_PERFORMANCE, UPDATE_PORT_REALISATION,
  UPDATE_REALISATION_MODULE, UPDATE_REALISATION_PORT,
  UPDATE_REQUIREMENT,
  UPDATE_SYSTEM_INTERFACE, UPDATE_SYSTEM_SLOT, UPDATE_VALUE,
  VALUE
} from '../graphql';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  public allObjectsUpdated = new EventEmitter<YacserObject[]>();
  public selectedModelUpdated = new EventEmitter<YacserModel>();
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

  getModel$(modelId: string): Observable<YacserModel> {
    return this.apollo.watchQuery<Query>({
        query: MODEL,
        variables: {
          modelId
        }
      }
    ).valueChanges.pipe(map(result => result.data.model));
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
      case YacserObjectType.PortRealisation:
        return this.apollo.watchQuery<Query>({
            query: PORT_REALISATION,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.portRealisation));
      case YacserObjectType.RealisationModule:
        return this.apollo.watchQuery<Query>({
            query: REALISATION_MODULE,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.realisationModule));
      case YacserObjectType.RealisationPort:
        return this.apollo.watchQuery<Query>({
            query: REALISATION_PORT,
            variables: {
              id: this.selectedObject.id
            }
          }
        ).valueChanges.pipe(map(result => result.data.realisationPort));
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

  public deleteObject(id: string): Observable<boolean> {
    const modelId = id.substring(0, id.indexOf('#'));
    return this.apollo.mutate<Mutation>(
      {
        mutation: DELETE_OBJECT,
        variables: {
          id
        },
        refetchQueries: [{query: ALL_OBJECTS, variables: {modelId}}]
      }
    ).pipe(map(
      (result) => result.data.deleteObject));
  }

  public updateObject(object: YacserObject, attribute: string, value: any) {
    const type = YacserObjectType[object.type];
    const refetchQueries = [];
    const addList: string[] = [];
    const removeList: string[] = [];
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
          case 'requirements':
            const oldRequirements = yacserFunction.requirements;
            const requirements = value as YacserRequirement[];
            for (const requirement of requirements) {
              if (oldRequirements && oldRequirements.includes(requirement)) {
                removeList.push(requirement.id);
              } else {
                addList.push(requirement.id);
              }
            }
            updateFunctionInput.addRequirements = addList;
            updateFunctionInput.removeRequirements = removeList;
            for (const requirement of requirements) {
              refetchQueries.push({query: REQUIREMENT, variables: {id: requirement.id}});
            }
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
            const newAssembly = value as YacserFunction;
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
          case 'parts':
            const oldParts = yacserFunction.parts;
            const parts = value as YacserFunction[];
            for (const part of parts) {
              if (oldParts && oldParts.includes(part)) {
                removeList.push(part.id);
              } else {
                addList.push(part.id);
              }
            }
            updateFunctionInput.addParts = addList;
            updateFunctionInput.removeParts = removeList;
            for (const part of parts) {
              refetchQueries.push({query: FUNCTION, variables: {id: part.id}});
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
          case 'ports':
            const oldPorts = yacserHamburger.ports;
            const ports = value as YacserPortRealisation[];
            for (const port of ports) {
              if (oldPorts && oldPorts.includes(port)) {
                removeList.push(port.id);
              } else {
                addList.push(port.id);
              }
            }
            updateHamburgerInput.addPorts = addList;
            updateHamburgerInput.removePorts = removeList;
            for (const port of ports) {
              refetchQueries.push({query: PORT_REALISATION, variables: {id: port.id}});
            }
            break;
          case 'assembly':
            const oldAssembly = yacserHamburger.assembly;
            const newAssembly = value as YacserHamburger;
            updateHamburgerInput.updateAssembly = newAssembly ? newAssembly.id : '';
            if (newAssembly) {
              refetchQueries.push({
                query: HAMBURGER,
                variables: {id: newAssembly.id}
              });
            }
            if (oldAssembly) {
              refetchQueries.push({
                query: HAMBURGER,
                variables: {id: oldAssembly.id}
              });
            }
            break;
          case 'parts':
            const oldParts = yacserHamburger.parts;
            const parts = value as YacserHamburger[];
            for (const part of parts) {
              if (oldParts && oldParts.includes(part)) {
                removeList.push(part.id);
              } else {
                addList.push(part.id);
              }
            }
            updateHamburgerInput.addParts = addList;
            updateHamburgerInput.removeParts = removeList;
            for (const part of parts) {
              refetchQueries.push({query: HAMBURGER, variables: {id: part.id}});
            }
            break;
        }
        this.update(updateHamburgerInput, UPDATE_HAMBURGER, 'updateHamburger', refetchQueries);
        break;
      case YacserObjectType.Performance:
        const yacserPerformance = object as YacserPerformance;
        const updatePerformanceInput = new UpdatePerformanceInput(object.id);
        switch (attribute) {
          case 'name':
            updatePerformanceInput.updateName = value;
            break;
          case 'description':
            updatePerformanceInput.updateDescription = value;
            break;
          case 'value':
            const oldValue = yacserPerformance.value;
            const newValue = value as YacserObject;
            updatePerformanceInput.updateValue = newValue ? newValue.id : '';
            if (oldValue) {
              refetchQueries.push({
                query: VALUE, variables: {id: oldValue.id}
              });
            }
            if (newValue) {
              refetchQueries.push({
                query: VALUE, variables: {id: newValue.id}
              });
            }
            break;
        }
        this.update(updatePerformanceInput, UPDATE_PERFORMANCE, 'updatePerformance', refetchQueries);
        break;
      case YacserObjectType.PortRealisation:
        const yacserPortRealisation = object as YacserPortRealisation;
        const updatePortRealisationInput = new UpdatePortRealisationInput(yacserPortRealisation.id);
        switch (attribute) {
          case 'name':
            updatePortRealisationInput.updateName = value;
            break;
          case 'description':
            updatePortRealisationInput.updateDescription = value;
            break;
          case 'interface':
            const oldInterface = yacserPortRealisation.interface;
            const newInterface = value as YacserSystemInterface;
            updatePortRealisationInput.updateInterface = newInterface ? newInterface.id : '';
            if (oldInterface) {
              refetchQueries.push({
                query: SYSTEM_INTERFACE, variables: {id: oldInterface.id}
              });
            }
            if (newInterface) {
              refetchQueries.push({
                query: SYSTEM_INTERFACE, variables: {id: newInterface.id}
              });
            }
            break;
          case 'port':
            const oldPort = yacserPortRealisation.port;
            const newPort = value as YacserRealisationPort;
            updatePortRealisationInput.updatePort = newPort ? newPort.id : '';
            if (oldPort) {
              refetchQueries.push({
                query: REALISATION_PORT, variables: {id: oldPort.id}
              });
            }
            if (newPort) {
              refetchQueries.push({
                query: REALISATION_PORT, variables: {id: newPort.id}
              });
            }
            break;
          case 'assembly':
            const oldAssembly = yacserPortRealisation.assembly;
            const newAssembly = value as YacserPortRealisation;
            updatePortRealisationInput.updateAssembly = newAssembly ? newAssembly.id : '';
            if (newAssembly) {
              refetchQueries.push({
                query: PORT_REALISATION,
                variables: {id: newAssembly.id}
              });
            }
            if (oldAssembly) {
              refetchQueries.push({
                query: PORT_REALISATION,
                variables: {id: oldAssembly.id}
              });
            }
            break;
          case 'parts':
            const oldParts = yacserPortRealisation.parts;
            const parts = value as YacserPortRealisation[];
            for (const part of parts) {
              if (oldParts && oldParts.includes(part)) {
                removeList.push(part.id);
              } else {
                addList.push(part.id);
              }
            }
            updatePortRealisationInput.addParts = addList;
            updatePortRealisationInput.removeParts = removeList;
            for (const part of parts) {
              refetchQueries.push({query: PORT_REALISATION, variables: {id: part.id}});
            }
            break;
        }
        this.update(updatePortRealisationInput, UPDATE_PORT_REALISATION, 'updatePortRealisation', refetchQueries);
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
          case 'performances':
            const oldPerformances = yacserRealisationModule.performances;
            const performances = value as YacserPerformance[];
            for (const p of performances) {
              if (oldPerformances && oldPerformances.includes(p)) {
                removeList.push(p.id);
              } else {
                addList.push(p.id);
              }
            }
            updateRealisationModuleInput.addPerformances = addList;
            updateRealisationModuleInput.removePerformances = removeList;
            for (const p of performances) {
              refetchQueries.push({query: PERFORMANCE, variables: {id: p.id}});
            }
            break;
          case 'ports':
            const oldPorts = yacserRealisationModule.ports;
            const ports = value as YacserRealisationPort[];
            for (const p of ports) {
              if (oldPorts && oldPorts.includes(p)) {
                removeList.push(p.id);
              } else {
                addList.push(p.id);
              }
            }
            updateRealisationModuleInput.addPorts = addList;
            updateRealisationModuleInput.removePorts = removeList;
            for (const p of ports) {
              refetchQueries.push({query: REALISATION_PORT, variables: {id: p.id}});
            }
            break;
          case 'assembly':
            const oldAssembly = yacserRealisationModule.assembly;
            const newAssembly = value as YacserRealisationModule;
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
          case 'parts':
            const oldParts = yacserRealisationModule.parts;
            const parts = value as YacserRealisationModule[];
            for (const part of parts) {
              if (oldParts && oldParts.includes(part)) {
                removeList.push(part.id);
              } else {
                addList.push(part.id);
              }
            }
            updateRealisationModuleInput.addParts = addList;
            updateRealisationModuleInput.removeParts = removeList;
            for (const part of parts) {
              refetchQueries.push({query: REALISATION_MODULE, variables: {id: part.id}});
            }
            break;
        }
        this.update(updateRealisationModuleInput, UPDATE_REALISATION_MODULE, 'updateRealisationModule', refetchQueries);
        break;
      case YacserObjectType.RealisationPort:
        const yacserRealisationPort = object as YacserRealisationPort;
        const updateRealisationPortInput = new UpdateRealisationPortInput(yacserRealisationPort.id);
        switch (attribute) {
          case 'name':
            updateRealisationPortInput.updateName = value;
            break;
          case 'description':
            updateRealisationPortInput.updateDescription = value;
            break;
          case 'assembly':
            const oldAssembly = yacserRealisationPort.assembly;
            const newAssembly = value as YacserRealisationPort;
            updateRealisationPortInput.updateAssembly = newAssembly ? newAssembly.id : '';
            if (newAssembly) {
              refetchQueries.push({
                query: REALISATION_PORT,
                variables: {id: newAssembly.id}
              });
            }
            if (oldAssembly) {
              refetchQueries.push({
                query: REALISATION_PORT,
                variables: {id: oldAssembly.id}
              });
            }
            break;
          case 'parts':
            const oldParts = yacserRealisationPort.parts;
            const parts = value as YacserRealisationPort[];
            for (const part of parts) {
              if (oldParts && oldParts.includes(part)) {
                removeList.push(part.id);
              } else {
                addList.push(part.id);
              }
            }
            updateRealisationPortInput.addParts = addList;
            updateRealisationPortInput.removeParts = removeList;
            for (const part of parts) {
              refetchQueries.push({query: REALISATION_PORT, variables: {id: part.id}});
            }
            break;
        }
        this.update(updateRealisationPortInput, UPDATE_REALISATION_PORT, 'updateRealisationPort', refetchQueries);
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
            const newAssembly = value as YacserSystemInterface;
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
          case 'parts':
            const oldParts = yacserSystemInterface.parts;
            const parts = value as YacserSystemInterface[];
            for (const p of parts) {
              if (oldParts && oldParts.includes(p)) {
                removeList.push(p.id);
              } else {
                addList.push(p.id);
              }
            }
            updateSystemInterfaceInput.addParts = addList;
            updateSystemInterfaceInput.removeParts = removeList;
            for (const p of parts) {
              refetchQueries.push({query: SYSTEM_INTERFACE, variables: {id: p.id}});
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
          case 'functions':
            const oldFunctions = yacserSystemSlot.functions;
            const functions = value as YacserFunction[];
            for (const f of functions) {
              if (oldFunctions && oldFunctions.includes(f)) {
                removeList.push(f.id);
              } else {
                addList.push(f.id);
              }
            }
            updateSystemSlotInput.addFunctions = addList;
            updateSystemSlotInput.removeFunctions = removeList;
            for (const f of functions) {
              refetchQueries.push({query: FUNCTION, variables: {id: f.id}});
            }
            break;
          case 'assembly':
            const oldAssembly = yacserSystemSlot.assembly;
            const newAssembly = value as YacserSystemSlot;
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
          case 'parts':
            const oldParts = yacserSystemSlot.parts;
            const parts = value as YacserSystemSlot[];
            for (const p of parts) {
              if (oldParts && oldParts.includes(p)) {
                removeList.push(p.id);
              } else {
                addList.push(p.id);
              }
            }
            updateSystemSlotInput.addParts = addList;
            updateSystemSlotInput.removeParts = removeList;
            for (const p of parts) {
              refetchQueries.push({query: SYSTEM_SLOT, variables: {id: p.id}});
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

  private update(updateInput: any, mutation: any, response: string, refetchQueries:
    ({
      variables: { id: string };
      query: any
    })[]) {
    this.apollo.mutate<Mutation>({
      mutation,
      variables: {input: updateInput},
      refetchQueries
    }).subscribe(
      (result) => {
        console.log(response + ' ' + result.data[response]);
        if (response === 'updateModel') {
          this.selectedModelUpdated.emit(result.data.updateModel);
        }
      },
      (error) => console.log(error.toString()));
  }

  updateModel(model: YacserModel, attribute: string, newValue: any) {
    const updateYacserModelInput = new UpdateYacserModelInput(model.id);
    switch (attribute) {
      case 'name':
        updateYacserModelInput.updateName = newValue;
        break;
      case 'description':
        updateYacserModelInput.updateDescription = newValue;
        break;
    }
    const refetchQueries = [];
    this.update(updateYacserModelInput, UPDATE_MODEL, 'updateModel', refetchQueries);
  }
}
