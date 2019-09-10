export const required = value => value ? undefined : 'Required'
export const trueOrFalse = value => {
  console.log('value: ', value);

  if(value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
    return undefined
  } else {
    return 'Should be True or False'
  }
}
export const minLength = value => value && value.length < 6 ? `Password must have minimum 6 characters` : undefined
