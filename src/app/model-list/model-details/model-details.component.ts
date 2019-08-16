import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons/faWindowClose';
import {StateService} from '../../state.service';
import {ObjectListService} from '../../object-list/object-list.service';
import {YacserModel} from '../../types';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {
  faWindowClose = faWindowClose;
  selectedModel: YacserModel;

  constructor(
    public activeModal: NgbActiveModal,
    private stateService: StateService,
    private objectListService: ObjectListService) {
  }

  ngOnInit() {
    this.selectedModel = this.stateService.model;
    this.objectListService.getModel$(this.selectedModel.id).subscribe((result => {
      this.stateService.model = result;
      this.selectedModel = result;
    }));
  }

  onNewValue(newValue: any, attribute: string): void {
    this.objectListService.updateModel(this.selectedModel, attribute, newValue);
  }
}
