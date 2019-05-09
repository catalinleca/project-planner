export enum ActionTypes {
	FIRST_ACTION = 'FIRST_ACTION'
}

export class FirstAction {
	public readonly type = ActionTypes.FIRST_ACTION;

	constructor(
		public payload?: any
	) {}
}
