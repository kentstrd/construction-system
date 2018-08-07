export class Employee {
  employee = {
    firstName: {
      label: 'Firstname',
      value: 'Alfred',
      type: 'text'
    },
    lastName: {
      label: 'Lastname',
      value: 'Carro',
      type: 'text'
    },
    birthDate: {
      label: 'BirthDate',
      value: '1/20/2018',
      type: 'text'
    },
    Gender: {
      label: 'Gender',
      value: 'M',
      type: 'radio',
      options: [{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]
    },
    skills: {
      label: 'Skills',
      value: '',
      type: 'select',
      options: [
        { label: '(choose one)', value: '' },
        { label: 'Smart', value: 'smart' },
        { label: 'Athletic', value: 'athletic' },
        { label: 'Motivator', value: 'motivator' }
      ]
    },
    contact: {
      label: 'Contact',
      value: '09202110922',
      type: 'number'
    },
    address: {
      label: 'Address',
      value: 'Pasay',
      type: 'text'
    }
  };
}
