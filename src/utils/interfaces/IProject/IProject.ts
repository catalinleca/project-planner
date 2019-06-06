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
  dueDate: any;
  sprint: number;

  tasks: any; // possible
}

export const projectBase = {
  name: null,
  createdBy: null,
  createdDate: null,
  leadSource: null,
  modifiedBy: null,
  modifiedDate: null,
  projectPhase: null,
  status: null,
  keyContacts: [],
  dueDate: null,
  sprint: null,
  tasks: []
}

// name
// lead sources
// due date
// key contacts
// tasks
