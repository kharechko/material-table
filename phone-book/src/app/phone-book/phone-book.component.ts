import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ContactsService } from './../shared/services/contacts.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IContact } from '../shared/interfaces/contacts.interface';
import { Contact } from '../shared/models/contacts.model';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.scss']
})


export class PhoneBookComponent implements OnInit {


  contactsArray: Array<IContact> = [];
  displayedColumns: string[] = ['name', 'surname', 'phone', 'edit', 'delete'];
  dataSource = new MatTableDataSource(this.contactsArray);
  modalRef: BsModalRef;
  contactName: string = '';
  contactSurname: string = '';
  contactPhone: string = '';
  editId: number;
  isEdit: boolean = false;
  searchName: string = '';


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private modalService: BsModalService,
    private contactsService: ContactsService ) {}

  ngOnInit(): void {
    this.getContactsFromService();
  }

  openModal(modal: TemplateRef<any>, contact?: IContact) {
    this.modalRef = this.modalService.show(modal);
    if(contact) {
      this.editId = contact.id;
      this.contactName = contact.name;
      this.contactSurname = contact.surname;
      this.contactPhone = contact.phone;
      this.isEdit = true;
    }
  }


clearSearch(): void{
  this.searchName = '';
}


getContactsFromService(): void{
  this.contactsService.getContacts().subscribe(data => {
    this.contactsArray = data;
    this.dataSource = new MatTableDataSource(this.contactsArray);
    this.dataSource.sort = this.sort;
  }, error => {
    console.log(error)
  })
}





addContact(): void{
  let contact: IContact = new Contact(1, this.contactName, this.contactSurname, this.contactPhone);
  if(!this.isEdit) {
    if(this.contactsArray.length > 0) {
      contact.id = this.contactsArray.slice(-1)[0].id + 1;
    }
   this.contactsService.addContact(contact).subscribe( data => {
     this.getContactsFromService();
     this.resetForm();
     this.modalRef.hide();
    })
  }

  else{
    contact.id = this.editId;
    this.contactsService.updateContact(contact).subscribe( () => {
      this.getContactsFromService();
      this.resetForm();
      this.modalRef.hide();
    })
  }
}


deleteContact(contact: IContact): void{
  this.contactsService.deleteContact(contact).subscribe(() => {
    this.getContactsFromService();
  })
}


resetForm(): void{
  this.contactName = '';
  this.contactSurname = '';
  this.contactPhone = '';
}

  applyFilter(filterValue: string): void{
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
