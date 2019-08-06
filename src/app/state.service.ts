import {EventEmitter, Injectable} from '@angular/core';
import {Context, Node, Shape, WidgetFactory} from './canvas/canvas.component';
import {YacserObject} from './types';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  modelId: string;
  modelIdChanged = new EventEmitter<string>();
  context: Context;
  drawList: Shape[];
  drawListChanged = new EventEmitter<Shape[]>();
  widgets: Map<string, Node>;
  objectMap: Map<string, YacserObject>;
  canvasObjectIds: string[];
  canvasObjectIdsChanged = new EventEmitter<string[]>();

  constructor() {
    this.drawList = [];
    this.widgets = new Map<string, Node>();
    this.objectMap = new Map<string, YacserObject>();
  }

  setModelId(modelId: string) {
    this.modelId = modelId;
    this.modelIdChanged.emit(this.modelId);
    this.drawList.splice(0, this.drawList.length);
    this.drawListChanged.emit(this.drawList);
  }

  setDrawList(drawList: Shape[]) {
    this.drawList = drawList;
    this.drawListChanged.emit(this.drawList);
  }

  setCanvasObjectIds(canvasObjectIds: string[]) {
    this.canvasObjectIds = canvasObjectIds;
    this.canvasObjectIdsChanged.emit(this.canvasObjectIds);
  }

  setContext(context: Context) {
    this.context = context;
  }

  getContext(): Context {
    return this.context;
  }

}
