export default class {
  constructor (
    public id: number,
    public name: string,
    public createdBy: object,
    public createdDate: string,
    public doneby: object,
    public leadSource: object[],
    public location: object,
    public modifiedBy: object,
    public modifiedDate: object,
    public projectPhase: object,
    // public // tags: List<object>,
    public status: number,
    public keyContacts: object
  ) { }
}