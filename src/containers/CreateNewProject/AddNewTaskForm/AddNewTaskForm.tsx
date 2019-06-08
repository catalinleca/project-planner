import * as React from 'react';
import {
  Button,
  Grid,
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
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import FieldTextField from "../../../components/FieldTextField/FieldTextField";
import FieldReactSelect from "../../../components/FieldReactSelect/FieldReactSelect";
import FieldDatePicker from "../../../components/FieldDatePicker/FieldDatePicker";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IAddNewTaskFormComponentProps {
  handleSubmit?: any;
  users?: any;
  handleSelectChange?: any;
  onSubmit?: any;
}

//from state
interface IAddNewTaskFormProps extends IAddNewTaskFormComponentProps {
}

/**
 * nume, descriere, user, dueDate
 */
type AddNewTaskFormType = IAddNewTaskFormProps & WithStyles<keyof ReturnType<typeof styles>>;

const AddNewTaskForm: React.FC<AddNewTaskFormType> = (props) => {
  const {
    users,
    handleSelectChange
  } = props;
  return (
    <form onSubmit={props.handleSubmit}>
      <Grid
        container={true}
        direction='column'
      >
        <Field
          name='title'
          component={FieldTextField}
          label='Task Title'
        />
        <Field
          name='description'
          component={FieldTextField}
          label='Provide more details about the task'
          props={{
            multiline: true,
            rowsMax: '4'
          }}
        />
        <Field
          name='assignedTo'
          component={FieldReactSelect}
          props={{
            label: 'Assigned User',
            isMulti: false,
            // value: this.state.selectedValues,
            onChange: handleSelectChange,
            options: users.map(user => ({
              label: [user.firstName, user.lastName].join(' '),
              value: user.id,
              ...user
            }))
          }}
        />
        <Field
          name='dueDate'
          component={FieldDatePicker}
          label='Task Due Date'
        />

      </Grid>
      <Button
        type='submit'
      >
        Submit
      </Button>
    </form>
  );
}

export default compose<React.ComponentClass<IAddNewTaskFormComponentProps>>(
  withStyles(styles),
  reduxForm({
    form: 'createNewTask'
  }),
)(AddNewTaskForm);