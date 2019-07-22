import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {YacserObject, YacserObjectType} from '../types';
import {Apollo} from 'apollo-angular';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ObjectDetailsComponent} from './object-details/object-details.component';
import {ObjectListService} from './object-list.service';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit, OnChanges {
  @Input() modelId: string;
  objects: YacserObject[];
  newObject: YacserObject;
  newObjectName: string;
  newObjectDescription: string;
  newObjectType: YacserObjectType;

  constructor(
    private apollo: Apollo,
    private modal: NgbModal,
    private objectListService: ObjectListService) {
    this.newObjectType = YacserObjectType.Function;
  }

  ngOnInit() {
    this.objectListService.allObjectsUpdated.subscribe(
      (result) => this.objects = result);
    if (this.modelId) {
      this.objectListService.getAllObjects$(this.modelId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.modelId) {
      this.objectListService.getAllObjects$(this.modelId);
    }
  }

  openObjectDetails(object: YacserObject): void {
    console.log('object:' + object.name);
    this.objectListService.setSelectedObject(object);
    const modal = this.modal.open(ObjectDetailsComponent);
  }

  createObject(): void {
    this.objectListService.createObject$(this.modelId, this.newObjectType, this.newObjectName, this.newObjectDescription)
      .subscribe((result) => {
        this.newObject = result;
        console.log('New object: ' + this.newObject.name);
        this.newObjectName = null;
        this.newObjectDescription = null;
      });
  }

  getTypes(): YacserObjectType[] {
    const types = [];
    Object.keys(YacserObjectType)
      .map(key => {
        types.push(YacserObjectType[key]);
      });
    return types;
  }

}
