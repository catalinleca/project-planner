import * as React from 'react';
import {
  Grid,
  Theme, Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import { Field } from 'redux-form';
import FieldTextField from "../FieldTextField/FieldTextField";
import FieldDatePicker from "../FieldDatePicker/FieldDatePicker";
import {TextFieldProps} from "@material-ui/core/TextField";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IFieldProps {
  name: string,
  label: string,
}

interface IDisplayEditComponentProps {
  edit: boolean;
  displayValue: any
  component: any
  fieldProps: IFieldProps
  componentProps?: TextFieldProps
}

//from state
interface IDisplayEditProps extends IDisplayEditComponentProps {
}

type DisplayEditType = IDisplayEditProps & WithStyles<keyof ReturnType<typeof styles>>;

const DisplayEdit: React.FC<DisplayEditType> = (props) => {
  const {
    edit,
    displayValue,
    component,
    fieldProps,
    componentProps
  } = props;

  console.log('DisplayEdit: ',props);
  return edit
    ? (
      <Field
        component={component}
        props={{
          // value: displayValue,
            ...componentProps
        }}
        {...fieldProps}
      />
    )
    : (
      <Typography color='inherit' variant='body2'>
        {displayValue}
      </Typography>
    );
}

export default compose<React.ComponentClass<IDisplayEditComponentProps>>(
  withStyles(styles),
)(DisplayEdit);


