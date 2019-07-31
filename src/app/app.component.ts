import {Component} from '@angular/core';
import {YacserModel, YacserObject} from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modelMap: Map<string, YacserModel>;
  modelId: string;
  canvasObjectIds: string[];

  constructor() {
    this.modelMap = new Map<string, YacserModel>();
    this.canvasObjectIds = [] as string[];
  }

  getModelId(modelId: string): void {
    this.modelId = modelId;
    this.canvasObjectIds.splice(0, this.canvasObjectIds.length);
  }
}
