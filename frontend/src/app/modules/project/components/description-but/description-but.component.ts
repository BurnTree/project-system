import {Component} from '@angular/core';
import {EditComponent} from "../../../action/modal/edit/edit.component";
import {AssignComponent} from "../../../action/modal/assign/assign.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-des-but',
  templateUrl: './description-but.component.html'
})
export class DescriptionButComponent {

  private modalRef: BsModalRef;

  constructor(private modalService: BsModalService ) {}
  openEdit() {
    this.modalRef = this.modalService.show(EditComponent);
    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
    });
  }
  openAssign() {
    this.modalRef = this.modalService.show(AssignComponent);
    this.modalRef.content.onClose.subscribe(result => {
      console.log('results', result);
    });
  }
}