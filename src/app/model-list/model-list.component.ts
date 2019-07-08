import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import gql from 'graphql-tag';

import {YacserModel, Query} from '../types';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  models: Observable<YacserModel[]>;
  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.models = this.apollo.watchQuery<Query>({
      query: gql`
        query allModels {
          allModels {
            id
            name
            description
          }
        }
      `
    }).valueChanges.pipe(map(result => result.data.allModels));
  }

}
