import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Query, YacserObject} from '../types';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit {
  @Input() modelId: string;
  objects: Observable<YacserObject[]>;

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.objects = this.apollo.watchQuery<Query>({
      query: gql`
        query allObjects ($modelId: ID!){
          allObjects (modelId: $modelId) {
            id
            name
            description
            type
          }
        }
      `,
      variables: {
        modelId: this.modelId
      }
    }).valueChanges.pipe(map(result => result.data.allObjects));
  }

}
