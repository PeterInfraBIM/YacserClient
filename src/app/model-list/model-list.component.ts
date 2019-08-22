import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import gql from 'graphql-tag';

import {YacserModel, Query, Mutation} from '../types';
import {faFileDownload, faEdit, faFileUpload, faPlus} from '@fortawesome/free-solid-svg-icons';
import {StateService} from '../state.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModelDetailsComponent} from './model-details/model-details.component';
import {ObjectListService} from '../object-list/object-list.service';

const CREATE_MODEL = gql`
    mutation createModel($modelId: ID!, $name: String, $description: String){
        createModel(modelId: $modelId, name: $name, description: $description) {
            id
            name
            description
        }
    }
`;

const ALL_MODEL_FILES = gql`
    query allModelFiles{allModelFiles}
`;

const ALL_MODELS = gql`
    query allModels {
        allModels {
            id
            name
            description
        }
    }
`;

const LOAD_MODEL = gql`
    mutation loadModel($filePath: String!){
        loadModel(filePath: $filePath) {
            id
            name
            description
        }
    }
`;

const SAVE_MODEL = gql`
    mutation saveModel($modelId: ID!, $filePath: String!){
        saveModel(modelId: $modelId, filePath: $filePath)
    }
`;

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  @Input() modelMap: Map<string, YacserModel>;
  modelFiles: string[];
  models: Observable<YacserModel[]>;
  newModel: YacserModel;
  newModelId: string;
  newModelName: string;
  newModelDescription: string;
  faEdit = faEdit;
  faFileUpload = faFileUpload;
  faFileDownload = faFileDownload;
  faPlus = faPlus;

  constructor(
    private apollo: Apollo,
    private stateService: StateService,
    private modal: NgbModal,
    private objectListService: ObjectListService) {
  }

  ngOnInit() {
    this.apollo.watchQuery<Query>({
      query: ALL_MODEL_FILES
    }).valueChanges.subscribe(
      result => {
        this.modelFiles = result.data.allModelFiles;
        for (const modelFile of this.modelFiles) {
          if (!this.modelMap.get(modelFile)) {
            this.modelMap.set(modelFile, null);
          }
        }
      });
    this.models = this.apollo.watchQuery<Query>({
      query: ALL_MODELS
    }).valueChanges.pipe(map(result => result.data.allModels));
    this.objectListService.selectedModelUpdated.subscribe((result) => {
      const key = result.id.substring(result.id.lastIndexOf('/') + 1) + '.ttl';
      this.modelMap.set(key, result);
      this.ngOnInit();
    });
  }

  openModelDetails(filePath: string) {
    if (this.modelMap.get(filePath)) {
      const modal = this.modal.open(ModelDetailsComponent);
    } else {
      alert('First download model.');
    }
  }

  onCreateModel() {
    this.createModel(this.newModelId, this.newModelName, this.newModelDescription).subscribe((result) => {
      this.newModel = result;
      const filePath = this.newModel.id.substring(this.newModel.id.lastIndexOf('/') + 1) + '.ttl';
      this.modelMap.set(filePath, this.newModel);
      this.modelFiles.push(filePath);
      this.onSaveClick(filePath);
    });
  }

  onLoadClick(filePath: string): void {
    this.loadModel(filePath).subscribe(result => {
      const key = result.id.substring(result.id.lastIndexOf('/') + 1) + '.ttl';
      this.modelMap.set(key, result);
      console.log('description: ' + this.modelMap.get(key).description);
      this.stateService.setModelId(result.id);
      this.stateService.setModel(result);
    });
  }

  onSaveClick(filePath: string): void {
    this.saveModel(filePath).subscribe((result) => {
      console.log('Save model result: ' + result);
      this.onLoadClick(filePath);
    });
  }

  createModel(modelId: string, name: string, description: string): Observable<YacserModel> {
    return this.apollo.mutate<Mutation>({
      mutation: CREATE_MODEL,
      variables: {
        modelId,
        name,
        description
      }
    }).pipe(map(result => result.data.createModel));
  }

  loadModel(filePath: string): Observable<YacserModel> {
    return this.apollo.mutate<Mutation>({
      mutation: LOAD_MODEL,
      variables: {
        filePath
      }
    }).pipe(map(result => result.data.loadModel));
  }

  saveModel(filePath: string): Observable<boolean> {
    const modelId = this.modelMap.get(filePath).id;
    return this.apollo.mutate<Mutation>({
      mutation: SAVE_MODEL,
      variables: {modelId, filePath}
    }).pipe(map(result => result.data.saveModel));
  }

}
