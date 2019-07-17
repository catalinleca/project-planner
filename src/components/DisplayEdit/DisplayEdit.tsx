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
  label?: string,
}

interface IDisplayEditComponentProps {
  edit: boolean;
  displayValue: any
  component: any
  fieldProps: IFieldProps
  textProps?: any;
  componentProps?: any
}

//from state
interface IDisplayEditProps extends IDisplayEditComponentProps {
}

type DisplayEditType = IDisplayEditProps & WithStyles<keyof ReturnType<typeof styles>>;

interface IShowContent {
  displayValue: any
  textProps?: any;
}

const ShowContent: React.FC<IShowContent> = ({displayValue, textProps}) => (
  React.isValidElement(displayValue)
  ? displayValue
  : (
      <Typography color='inherit' variant='body2' {...textProps}>
        {displayValue}
      </Typography>
    )
)

const DisplayEdit: React.FC<DisplayEditType> = (props) => {
  const {
    edit,
    displayValue,
    component,
    fieldProps,
    componentProps,
    textProps
  } = props;

  // console.log('DisplayEdit: ',props);

  return edit
    ? (
      <Field
        component={component}
        {...fieldProps}
        props={{
          // value: displayValue,
            ...componentProps
        }}
      />
    )
    : (<ShowContent
      displayValue={displayValue}
      textProps={textProps}
    />)
}

export default compose<React.ComponentClass<IDisplayEditComponentProps>>(
  withStyles(styles),
)(DisplayEdit);


