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
}

type TaskDrawerType = ITaskDrawerProps & WithStyles<keyof ReturnType<typeof styles>>;

interface ITaskDrawerState {
  edit: boolean;
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

    // console.log(this.state);
    console.log(this.props)

    const now = new Date();
    const fullName =  task && [task.assignedTo.firstName, task.assignedTo.lastName].join(' ').split(' ').filter( value => value != '').join(' ')

    const taskCreatedDate = task && new Date(task.createdDate)
    const createdDate =  taskCreatedDate && taskCreatedDate.getDate() + "-" + (taskCreatedDate.getMonth() + 1) + "-" + taskCreatedDate.getFullYear()

    const taskStatus = task && (
      <Grid>
        <StatusChip
          status={task.taskStatus}
          anchorEl={taskStatusAnchorEl}
          options={taskStatusValues}
          changeStatus={this.onChangeTaskStatus}
          handleOpen={this.handleTaskStatusOpen}
          handleClose={this.handleTaskStatusClose}
        />
      </Grid>
    )

    const taskProject = task && (
      <Grid>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleProjectMenuOpen}>
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
                    label: 'Title'
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

                    <DisplayEdit
                      edit={edit}
                      displayValue={task.description}
                      component={FieldTextField}
                      fieldProps={{
                        name: 'description',
                        label: 'Description',
                      }}
                      componentProps={{
                        multiline: true,
                        rowsMax: '4',
                      }}
                    />

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
                  <Grid
                    container={true}
                    direction='row'
                    alignItems='center'
                  >
                    <Grid>
                      <Typography variant='body2' color='inherit' className={classes.marginRight}>Assigned To:</Typography>
                    </Grid>
                    <Grid
                      className={classes.selectAssigned}
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
                    </Grid>
                  </Grid>
                  <Grid>
                    <Typography inline={true} color='inherit' variant='body2' className={classes.marginRight}>Created Date:</Typography>
                    <Typography inline={true} color='inherit' variant='body2'>{this.formatStringDate(task.createdDate)}</Typography>
                  </Grid>
                  <Grid
                    container={true}
                    direction='row'
                    alignItems='center'
                  >
                    <Grid>
                      <Typography variant='body2' color='inherit' className={classes.marginRight}>Due Date:</Typography>
                    </Grid>
										<DisplayEdit
											edit={edit}
											displayValue={this.formatStringDate(task.dueDate)}
											component={FieldDatePicker}
											fieldProps={{
                        name: 'dueDate',
                        label: 'Change Task Due Date'
                      }}
										/>
                  </Grid>
									<Grid>
										<Typography inline={true} color='inherit' variant='body2' className={classes.marginRight}>Created By; </Typography>
										<Typography inline={true} color='inherit' variant='body2'>TBD</Typography>
									</Grid>
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
    users: makeSelectFirestoreOrderedData('users')
  })(state);

  return {
    selectedTaskId,
    taskDrawerOpen,
    task,
    projects,
    users,
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
