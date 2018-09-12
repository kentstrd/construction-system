export class Project {
    id: string;
    projectName: string
    description: string
    dateStarted: string
    dateEnded: string
    projectType: string
    address:{
      province: string
      municipality: string
      barangay: string
    }
    costDetails:{
      totalCost: string
      disbursement: disbursement[]
    }
  }

  export class disbursement {
    cost: string
    date: string
  }
