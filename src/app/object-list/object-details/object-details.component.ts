import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ObjectListService} from '../object-list.service';
import {
  YacserFunction,
  YacserHamburger,
  YacserObject,
  YacserPerformance,
  YacserRealisationModule, YacserRealisationPort,
  YacserRequirement, YacserSystemInterface,
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
  modelId: string;

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
          case 'Hamburger':
            this.selectedObject = result as YacserHamburger;
            break;
          case 'RealisationModule':
            this.selectedObject = result as YacserRealisationModule;
            break;
          case 'RealisationPort':
            this.selectedObject = result as YacserRealisationPort;
            break;
          case 'Performance':
            this.selectedObject = result as YacserPerformance;
            break;
          case 'Requirement':
            this.selectedObject = result as YacserRequirement;
            break;
          case 'SystemInterface':
            this.selectedObject = result as YacserSystemInterface;
            break;
          case 'SystemSlot':
            this.selectedObject = result as YacserSystemSlot;
            break;
          case 'Value':
            this.selectedObject = result as YacserValue;
            break;
        }
        this.modelId = this.selectedObject.id.substring(0, this.selectedObject.id.indexOf('#'));
      }
    );
  }

  getLinks(filter: string): YacserObject[] {
    return this.objectListService.allObjects.filter((object => object.type === filter));
  }

  onNewValue(newValue: any, attribute: string): void {
    this.objectListService.updateObject(this.selectedObject, attribute, newValue);
  }

  onNewValues(newValues: any, attribute: string): void {
    console.log(attribute + ' ' + newValues.length);
    this.objectListService.updateObject(this.selectedObject, attribute, newValues);
  }


}
