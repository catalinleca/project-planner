export type UserProps =
  'id' |
  'email' |
  'firstName' |
  'jobTitle' |
  'lastName' |
  'mobilePhone' |
  'username' |
  'password' |
  'registeredDate' |
  'isAdmin' |
  'signedUpBy' |
  'trackedProjects' |
  'avatar'

export interface IUser {
  id: string;
  email: any;
  firstName: any;
  jobTitle: any;
  lastName: any;
  mobilePhone: any;
  username: any;
  password: any;
  registeredDate: any;
  isAdmin: boolean;
  signedUpBy: string;
  trackedProjects: string[]
  avatar: string;
}

export const userBase = {
  // id: null,
  email: null,
  firstName: null,
  jobTitle: null,
  lastName: null,
  mobilePhone: null,
  username: null,
  password: null,
  registeredDate: null,
  isAdmin: false,
  signedUpBy: '',
  trackedProjects: [],
  avatar: null,
  // hai sa facem adminul contul companiei
}
