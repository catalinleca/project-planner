import {ProjectPhase} from "../../types/types";

export interface IProject {
  id: number;
  name: string;
  createdBy: object;
  createdDate: string;
  leadSources: object[]; // vedem daca doar stringuri sau useri
  modifiedBy: object;
  modifiedDate: object;
  projectPhase: ProjectPhase; // initial planning execution closure
  // tags: List<object>;
  keyContacts: object[];
  dueDate: any;
  sprint: number;

  tasks: any; // possible, MNUUU
}

export const projectBase = {
  name: null,
  createdBy: null,
  createdDate: null,
  leadSources: null, // id first name last name
  modifiedBy: null,
  modifiedDate: null,
  projectPhase: 'beginning',
  status: null,
  keyContacts: [],
  dueDate: null,
  sprint: 1,
  tasks: [] // MNU
}

// name
// lead sources
// due date
// key contacts
// tasks


/** for project info section
 * 
 *  ProjectsPhase
 *
 *  Sprint
 *  createdBy
 *  createdDate
 *  dueDate - special styling
 *
 *  LeadSource
 */