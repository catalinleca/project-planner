export interface IUser {
  id: number;
  email:	any;
  firstName: any;
  jobTitle: any;
  lastName: any;
  mobilePhone: any;
  username: any;
  password: any;
  registeredDate: any;
  isAdmin: boolean;
  signedUpBy: string;
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
  // hai sa facem adminul contul companiei
}
