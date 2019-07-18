import * as React from 'react';
import {
  Button,
  Grid, IconButton,
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
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import FieldTextField from "../../../components/FieldTextField/FieldTextField";
import FieldReactSelect from "../../../components/FieldReactSelect/FieldReactSelect";
import FieldDatePicker from "../../../components/FieldDatePicker/FieldDatePicker";
import {connect} from "react-redux";
import {AddTaskToProjectAction, CreateProjectAction} from "../../../store/action";
import {createStructuredSelector} from "reselect";
import {makeSelectFirestoreOrderedData, makeSelectSelectedProject} from "../../../store/selectors";
import TaskPictures from "../../../components/TaskPictures/TaskPictures";
import UploadPicture from "../../../components/UploadPicture/UploadPicture";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Dropzone from "react-dropzone";
import ModalImage from "../../../components/ModalImage/ModalImage";
import DisplayPictures from "../../../components/DisplayPictures/DisplayPictures";

const styles = (theme: Theme): StyleRules => ({
  root: {},

});

interface IAddNewTaskFormComponentProps {
  handleSubmit?: any;
  users?: any;
  handleSelectChange?: any;
  onSubmit?: any;
  addTaskToProject?: any
  selectedProjectId?: any
  gridProps?: any;
  handlePictureChange?: any;
  removePictureItem?: any;
  emptyPicturesArray?: any;
  pictures?: any;
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
    handleSelectChange,
    gridProps
  } = props;

  const onSubmit = (taskData) => {
    const {
      addTaskToProject,
      selectedProjectId,
      emptyPicturesArray
    } = props;

    console.log('taskData: ', taskData);
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
      pictures: [...props.pictures]
    }

    console.log(taskData.pictures)
    console.log('newTaskData: ', newTaskData);
    addTaskToProject(newTaskData, selectedProjectId);
    emptyPicturesArray()
  }

  const displayCurrentPictures = (
    <Grid
      container={true}
      direction='row'
      alignItems='center'
      style={{width: '100%', marginBottom: '8px'}}
    >
      {props.pictures.map( (value, index) => {
        console.log(value.name);
        return (
          <Grid
            item={true}
            key={`${index}${value}`}
          >

            <Grid
              container={true}
              direction='column'
              justify='center'
              alignItems='center'
              className={props.classes.pictureItem}
            >
              <IconButton
                onClick={(index) => props.removePictureItem(index)}
              >
                <FontAwesomeIcon
                  icon='times'
                  size='xs'
                />
              </IconButton>
              <ModalImage
                picture={value}
              />
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )

  return (
    <form onSubmit={props.handleSubmit(onSubmit)}>
      <Grid
        container={true}
        alignItems='center'
        direction='column'
      >

      <Grid
        item={true}
        container={true}
        xs={8}
      >
        <Field
          name='title'
          component={FieldTextField}
          label='Task Title'
          formControlProps={{
            fullWidth: true
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
              ...user,
            })),
            placeholder: 'Assign User'
          }}
          formControlProps={{
            fullWidth: true
          }}
        />
        <Field
          name='dueDate'
          component={FieldDatePicker}
          label='Task Due Date'
          formControlProps={{
            fullWidth: true
          }}
          style={{
            marginBottom: '16px'
          }}
        />
        <Field
          name='description'
          component={FieldTextField}
          label='Provide more details about the task'
          props={{
            multiline: true,
            rowsMax: '4',
            rows: '4',
            variant: 'outlined',
            style: {
              zIndex: '0'
            }
          }}
          formControlProps={{
            fullWidth: true
          }}
        />
        <Grid>
          <DisplayPictures
            pictures={props.pictures}
            removePictureItem={props.removePictureItem}
          />
          <Field
            name='pictures'
            component={UploadPicture}
            label='Daca merge ma cac'
            type='file'
            onChange={props.handlePictureChange}
          />
        </Grid>
      </Grid>
      </Grid>

      <Grid
        container={true}
        direction='row-reverse'
      >
        <Button
          type='submit'
          color='secondary'
          variant='contained'
          style={{
            margin: '16px'
          }}
        >
          Create The Task
        </Button>
      </Grid>
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