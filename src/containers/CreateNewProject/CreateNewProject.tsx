import * as React from 'react';
import {
  Theme,
  withStyles,
  WithStyles,
  Grid,
  SwipeableDrawer,
  Button,
  Stepper,
  Step, StepLabel, StepContent, AppBar, Toolbar, Typography, IconButton
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {IUser} from "../../utils/interfaces/IUser/IUser";
import CreateNewProjectForm from "./CreateNewProjectForm/CreateNewProjectForm";
import {AddTaskToProjectAction, CreateProjectAction, DeleteProjectAction, GetProjectsAction} from "../../store/action";
import AddNewTaskForm from "./AddNewTaskForm/AddNewTaskForm";
import {createStructuredSelector} from "reselect";
import {makeSelectFirestoreOrderedData, makeSelectSelectedProject} from "../../store/selectors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Simulate} from "react-dom/test-utils";
import { submit, reset } from 'redux-form';

const styles = (theme: Theme): StyleRules => ({
  root: {},
  fullHeight: {
    height: '100%'
  }
});

interface ICreateNewProjectComponentProps {
  // onSubmit?: any;
  isOpen: boolean,
  setOpen: any,
}

//from state
interface ICreateNewProjectProps extends ICreateNewProjectComponentProps {
  users: any;
  selectedProjectId: any;
  dispatch: any;
}

type CreateNewProjectType = ICreateNewProjectProps & InjectedFormProps & WithStyles<keyof ReturnType<typeof styles>>;

interface IStateProps {
  open: boolean;
  selectedLeads: any;
  activeStep: number;
  assignedTo: any;
  newCreatedProjectId: string;
  picturesAsFile: [];
}



class CreateNewProject extends React.Component<CreateNewProjectType, {}> {
  public state: IStateProps = {
    open: false,
    selectedLeads: [],
    assignedTo: null,
    activeStep: 0,
    newCreatedProjectId: '',
    picturesAsFile: []
  }

  public handleCreateNewProject = (projectData) => {
    console.log(projectData);
    const newProjectData = {
      ...projectData,
      dueDate: projectData.dueDate
        ? new Date(projectData.dueDate).toString()
        : null,
      leadSources: projectData.leadSources.map( leadSource => ({
        id: leadSource.id,
        firstName: leadSource.firstName,
        lastName: leadSource.lastName
      }))
    }
    console.log(newProjectData);
    this.props.createProject(newProjectData);
  }

  public handleCreateNewTask = (taskData) => {
    const {
      addTaskToProject,
      selectedProjectId
    } = this.props;

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
    console.log('-----before');
  }

  public handleSelectChangeLeads = (users?: IUser) => {
    console.log(users);
   this.setState({
     selectedLeads: users
   })
  }

  public handleChangeAssignedUser = (user?: IUser) => {
    // console.log('user: ', user);
    this.setState({
      assignedTo: user
    })
  }

  public handleBack = () => this.setState( prevState => ({
    ...prevState,
    activeStep: this.state.activeStep - 1
  }))

  public handleNext = () => {
    const steps = this.getSteps()
    console.log('steps: ', steps);
    console.log('steps.length: ', steps.length - 1 );
    console.log('this.state.activeStep: ', this.state.activeStep)
    if (this.state.activeStep === steps.length - 1) {
      this.setState({
        activeStep: 0
      })
      this.props.setOpen(false)
    } else {
      this.props.dispatch(submit('newProject'));
      this.setState( prevState => ({
        ...prevState,
        activeStep: this.state.activeStep + 1
      }))
    }
  }

  public handleEditAddPicture = e => {
    const files = e.target.files
    this.setState({
      picturesAsFile: [
        ...this.state.picturesAsFile,
        ...files
      ]
    })
  }

  public handleRemovePictures = (index) => {
    const newPicturesAsFile = [...this.state.picturesAsFile]
    newPicturesAsFile.splice(index, 1);
    console.log('newPicturesAsFile: ', newPicturesAsFile)
    this.setState({picturesAsFile: newPicturesAsFile})
  }

  public emptyPicturesArray = () => {
    this.setState({picturesAsFile: []})
  }

  public getStepContent = (step: number) => {
    switch(step) {
      case 0:
        return <CreateNewProjectForm
          onSubmit={this.handleCreateNewProject}
          selectedLeads={this.state.selectedLeads}
          users={this.props.users}
          handleSelectChange={this.handleSelectChangeLeads}
        />;
      case 1:
        return <AddNewTaskForm
          users={this.props.users}
          handleSelectChange={this.handleChangeAssignedUser}
          onSubmit={this.handleCreateNewTask}
          gridProps={{
            alignItems: 'flex-start'
          }}
          handleAddPicture={this.handleEditAddPicture}
          removePictureItem={this.handleRemovePictures}
          emptyPicturesArray={this.emptyPicturesArray}
          picturesAsFile={this.state.picturesAsFile}
        />
    }
  }

  public setOpenTrue = () => this.setState({open: true})

  public getSteps = () => ['Add your project details', 'Insert Tasks'];

  public handleClose = () => {
    this.setState({open: false})
  }


  render() {
    const {
      classes,
      users,
      setOpen,
      isOpen
    } = this.props;

    const {
      activeStep
    } = this.state;
    // console.log('currentProps: ', this.props.users);

    const steps = this.getSteps();

    return (
      <React.Fragment>
        <SwipeableDrawer
          anchor="bottom"
          open={isOpen}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          classes={{
            paper: classes.fullHeight
          }}
        >
          {
            users &&
              <Grid>
                <AppBar
                  position='static'
                  color='primary'
                >
                  <Toolbar>
                    <Grid
                      container={true}
                      alignItems='center'
                      justify='space-between'
                    >
                      <Typography variant='h4' color='inherit'>
                        Create A New Project
                      </Typography>
                      <IconButton onClick={() => setOpen(false)} color='inherit'>
                        <Typography color='inherit'>
                            <FontAwesomeIcon
                                icon='times'
                                size='2x'
                            />
                        </Typography>
                      </IconButton>
                    </Grid>
                  </Toolbar>
                </AppBar>
                <Stepper activeStep={activeStep} orientation='vertical'>
                  {steps.map( (label, index) => {
                    return (
                    <Step key={`${label}${index}`}>
                      <StepLabel>{label}</StepLabel>
                      <StepContent>
                        {this.getStepContent(index)}
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                        >
                          Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Create The Project'}
                        </Button>
                      </StepContent>
                    </Step>
                  )})}
                </Stepper>
              </Grid>
          }
        </SwipeableDrawer>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    dispatch,
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

export default compose<React.ComponentClass<ICreateNewProjectComponentProps>>(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CreateNewProject);
