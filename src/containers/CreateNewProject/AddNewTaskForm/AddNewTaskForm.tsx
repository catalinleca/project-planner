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
import {connect} from "react-redux";
import {AddTaskToProjectAction, CreateProjectAction} from "../../../store/action";
import {createStructuredSelector} from "reselect";
import {makeSelectFirestoreOrderedData, makeSelectSelectedProject} from "../../../store/selectors";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IAddNewTaskFormComponentProps {
  handleSubmit?: any;
  users?: any;
  handleSelectChange?: any;
  onSubmit?: any;
  addTaskToProject?: any
  selectedProjectId?: any
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

  const onSubmit = (taskData) => {
    const {
      addTaskToProject,
      selectedProjectId
    } = props;

    const newTaskData = {
      ...taskData,
      dueDate: taskData.dueDate
        ? new Date(taskData.dueDate).toString()
        : null,
      assignedTo: {
        id: taskData.assignedTo.id,
        firstName: taskData.assignedTo.firstName,
        lastName: taskData.assignedTo.lastName
      },
    }
    console.log('newTaskData: ', newTaskData);
    addTaskToProject(newTaskData, selectedProjectId);
  }

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
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

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    createProject: (project) => {
      dispatch(CreateProjectAction(project))
    },
    addTaskToProject: (task, projectId) => {
      dispatch(AddTaskToProjectAction(task, projectId))
    },
  };
}

const mapStateToProps = createStructuredSelector({
  selectedProjectId: makeSelectSelectedProject(),
  users: makeSelectFirestoreOrderedData('users')
})

export default compose<React.ComponentClass<IAddNewTaskFormComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'createNewTask'
  }),
)(AddNewTaskForm);