import { IContact } from './../interfaces/contacts.interface';

export class Contact implements IContact{
    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public phone: string
    ){}
}