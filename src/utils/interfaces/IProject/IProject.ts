export interface IProject {
  id: number;
  name: string;
  createdBy: object;
  createdDate: string;
  doneby: object;
  leadSource: object[];
  location: object;
  modifiedBy: object;
  modifiedDate: object;
  projectPhase: object;
  // tags: List<object>;
  status: number;
  keyContacts: object;
  collaborators: any;
}