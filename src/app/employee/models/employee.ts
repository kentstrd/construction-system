export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: any;
  Gender: string;
  skills: string;
  address: Address[];
  contact: Contact[];
}

export class Address {
  homeaddress: string;
}

export class Contact {
  homenumber: string;
}
