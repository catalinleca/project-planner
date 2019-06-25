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
import TableRow from "@material-ui/core/TableRow";
import TaskElement from "../../containers/TaskComponent/TaskElement/TaskElement";
import MaterialTable from "material-table";
import TaskComponent from "../../containers/TaskComponent/TaskComponent";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IUserTasksPageComponentProps {
  match?: any;
}

//from state
interface IUserTasksPageProps extends IUserTasksPageComponentProps {
}

type UserTasksPageType = IUserTasksPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class UserTasksPage extends React.Component<UserTasksPageType, {}> {
  render() {
    console.log('this.props in userTaskPage: ', this.props);
    return (
      <Grid>
        <TaskComponent
          type='user'
          typeId={this.props.match.params.id}
        />
      </Grid>

    );
  }
}

export default compose<React.ComponentClass<IUserTasksPageComponentProps>>(
  withStyles(styles),
)(UserTasksPage);