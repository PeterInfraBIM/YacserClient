import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {YacserObject, YacserObjectType} from '../types';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ObjectDetailsComponent} from './object-details/object-details.component';
import {ObjectListService} from './object-list.service';
import {faEdit, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {StateService} from '../state.service';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit, OnChanges {
  @Input() modelId: string;
  @Input() canvasObjectIds: string[];
  objects: YacserObject[];
  newObject: YacserObject;
  newObjectName: string;
  newObjectDescription: string;
  newObjectType: YacserObjectType;
  faEdit = faEdit;
  faPlus = faPlus;
  faTrash = faTrash;

  constructor(
    private modal: NgbModal,
    private objectListService: ObjectListService,
    private stateService: StateService) {
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
      if (this.modelId) {
        this.objectListService.getAllObjects$(this.modelId);
      }
    }
  }

  openObjectDetails(object: YacserObject): void {
    console.log('object:' + object.name);
    this.objectListService.setSelectedObject(object);
    const modal = this.modal.open(ObjectDetailsComponent);
  }

  onDeleteClick(object: YacserObject): void {
    alert('Not yet implemented!');
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

  toggleCanvas(object: YacserObject): void {
    if (this.canvasObjectIds.includes(object.id)) {
      const index = this.canvasObjectIds.indexOf(object.id);
      this.canvasObjectIds.splice(index, 1);
    } else {
      this.canvasObjectIds.push(object.id);
    }
    this.stateService.setCanvasObjectIds(this.canvasObjectIds);
  }

  inCanvas(object: YacserObject): boolean {
    return this.canvasObjectIds ? this.canvasObjectIds.includes(object.id) : false;
  }
}
