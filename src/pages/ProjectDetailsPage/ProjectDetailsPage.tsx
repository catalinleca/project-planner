import * as React from 'react';
import {
  Button,
  Grid, Paper, Popper,
  Theme, Typography,
  withStyles,
  WithStyles,
  Grow, ClickAwayListener,
  MenuItem,
  MenuList, Drawer
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import WidgetDetailStyle from "../../components/WidgetDetailStyle/WidgetDetailStyle";
import TaskComponent from "../../containers/TaskComponent/TaskComponent";
import ProjectInfoSection from "../../containers/ProjectInfoSection/ProjectInfoSection";
import {IAction} from "../../utils/interfaces";
import {connect} from "react-redux";
import {SelectProjectAction} from "../../store/action";
import {ChangeProjectPhaseAction} from "../../store/action";
import {createStructuredSelector} from "reselect";
import {makeSelectSelectedProject} from "../../store/selectors";
import {firestoreConnect} from "react-redux-firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {projectPhases} from "../../utils/constants";
import TaskDrawer from "../../components/TaskDrawer/TaskDrawer";
import {ITask} from "../../utils/interfaces/ITask/ITask";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  widgetContainerStyle: {
    backgroundColor: 'rgb(238,238,238)',
    padding: `${theme.spacing.unit * 2}px`,
    margin: `-${theme.spacing.unit * 3}px`,
    width: 'calc(100% + 48px)'
  },
  widgetStyle: {
    padding: 4,
    height: 2 * 196,
  },
  widgetStylePaper: {
    flex: '1 0 0',
    width: '100%',
    padding: `${theme.spacing.unit * 2}px`,
  },
});

interface IProjectDetailsPageComponentProps {
}

//from state
interface IProjectDetailsPageProps extends IProjectDetailsPageComponentProps {
  selectProject: any;
  project: any;
  projects: any;
  changeProjectPhase: any;
  selectedProjectId: any;
  tasks: ITask[];
}

type ProjectDetailsPageType = IProjectDetailsPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProjectDetailsPage extends React.Component<ProjectDetailsPageType, {}> {
  public state = {
    anchorEl: null,
  }

  componentDidMount() {
    this.props.selectProject();
  }

  public handleClick = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  public handleClose = () => {
    this.setState({anchorEl: null});
  };

  public handleChangeProjectPhase = (label) => {
    this.props.changeProjectPhase(label);
    this.handleClose();
  }

  public getProjectTasks = (): ITask[] => {
    const {
      tasks,
      selectedProjectId
    } = this.props;

    return tasks.filter( task => task.projectId === selectedProjectId);

  }

  render() {
    const {
      classes,
      project,
      selectedProjectId,
      tasks
    } = this.props;

    const {
      anchorEl,
    } = this.state;

    const trackButton = project && <Grid>
      <Button
        aria-owns={anchorEl ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        variant='contained'
        onClick={this.handleClick}
        className={classes.trackButton}
      >
        <Typography style={{marginTop: '1px'}}>
          {project.projectPhase}
        </Typography>
      </Button>
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} transition={true} disablePortal={true}
              className={classes.trackMenu}>
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            {...{id: 'menu-list-grow'}}
            style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
          >
            <Paper>
              <ClickAwayListener onClickAway={this.handleClose}>
                <MenuList>
                  {
                    projectPhases.map( (label, index) => (
                      <MenuItem
                        key={`${label}${index}`}
                        onClick={() => this.handleChangeProjectPhase(label)}
                      >
                        {label}
                      </MenuItem>
                    ))
                  }
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>

    return  project ? (
      <React.Fragment>
        <Grid
          container={true}
          direction='column'
          wrap='nowrap'
          className={classes.widgetContainerStyle}
        >
          <Grid
            container={true}
            item={true}
          >
            <Grid
              container={true}
              direction='row'
              className={classes.titleContainer}
            >
              <Typography
                variant='h5'
                className={classes.titleStyle}
              >
                {project.name}
              </Typography>
              <Grid>
                {trackButton}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container={true}
          >
            <Grid
              item={true}
              container={true}
              direction='column'
              wrap='nowrap'
              xs={12}
            >
              <Grid
                container={true}
                item={true}
              >
                <Grid
                  // ProjectInfo
                  // leaderii scrumu pzdms
                  item={true}
                  container={true}
                  direction='column'
                  xs={12}
                  sm={8}
                  className={classes.widgetStyle}
                >
                  <Paper
                    elevation={0}
                    classes={{
                      root: classes.widgetStylePaper
                    }}
                  >
                    <WidgetDetailStyle
                      header={
                        <Grid container={true}>
                          <Grid container={true} item={true} xs={true} alignItems='center'>
                            <Typography variant='h6'>
                              Project Info
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    >
                      <ProjectInfoSection
                        project={project}
                      />
                    </WidgetDetailStyle>
                  </Paper>
                </Grid>
                <Grid
                  // Due Date tasks
                  // My user page like in jira
                  item={true}
                  container={true}
                  direction='column'
                  xs={12}
                  sm={4}
                  className={classes.widgetStyle}
                >
                  <Paper
                    elevation={0}
                    classes={{
                      root: classes.widgetStylePaper
                    }}
                  >
                    <WidgetDetailStyle
                      header={
                        <Grid container={true}>
                          <Grid container={true} item={true} xs={true} alignItems='center'>
                            <Typography variant='h6'>
                              Due Dates
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    >
                      <Grid
                        container={true}
                        direction='column'
                      >
                        <Grid>PLT</Grid>
                        <Grid>PLT</Grid>
                        <Grid>PLT</Grid>
                        <Grid>PLT</Grid>
                        <Grid>PLT</Grid>
                      </Grid>
                    </WidgetDetailStyle>
                  </Paper>
                </Grid>
                <Grid
                  // Tasks
                  item={true}
                  container={true}
                  direction='column'
                  xs={12}
                  // className={classes.widgetStyle}
                  style={{
                    padding: '4px',
                    height: '500px'
                  }}
                >
                  <Paper
                    elevation={0}
                    classes={{
                      root: classes.widgetStylePaper
                    }}
                  >
                    <WidgetDetailStyle
                      header={
                        <Grid container={true}>
                          <Grid container={true} item={true} xs={true} alignItems='center'>
                            <Typography variant='h6'>
                              Tasks
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    >
                      {tasks &&
                        <TaskComponent
                          type='project'
                          typeId={selectedProjectId}
                          tasks={this.getProjectTasks()}
                        />
                      }
                    </WidgetDetailStyle>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    ) : '';
  }
}

export const mapStateToProps = (state: any) => {
  // console.log(state);
  const {
    selectedProjectId
  }: {
    selectedProjectId: string
  } =  createStructuredSelector({
    selectedProjectId: makeSelectSelectedProject(),
  })(state.ptReducer)

  const projects = state.firestore.data.projects;

  return {
    selectedProjectId,
    project:  projects ? projects[selectedProjectId] : null,
    tasks:  state.firestore.ordered.tasks,
  }
}

export function mapDispatchToProps(dispatch: React.Dispatch<any>, ownProps) {
  const projectId = ownProps.match.params.id;
  return {
    dispatch,
    selectProject: () => dispatch(SelectProjectAction(projectId)),
    changeProjectPhase: (label) => dispatch(ChangeProjectPhaseAction(label, projectId))
  };
}

export default compose<React.ComponentClass<IProjectDetailsPageComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects'},
    { collection: 'tasks'}
  ])
)(ProjectDetailsPage);
