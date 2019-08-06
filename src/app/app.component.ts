import {Component, OnInit} from '@angular/core';
import {YacserModel} from './types';
import {StateService} from "./state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modelMap: Map<string, YacserModel>;
  modelId: string;
  canvasObjectIds: string[];

  constructor(private stateService: StateService) {
    this.modelMap = new Map<string, YacserModel>();
    this.canvasObjectIds = [] as string[];
  }

  ngOnInit(): void {
    this.stateService.modelIdChanged.subscribe((modelId) => this.modelId = modelId);
    this.stateService.canvasObjectIdsChanged.subscribe((canvasObjectIds) => this.canvasObjectIds = canvasObjectIds);
  }

}
