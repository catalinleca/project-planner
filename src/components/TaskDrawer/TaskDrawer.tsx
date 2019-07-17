import * as React from 'react';
import {
  AppBar,
  Drawer,
  Grid,
  Theme,
  withStyles,
  WithStyles,
  Toolbar,
  Typography, TextField, Button, Menu, MenuItem

} from '@material-ui/core';
import {Field, reduxForm} from 'redux-form';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import {connect} from "react-redux";
import {
  ChangeTaskProjectAction, ChangeTaskStatusAction,
  closeTaskDrawerAction,
  CreateProjectAction,
  doTheThingAction,
  FirstAction
} from "../../store/action";
import {createStructuredSelector} from "reselect";
import {
  makeSelectDataById, makeSelectFirestoreOrderedData,
  makeSelectSelectedTask,
  makeSelectTaskDrawerOpen,
  selectReducerState
} from "../../store/selectors";
import DisplayEdit from "../DisplayEdit/DisplayEdit";
import FieldTextField from "../FieldTextField/FieldTextField";
import {firestoreConnect} from "react-redux-firebase";
import StatusChip from "../StatusChip/StatusChip";
import {taskStatusValues} from "../../utils/constants";
import FieldReactSelect from "../FieldReactSelect/FieldReactSelect";
import FieldDatePicker from "../FieldDatePicker/FieldDatePicker";
import AddNewTaskForm from "../../containers/CreateNewProject/AddNewTaskForm/AddNewTaskForm";
import classnames from 'classnames';

const styles = (theme: Theme): StyleRules => ({
  root: {},
  container: {
    width: '400px',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: '800px',
    }
  },
  drawerBodyContainer: {
    padding: '24px'
  },
  marginRight: {
    marginRight: '8px'
  },
  selectAssigned: {
    // width: '100%'
  },
  fieldData: {
    marginBottom: '12px'
  },
  descriptionField: {
    marginLeft: '2px'
  }
});

interface ITaskDrawerComponentProps {
  onSubmit: any
}

//from state
interface ITaskDrawerProps extends ITaskDrawerComponentProps {
  taskDrawerOpen: boolean
  closeDrawer: any;
  task: any;
  changeTaskProject: any;
  projects: any;
  changeTaskStatus: any;
  selectedTaskId: any;
  handleSubmit: any;
  users: any;
  createdByUser: any;
}

type TaskDrawerType = ITaskDrawerProps & WithStyles<keyof ReturnType<typeof styles>>;

interface ITaskDrawerState {
  edit: boolean;
}

const WithLabel: React.FC<any> = ({children, label, show = true}) => {
  return(
    <Grid
      container={true}
      direction='column'
      alignItems='flex-start'
      style={{
        marginBottom: '12px'
      }}
    >
      {show && <Typography variant='caption'>{label}</Typography>}
      {children}
    </Grid>
  )
}

class TaskDrawer extends React.Component<TaskDrawerType, {}> {
  public state = {
    edit: false,
    projectAnchorEl: null,
    taskStatusAnchorEl: null,
    pictures: []
  }

  public handlePictureChange = (e) => {
    this.setState({
      pictures: [
        ...this.state.pictures,
        ...e.target.files
      ]
    })
  }

  public removePictureItem = (index) => {
    const newPictures = [...this.state.pictures]
    newPictures.splice(index, 1);

    this.setState({pictures: newPictures})
  }

  public handleClick = () => {
    this.setState({
      type: 'input'
    })
  }

  public toggleEdit = () => {
    this.setState((prevState: ITaskDrawerState) => ({
      edit: !prevState.edit
    }))
  }

  public handleProjectMenuClose = () => {
    this.setState({projectAnchorEl: null})
  }

  public handleProjectMenuOpen = (e) => {
    this.setState({projectAnchorEl: e.currentTarget})
  }

  public handleProjectMenuClick = (projectName, projectId) => {
    const {
      changeTaskProject
    } = this.props;

    changeTaskProject(projectName, projectId)
    this.setState({projectAnchorEl: null})

  }

  public onChangeTaskStatus = (status) => {
    const {
      changeTaskStatus,
      selectedTaskId
    } = this.props
    // this.props.changeTaskStatus(this.props.selectedTaskId, status);
    changeTaskStatus(selectedTaskId, status);
    this.setState({taskStatusAnchorEl: null});

  }

  public handleTaskStatusOpen = event => {
    this.setState({taskStatusAnchorEl: event.currentTarget});
  };

  public handleTaskStatusClose = () => {
    this.setState({taskStatusAnchorEl: null});
  };

  public formatStringDate = (date: any) => {
    if (date) {
      const newDate = new Date(date)
      return newDate.getDate() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getFullYear()
    } else {
      return null
    }
  }

  public emptyPicturesArray = () => {
    this.setState({pictures: []})
  }

  public getCreatedByName = () => {
    const {
      createdByUser: user
    } = this.props;

    return `${user.firstName.trim()}${user.lastName.trim()}`
  }

  // could improve a little, passing task from parent and keeping openDrawerState in the component's state
  // but since we use projects and users there wouldn't be much of an improvement
  render() {
    const {
      taskDrawerOpen,
      closeDrawer,
      classes,
      task,
      projects,
      users
    } = this.props;

    const {
      edit,
      projectAnchorEl,
      taskStatusAnchorEl
    } = this.state;

    const now = new Date();
    const fullName =  task && [task.assignedTo.firstName, task.assignedTo.lastName].join(' ').split(' ').filter( value => value != '').join(' ')

    const taskCreatedDate = task && new Date(task.createdDate)
    const createdDate =  taskCreatedDate && taskCreatedDate.getDate() + "-" + (taskCreatedDate.getMonth() + 1) + "-" + taskCreatedDate.getFullYear()

    const taskStatus = task && (
      <WithLabel
        label='Task Status'
      >
        <StatusChip
          status={task.taskStatus}
          anchorEl={taskStatusAnchorEl}
          options={taskStatusValues}
          changeStatus={this.onChangeTaskStatus}
          handleOpen={this.handleTaskStatusOpen}
          handleClose={this.handleTaskStatusClose}
        />
      </WithLabel>
    )

    const taskProject = task && (
      <WithLabel
        label='Task Project'
      >
        <Grid>
          <Button color='secondary' aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleProjectMenuOpen} variant='outlined'>
            {task.projectName || 'No Projects Assigned'}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={projectAnchorEl}
            keepMounted
            open={Boolean(projectAnchorEl)}
            onClose={this.handleProjectMenuClose}
          >
            {
              projects &&
              projects.map((project, index) => (
                <MenuItem
                  key={`${project.id}${index}`}
                  onClick={() => this.handleProjectMenuClick(project.name, project.id)}
                >
                  {project.name}
                </MenuItem>
              ))
            }
          </Menu>
        </Grid>
      </WithLabel>
    )

    const taskDescription = task && (
      <WithLabel
        label='Task Description'
        show={!edit}
      >
        <DisplayEdit
          edit={edit}
          displayValue={task.description}
          component={FieldTextField}
          fieldProps={{
            name: 'description',
            label: 'Description',
            variant: 'outlined',
            style: {
              marginRight: '20px'
            }
          }}
          componentProps={{
            multiline: true,
            rowsMax: '4',
            rows: '4',
            formControlProps: {
              fullWidth: true,
            }
          }}
          textProps={{
            className: classes.descriptionField
          }}
        />
      </WithLabel>
    )

    const addNewTask = (
      <React.Fragment>
        <AppBar
          color='primary'
          position='static'
        >
          <Toolbar>
            <Typography variant='h4' color='inherit'>
              Create A New Task
            </Typography>
          </Toolbar>
        </AppBar>
        <AddNewTaskForm
          users={users}
          gridProps={{
            item: true,
            xs: 8,
            justify: 'space-around',
            alignItems: 'center'
          }}
          handlePictureChange={this.handlePictureChange}
          removePictureItem={this.removePictureItem}
          emptyPicturesArray={this.emptyPicturesArray}
          pictures={this.state.pictures}
        />
      </React.Fragment>
    )

    return (
      <Drawer
        anchor='top'
        open={taskDrawerOpen}
        onClose={closeDrawer}
        classes={{
          paper: classes.container
        }}
      >

        {
          task ?
          <form onSubmit={this.props.handleSubmit}>

            <AppBar position="static" color="primary">
              <Toolbar>
                <DisplayEdit
                  edit={edit}
                  displayValue={task.title}
                  component={FieldTextField}
                  fieldProps={{
                    name: 'title',
                    label: 'Title',
                  }}
                  textProps={{
                    variant: 'h5',
                  }}
                />
              </Toolbar>
            </AppBar>
            <Grid
              container={true}
              direction='row'
              className={classes.drawerBodyContainer}
              justify='space-between'
            >
              <Grid
                item={true}
                xs={8}
              >
                <Grid
                  container={true}
                  direction='column'
                >
                  {taskStatus}

                  {taskProject}

                  {taskDescription}

                </Grid>
              </Grid>
              <Grid
                item={true}
                xs={4}
              >
                <Grid
                  container={true}
                  direction='column'
                  alignItems='flex-start'
                >
                  <WithLabel
                    label='Assigned To'
                  >
                    <DisplayEdit
                      edit={edit}
                      displayValue={fullName}
                      component={FieldReactSelect}
                      fieldProps={{
                        name: 'assignedTo',
                      }}
                      componentProps={{
                        label: 'Assigned To',
                        onChange: (e) => console.log(e),
                        isMulti: false,
                        options: users.map(user => ({
                          label: [user.firstName, user.lastName].join(' '),
                          value: user.id,
                          ...user
                        }))
                      }}
                    />
                  </WithLabel>


                  <WithLabel
                    label='Created Date'
                  >
                    <Typography inline={true} variant='body2' color='inherit'>{this.formatStringDate(task.createdDate)}</Typography>
                  </WithLabel>
                  <WithLabel
                    label='Due Date'
                  >
										<DisplayEdit
											edit={edit}
											displayValue={this.formatStringDate(task.dueDate)}
											component={FieldDatePicker}
											fieldProps={{
                        name: 'dueDate',
                        label: 'Change Task Due Date'
                      }}
										/>
                  </WithLabel>
									<WithLabel
                    label='Created By'
                  >
										<Typography inline={true} color='inherit' variant='body2'>{this.getCreatedByName()}</Typography>
                  </WithLabel>
                </Grid>
							</Grid>

            </Grid>
            <Button
              type='submit'
            >Submit the shit</Button>
            <Button
                onClick={this.toggleEdit}
            >
                toggle
            </Button>

          </form>
            : <Grid>{addNewTask}</Grid>
        }
      </Drawer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const selectedTaskId = makeSelectSelectedTask()(state);

  const {
    taskDrawerOpen,
    task,
    projects,
    users
  } = createStructuredSelector({
    taskDrawerOpen: makeSelectTaskDrawerOpen(),
    task: makeSelectDataById('tasks', selectedTaskId),
    projects: makeSelectFirestoreOrderedData('projects'),
    users: makeSelectFirestoreOrderedData('users'),
  })(state);

  return {
    selectedTaskId,
    taskDrawerOpen,
    task,
    projects,
    users,
    createdByUser: task && makeSelectDataById('users', task.createdBy)(state)
  }
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    closeDrawer: () => {
      dispatch(closeTaskDrawerAction())
    },
    changeTaskProject: (projectName, projectId) => {
      dispatch(ChangeTaskProjectAction(projectName, projectId))
    },
    changeTaskStatus: (taskId, status) => {
      dispatch(ChangeTaskStatusAction(taskId, status))
    },
  };
}

export default compose<React.ComponentClass<ITaskDrawerComponentProps>>(
  reduxForm({
    form: 'editProject'
  }),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(TaskDrawer);
