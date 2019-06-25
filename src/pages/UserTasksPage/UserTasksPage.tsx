import * as React from 'react';
import {
  Divider,
  Grid, Paper,
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
import TaskComponent from "../../containers/TaskComponent/TaskComponent";
import {ITask} from "../../utils/interfaces/ITask/ITask";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IUserTasksPageComponentProps {
  match?: any;
  tasks?: ITask[]
}

//from state
interface IUserTasksPageProps extends IUserTasksPageComponentProps {
}

type UserTasksPageType = IUserTasksPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class UserTasksPage extends React.Component<UserTasksPageType, {}> {
  render() {
    // console.log('this.props in userTaskPage: ', this.props);
    return (
      <Grid>
        {this.props.tasks &&
        <TaskComponent
          type='user'
          typeId={this.props.match.params.id}
          tasks={this.props.tasks}
        />
        }

      </Grid>

    );
  }
}

export default compose<React.ComponentClass<IUserTasksPageComponentProps>>(
  withStyles(styles),
)(UserTasksPage);