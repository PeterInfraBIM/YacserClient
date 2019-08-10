import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import gql from 'graphql-tag';

import {YacserModel, Query, Mutation} from '../types';
import {faFileDownload, faFileUpload} from '@fortawesome/free-solid-svg-icons';
import {StateService} from '../state.service';

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

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  @Input() modelMap: Map<string, YacserModel>;
  modelFiles: string[];
  models: Observable<YacserModel[]>;
  newModel: Observable<YacserModel>;
  filePath: string;
  faFileUpload = faFileUpload;
  faFileDownload = faFileDownload;

  constructor(private apollo: Apollo, private stateService: StateService) {
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
  }

  onCreateModel() {
    this.newModel = this.createModel('xxx', 'yyy', 'zzz');
  }

  onLoadClick(filePath: string): void {
    this.loadModel(filePath).subscribe(result => {
      const key = result.id.substring(result.id.lastIndexOf('/') + 1) + '.ttl';
      this.modelMap.set(key, result);
      console.log('description: ' + this.modelMap.get(key).description);
//      this.modelId.emit(result.id);
      this.stateService.setModelId(result.id);
    });
  }

  onSaveClick(filePath: string): void {
  }

  createModel(modelId: string, name: string, description: string): Observable<YacserModel> {
    return this.apollo.mutate<Mutation>(
      {
        mutation: CREATE_MODEL,
        variables: {
          modelId,
          name,
          description
        }
      }).pipe(map(result => result.data.createModel));
  }

  loadModel(filePath: string):
    Observable<YacserModel> {
    return this.apollo.mutate<Mutation>({
      mutation: LOAD_MODEL,
      variables: {
        filePath
      }
    }).pipe(map(result => result.data.loadModel));
  }

}
