import * as React from 'react';
import {
  FormControl, FormHelperText, TextField,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import {
  WrappedFieldProps,
} from 'redux-form';

export interface IFieldTextFieldComponentProps {
  formControlProps?: object;
  inputProps?: {
    [key: string]: any
  };
  label?: string;
}

//from state
interface IFieldTextFieldProps extends IFieldTextFieldComponentProps {
}

type FieldTextFieldType = IFieldTextFieldProps & WrappedFieldProps;

const FieldTextField: React.FC<FieldTextFieldType> = (props) => {
  const {
    input,
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
    formControlProps = {},
    ...rest
  } = props;

  // console.log('FieldTextField: ', props);
  return (
    <FormControl error={touched && (error != null)} {...formControlProps} >
      <TextField
        label={label}
        {...input}
        {...rest}
      />
      <FormHelperText id='helper-text'>{touched && (error || warning)}</FormHelperText>
    </FormControl>
  );
}

export default compose<React.ComponentClass<IFieldTextFieldComponentProps>>(
)(FieldTextField);