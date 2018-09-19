export class Employee {
  id: string;
  fullname: { firstName: string; lastName: string };
  gender: string;
  skill: string;
  addresses: Addresses[];
  contacts: Contacts[];
}

export class Addresses {
  homeaddress: string;
}

export class Contacts {
  homenumber: string;
}
