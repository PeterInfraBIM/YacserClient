import {Injectable} from '@angular/core';
import {Context, Node, Shape, WidgetFactory} from './canvas.component';
import {YacserObject} from "../types";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  context: Context;
  drawList: Shape[];
  widgets: Map<string, Node>;
  objectMap: Map<string, YacserObject>;

  constructor() {
    this.drawList = [];
    this.widgets = new Map<string, Node>();
    this.objectMap = new Map<string, YacserObject>();
  }

  setContext(context: Context) {
    this.context = context;
  }

  getContext(): Context {
    return this.context;
  }

}
