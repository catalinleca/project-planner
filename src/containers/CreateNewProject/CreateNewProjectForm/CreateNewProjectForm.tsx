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
import {required} from "../../../utils/validators/validators";

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
  loggedInUserId?: any
  currentUserSignedUpBy?: any;
}

//from state
interface ICreateNewProjectFormProps extends ICreateNewProjectFormComponentProps {
}

type CreateNewProjectFormType = ICreateNewProjectFormProps & WithStyles<keyof ReturnType<typeof styles>>;

const CreateNewProjectForm: React.FC<CreateNewProjectFormType> = (props) => {

  const {
    selectedLeads,
    users,
    handleSelectChange,
    currentUserSignedUpBy,
    loggedInUserId
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
          alignItems='flex-start'
        >
          <Grid
            item={true}
            container={true}
            xs={8}
          >
            <Field
              name='name'
              component={FieldTextField}
              label='Project Name'
              formControlProps={{
                fullWidth: true
              }}
              validate={[required]}
            />
            <Field
              name='dueDate'
              component={FieldDatePicker}
              label='Project Due Date'
              formControlProps={{
                fullWidth: true
              }}
              validate={[required]}
            />
            <Field
              name='leadSources'
              component={FieldReactSelect}
              props={{
                label: 'Select your leads',
                isMulti: true,
                // value: this.state.selectedValues,
                onChange: handleSelectChange,
                options: users.filter((user, index) => user && user.isAdmin &&  (
                  !currentUserSignedUpBy
                    ? user.signedUpBy === loggedInUserId || user.id === loggedInUserId
                    : user.signedUpBy === currentUserSignedUpBy || user.id === currentUserSignedUpBy
                )).map(user => ({
                  label: [user.firstName, user.lastName].join(' '),
                  value: user.id,
                  ...user
                }))
              }}
              validate={[required]}
              formControlProps={{
                fullWidth: true
              }}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default compose<React.ComponentClass<ICreateNewProjectFormComponentProps>>(
  reduxForm({
    form: 'newProject'
  }),
  withStyles(styles),
)(CreateNewProjectForm);