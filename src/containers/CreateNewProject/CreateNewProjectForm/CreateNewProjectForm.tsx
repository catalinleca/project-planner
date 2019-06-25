import * as React from 'react';
import {
  Theme,
  withStyles,
  WithStyles,
  Grid,
  Button
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import FieldTextField from "../../../components/FieldTextField/FieldTextField";
import {Field, reduxForm} from 'redux-form'
import FieldDatePicker from "../../../components/FieldDatePicker/FieldDatePicker";
import FieldReactSelect from "../../../components/FieldReactSelect/FieldReactSelect";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface ICreateNewProjectFormComponentProps {
  handleSubmit?: any;
  onSubmit?: any
  selectedLeads?: any
  users?: any
  handleSelectChange?: any
  handleClose?: any
}

//from state
interface ICreateNewProjectFormProps extends ICreateNewProjectFormComponentProps {
}

type CreateNewProjectFormType = ICreateNewProjectFormProps & WithStyles<keyof ReturnType<typeof styles>>;

const CreateNewProjectForm: React.FC<CreateNewProjectFormType> = (props) => {

  const {
    // handleSubmit,
    selectedLeads,
    users,
    handleSelectChange,
    handleClose
  } = props;

  return (
    <Grid
      container={true}
      direction='column'
    >
      <form onSubmit={props.handleSubmit}>
        <Grid
          container={true}
          direction='column'
        >
          <Field
            name='name'
            component={FieldTextField}
            label='Project Name'
          />
          <Field
            name='dueDate'
            component={FieldDatePicker}
            label='Project Due Date'
          />
          <Field
            name='leadSources'
            component={FieldReactSelect}
            props={{
              label: 'Select your leads',
              isMulti: true,
              // value: this.state.selectedValues,
              onChange: handleSelectChange,
              options: users.map(user => ({
                label: [user.firstName, user.lastName].join(' '),
                value: user.id,
                ...user
              }))
            }}
          />
        </Grid>
        <Button
          type='submit'
        >
          Submit
        </Button>

      </form>
      <Grid>
        <Button
          onClick={handleClose}
        >
          close
        </Button>
      </Grid>
    </Grid>
  );
}

export default compose<React.ComponentClass<ICreateNewProjectFormComponentProps>>(
  reduxForm({
    form: 'newProject'
  }),
  withStyles(styles),
)(CreateNewProjectForm);