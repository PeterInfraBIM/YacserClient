import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import gql from 'graphql-tag';

import {YacserModel, Query, Mutation} from '../types';

const CREATE_MODEL = gql`
  mutation createModel($modelId: ID!, $name: String, $description: String){
    createModel(modelId: $modelId, name: $name, description: $description) {
      id
      name
      description
    }
  }
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
  models: Observable<YacserModel[]>;
  newModel: Observable<YacserModel>;
  filePath: string;
  @Output() modelId = new EventEmitter<string>();

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.models = this.apollo.watchQuery<Query>({
      query: ALL_MODELS
    }).valueChanges.pipe(map(result => result.data.allModels));
  }

  onCreateModel() {
    this.newModel = this.createModel('xxx', 'yyy', 'zzz');
  }

  onLoadClick(filePath: string): void {
    this.loadModel(filePath).subscribe(result => {
      this.modelId.emit(result.id);
      this.ngOnInit();
    });
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

  loadModel(filePath: string): Observable<YacserModel> {
    return this.apollo.mutate<Mutation>({
      mutation: LOAD_MODEL,
      variables: {
        filePath
      }
    }).pipe(map(result => result.data.loadModel)
    )
      ;
  }

}
