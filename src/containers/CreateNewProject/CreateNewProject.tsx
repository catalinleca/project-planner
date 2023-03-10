import * as React from 'react';
import {
  Theme,
  withStyles,
  WithStyles,
  Grid,
  SwipeableDrawer,
  Button,
  Stepper,
  Step, StepLabel, StepContent
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
import {makeSelectFirestoreOrderedData, makeSelectProjects, makeSelectSelectedProject} from "../../store/selectors";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  fullHeight: {
    height: '100%'
  }
});

interface ICreateNewProjectComponentProps {
  // onSubmit?: any;
}

//from state
interface ICreateNewProjectProps extends ICreateNewProjectComponentProps {
  users: any;
  selectedProjectId: any;
}

type CreateNewProjectType = ICreateNewProjectProps & InjectedFormProps & WithStyles<keyof ReturnType<typeof styles>>;

interface IStateProps {
  open: boolean;
  selectedLeads: any;
  activeStep: number;
  assignedTo: any;
  newCreatedProjectId: string;
}



class CreateNewProject extends React.Component<CreateNewProjectType, {}> {
  public state: IStateProps = {
    open: false,
    selectedLeads: [],
    assignedTo: null,
    activeStep: 0,
    newCreatedProjectId: ''
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

  public handleNext = () => this.setState( prevState => ({
    ...prevState,
    activeStep: this.state.activeStep + 1
  }))

  public getStepContent = (step: number) => {
    switch(step) {
      case 0:
        return <CreateNewProjectForm
          onSubmit={this.handleCreateNewProject}
          selectedLeads={this.state.selectedLeads}
          users={this.props.users}
          handleSelectChange={this.handleSelectChangeLeads}
          handleClose={() => this.setState({open: false})}
        />;
      case 1:
        return <AddNewTaskForm
          users={this.props.users}
          handleSelectChange={this.handleChangeAssignedUser}
          onSubmit={this.handleCreateNewTask}
        />
    }
  }

  public getSteps = () => ['Add your project details', 'Insert Tasks'];

  render() {
    const {
      classes,
      users
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
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          onOpen={() => this.setState({open: true})}
          classes={{
            paper: classes.fullHeight
          }}
        >
          {
            users &&
              <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map( (label, index) => (
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
                ))}
              </Stepper>
          }
        </SwipeableDrawer>
        <Button
          onClick={() => this.setState({open: true})}
          variant='outlined'
          color='primary'
        >
          Create A New Project
        </Button>
      </React.Fragment>
    );
  }
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

export default compose<React.ComponentClass<ICreateNewProjectComponentProps>>(

  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CreateNewProject);
