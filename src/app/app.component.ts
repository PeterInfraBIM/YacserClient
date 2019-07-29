import {Component} from '@angular/core';
import {YacserModel} from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modelMap: Map<string, YacserModel>;
  modelId: string;

  constructor() {
    this.modelMap = new Map<string, YacserModel>();
  }

  getModelId(modelId: string): void {
    this.modelId = modelId;
  }
}
