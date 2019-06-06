export interface IUser {
  id: number;
  email:	any;
  firstName: any;
  jobTitle: any;
  lastName: any;
  mobilePhone: any;
  userhash: any;
  username: any;
  verified: any;

  tasks: any; // possible, we ll see
}

export const userBase = {
  id: null,
  email: null,
  firstName: null,
  jobTitle: null,
  lastName: null,
  mobilePhone: null,
  userhash: null,
  username: null,
  verified: null,
  tasks: null
}