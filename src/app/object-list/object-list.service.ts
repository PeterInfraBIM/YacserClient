import {Injectable} from '@angular/core';
import {YacserObject} from '../types';

@Injectable({
  providedIn: 'root'
})
export class ObjectListService {
  private selectedObject: YacserObject;

  constructor() {
  }

  getSelectedObject(): YacserObject {
    return this.selectedObject;
  }

  setSelectedObject(object: YacserObject): void {
    this.selectedObject = object;
  }
}
