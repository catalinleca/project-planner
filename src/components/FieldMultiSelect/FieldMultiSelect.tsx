import * as React from 'react';
import {
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  Theme,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@material-ui/core';
import {
  compose,
} from 'redux';
import {
  WrappedFieldProps,
} from 'redux-form';

export interface IFieldMultiSelectComponentProps {
  formControlProps?: object;
  input?: object;
  label?: string;
  names: string[];
  value: Array<string>;
}

//from state
interface IFieldMultiSelectProps extends IFieldMultiSelectComponentProps {
}

type FieldMultiSelectType = IFieldMultiSelectProps & WrappedFieldProps;

const FieldMultiSelect: React.FC<FieldMultiSelectType> = (props) => {
  const {
    // input,
    label,
    meta: {
      error,
      touched,
      warning
    } = {
      error: undefined,
      touched: undefined,
      warning: undefined,
    },
    handleSelectChange,
    formControlProps = {},
    // value,
    values,
    inputProps,
    ...rest
  } = props;
  console.log('--- props: ', props);
  console.log( typeof props.selectedLeads)
  const {
    value
  } = inputProps;

  console.log('rest: ', rest)
  console.log('inputProps: ', inputProps)
  return (
    <FormControl error={touched && (error != null)} {...formControlProps}>
      <InputLabel htmlFor="select-multiple-checkbox">Name</InputLabel>
      <Select
        multiple={true}
        input={<Input id="select-multiple-checkbox" />}
        renderValue={selected => (selected as string[]).join(', ')}
        {...inputProps}
      >
        {
          values.map((name: string) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={value.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default compose<React.ComponentClass<IFieldMultiSelectComponentProps>>(
)(FieldMultiSelect);
