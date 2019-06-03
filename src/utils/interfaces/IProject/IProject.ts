export interface IProject {
  id: number;
  name: string;
  createdBy: object;
  createdDate: string;
  leadSource: object[]; // vedem daca doar stringuri sau useri
  modifiedBy: object;
  modifiedDate: object;
  projectPhase: object;
  // tags: List<object>;
  status: any;
  keyContacts: object[];
  dueData: any;
  sprint: number;

  tasks: any; // possible
}

// name
// lead sources
// due date
// key contacts
// tasks
