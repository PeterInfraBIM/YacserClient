import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Query, YacserObject} from '../types';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ObjectDetailsComponent} from "./object-details/object-details.component";
import {ObjectListService} from "./object-list.service";

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit {
  @Input() modelId: string;
  objects: Observable<YacserObject[]>;

  constructor(
    private apollo: Apollo,
    private modal: NgbModal,
    private objectListService: ObjectListService) {
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

  openObjectDetails(object: YacserObject): void {
    console.log('object:' + object.name);
    this.objectListService.setSelectedObject(object);
    const modal = this.modal.open(ObjectDetailsComponent);
  }
}
