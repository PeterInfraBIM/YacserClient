import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons/faWindowClose';
import {StateService} from '../../state.service';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.css']
})
export class ModelDetailsComponent implements OnInit {
  faWindowClose = faWindowClose;

  constructor(public activeModal: NgbActiveModal, private stateService: StateService) {
  }

  ngOnInit() {
  }

}
