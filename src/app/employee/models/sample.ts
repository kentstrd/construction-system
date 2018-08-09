export class Employee {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  skill: string;
  address: Address[];
  contact: Contact[];
}

export class Address {
  homeaddress: string;
}

export class Contact {
  homenumber: string;
}
