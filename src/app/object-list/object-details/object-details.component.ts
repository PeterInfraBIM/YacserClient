import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ObjectListService} from '../object-list.service';
import {YacserFunction, YacserObject, YacserRequirement, YacserSystemSlot} from '../../types';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
          case 'Requirement':
            this.selectedObject = result as YacserRequirement;
            break;
          case 'SystemSlot':
            this.selectedObject = result as YacserSystemSlot;
            break;
        }
      }
    );
  }

  getFunction(object: YacserObject): YacserFunction {
    return object as YacserFunction;
  }

  getRequirement(object: YacserObject): YacserRequirement {
    return object as YacserRequirement;
  }

  getSystemSlot(object: YacserObject): YacserSystemSlot {
    return object as YacserSystemSlot;
  }
}
