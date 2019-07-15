import * as React from 'react';
import {
  Grid,
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
import {connect} from "react-redux";
import {ITask} from "../../utils/interfaces/ITask/ITask";
import TaskComponent from "../TaskComponent/TaskComponent";
import TaskElement from "../TaskComponent/TaskElement/TaskElement";

const styles = (theme: Theme): StyleRules => ({
  root: {},
});

interface IDueDatesComponentProps {
  tasks: ITask[]
}

//from state
interface IDueDatesProps extends IDueDatesComponentProps {
}

type DueDatesType = IDueDatesProps & WithStyles<keyof ReturnType<typeof styles>>;

interface IDueDatesState {
}

class DueDates extends React.Component<DueDatesType, {}> {
  render() {
    const {
      tasks
    } = this.props;

    console.log('Due Dates: ', tasks)

    const sortedTasks = tasks.sort( (a, b) => {
      const date1 = new Date(a.dueDate).getTime();
      const date2 = new Date(b.dueDate).getTime();
      return date2 - date1;
    })

    console.log('sorted: ', sortedTasks);
    return (
      <React.Fragment>
        {
          sortedTasks.map( (task, index) => (
            <Grid
              key={`${index}${task.id}`}
            >
              <TaskElement
                task={task}
              />
            </Grid>
          ))
        }
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
  };
}

export default compose<React.ComponentClass<IDueDatesComponentProps>>(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(DueDates);
