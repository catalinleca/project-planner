export const required = value => value ? undefined : 'Required'
export const minLength = value => value && value.length < 6 ? `Password must have minimum 6 charaters` : undefined