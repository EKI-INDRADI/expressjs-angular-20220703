import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_eki_modal_service'; // modal service

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {
  bodyText: string;
  constructor(private modalService: ModalService) {


   } //modal service

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';

  }


  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
