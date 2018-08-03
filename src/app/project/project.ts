export class Project {
    id: string;
    projectProfile: {
        projectName: string
        description: string
        dateStarted: Date
        dateEnded: Date
    }
    projectCost: {
        totalCost: number
        disbursement:  {
            cost: string
            date: Date
        }
    }
  }

  export class ViewProject {
    projectProfile: {
        projectName: string
        description: string
        dateStarted: Date
        dateEnded: Date
    }
    projectCost: {
        totalCost: number
        disbursement:  {
            cost: string
            date: Date
        }
    }
  }
  