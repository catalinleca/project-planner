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
import {makeSelectSelectedTask, makeSelectTaskDrawerOpen, selectReducerState} from "../../store/selectors";
import DisplayEdit from "../DisplayEdit/DisplayEdit";
import FieldTextField from "../FieldTextField/FieldTextField";
import {firestoreConnect} from "react-redux-firebase";
import StatusChip from "../StatusChip/StatusChip";
import {taskStatusValues} from "../../utils/constants";

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
}

type TaskDrawerType = ITaskDrawerProps & WithStyles<keyof ReturnType<typeof styles>>;

interface ITaskDrawerState {
  edit: boolean;
}

class TaskDrawer extends React.Component<TaskDrawerType, {}> {
  public state = {
    edit: false,
    projectAnchorEl: null,
    taskStatusAnchorEl: null
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
    this.props.changeTaskStatus(this.props.selectedTaskId, status);
    this.setState({taskStatusAnchorEl: null});

  }

  public handleTaskStatusOpen = event => {
    this.setState({taskStatusAnchorEl: event.currentTarget});
  };

  public handleTaskStatusClose = () => {
    this.setState({taskStatusAnchorEl: null});
  };


  render() {
    const {
      taskDrawerOpen,
      closeDrawer,
      classes,
      task,
      projects
    } = this.props;

    const {
      edit,
      projectAnchorEl,
      taskStatusAnchorEl
    } = this.state;

    // console.log(this.state);
    // console.log('task: ', task)

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
          {task.projectName || 'No Task Selected'}
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

    return (
      <Drawer
        anchor='top'
        open={taskDrawerOpen}
        onClose={closeDrawer}
        classes={{
          paper:
          classes.container

        }}
        className={classes.container}
      >

        {
          task &&
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
        }
      </Drawer>
    );
  }
}

const mapStateToProps = (state: any) => {
  const {
    taskDrawerOpen,
    selectedTaskId
  } = createStructuredSelector({
    taskDrawerOpen: makeSelectTaskDrawerOpen(),
    selectedTaskId: makeSelectSelectedTask()
  })(state.ptReducer);

  return {
    taskDrawerOpen,
    selectedTaskId,
    task: state.firestore.data.tasks && state.firestore.data.tasks[selectedTaskId],
    projects: state.firestore.ordered.projects
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
  firestoreConnect([
    {collection: 'projects'}
  ])
)(TaskDrawer);