import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ObjectListService} from '../object-list.service';
import {
  YacserFunction,
  YacserObject,
  YacserPerformance, YacserRealisationModule,
  YacserRequirement,
  YacserSystemSlot,
  YacserValue
} from '../../types';

@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.css']
})
export class ObjectDetailsComponent implements OnInit {
  selectedObject: YacserObject;

  constructor(private modal: NgbModal,
              public activeModal: NgbActiveModal,
              private objectListService: ObjectListService) {
  }

  ngOnInit(): void {
    this.objectListService.getSelectedObject$().subscribe(
      (result) => {
        console.log(result.type);
        switch (result.type) {
          case 'Function':
            this.selectedObject = result as YacserFunction;
            break;
          case 'RealisationModule':
            this.selectedObject = result as YacserRealisationModule;
            break;
          case 'Performance':
            this.selectedObject = result as YacserPerformance;
            break;
          case 'Requirement':
            this.selectedObject = result as YacserRequirement;
            break;
          case 'SystemSlot':
            this.selectedObject = result as YacserSystemSlot;
            break;
          case 'Value':
            this.selectedObject = result as YacserValue;
            break;
        }
      }
    );
  }

  getFunction(object: YacserObject): YacserFunction {
    return object as YacserFunction;
  }

  getPerformance(object: YacserObject): YacserPerformance {
    return object as YacserPerformance;
  }

  getRealisationModule(object: YacserObject): YacserRealisationModule {
    return object as YacserRealisationModule;
  }

  getRequirement(object: YacserObject): YacserRequirement {
    return object as YacserRequirement;
  }

  getSystemSlot(object: YacserObject): YacserSystemSlot {
    return object as YacserSystemSlot;
  }

  getValue(object: YacserObject): YacserValue {
    return object as YacserValue;
  }
}
