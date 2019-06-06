import * as React from 'react';
import {
  FormControl,
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
import * as moment from 'moment';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

interface IFieldDatePickerComponentProps {
  formControlProps?: object;
  inputProps?: object;
  label?: string;
  placeholder?: string;
  labelProps?: object;
  datePickerProps?: object;
  meta?: object;
}

//from state
interface IFieldDatePickerProps extends IFieldDatePickerComponentProps {
}

type FieldDatePickerType = IFieldDatePickerProps & WrappedFieldProps;

const renderLabel = (date) => {
  // console.debug(date.isValid());
  if (date && date.isValid()) {
    return date.format();
  }
  return '';
};

const FieldDatePicker: React.FC<FieldDatePickerType> = (props) => {
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
    placeholder,
    mask,
    formControlProps = {},
    datePickerProps = {},
    ...rest
  } = props;
  return (
    <FormControl error={touched && (error != null)} {...formControlProps} >
      <MuiPickersUtilsProvider
        utils={MomentUtils}
        moment={moment}
      >
        <DatePicker
          helperText={null}
          error={touched && (error != null)}
          // END HACKY OVERRIDE PROPS

          label={label}
          placeholder={placeholder}
          mask={mask}
          keyboard={true}
          clearable={true}
          format='YYYY-MM-DD'
          labelFunc={renderLabel}
          leftArrowIcon={
            <FontAwesomeIcon
              icon='chevron-left'
            />
          }
          rightArrowIcon={
            <FontAwesomeIcon
              icon='chevron-right'
            />
          }
          keyboardIcon={
            <FontAwesomeIcon
              icon='calendar-alt'
            />
          }
          {...input}
          {...rest}
        />
      </MuiPickersUtilsProvider>
    </FormControl>
    );
}

export default compose<React.ComponentClass<IFieldDatePickerComponentProps>>(
)(FieldDatePicker);