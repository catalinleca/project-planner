import * as React from 'react';
import {
  AppBar,
  Drawer,
  Grid,
  Theme,
  withStyles,
  WithStyles,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import {connect} from "react-redux";
import {closeTaskDrawerAction, CreateProjectAction, doTheThingAction, FirstAction} from "../../store/action";
import {createStructuredSelector} from "reselect";
import {makeSelectSelectedTask, makeSelectTaskDrawerOpen, selectReducerState} from "../../store/selectors";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  container: {
    width: '400px',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: '800px',
    }

  }
});

interface ITaskDrawerComponentProps {
}

//from state
interface ITaskDrawerProps extends ITaskDrawerComponentProps {
  taskDrawerOpen: boolean
  closeDrawer: any;
  selectedTask: any;
}

type TaskDrawerType = ITaskDrawerProps & WithStyles<keyof ReturnType<typeof styles>>;

class TaskDrawer extends React.Component<TaskDrawerType, {}> {
  render() {

    const {
      taskDrawerOpen,
      closeDrawer,
      classes,
      selectedTask: task
    } = this.props;

    console.log(' IN TASK DRAWER : ', task);
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
          <React.Fragment>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  {task.get('title')}
                </Typography>
              </Toolbar>
            </AppBar>
          </React.Fragment>
        }
      </Drawer>
    );
  }
}

const mapStateToProps = (state: any) => {
  return createStructuredSelector({
    taskDrawerOpen: makeSelectTaskDrawerOpen(),
    selectedTask: makeSelectSelectedTask()
  })(state.ptReducer);
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    closeDrawer: () => { dispatch(closeTaskDrawerAction()) }
  };
}

export default compose<React.ComponentClass<ITaskDrawerComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(TaskDrawer);