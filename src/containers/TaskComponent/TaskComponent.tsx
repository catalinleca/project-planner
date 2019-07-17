import * as React from 'react';
import {
  Chip,
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
import MaterialTable, {MTableBodyRow, MTableToolbar} from "material-table";
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import TaskElement from "./TaskElement/TaskElement";
import TableRow from "@material-ui/core/TableRow";
import {
  ChangeTaskStatusAction,
  CreateProjectAction,
  doTheThingAction, EditTaskAction,
  FirstAction, SelectTaskAction,
  toggleTaskDrawerAction
} from "../../store/action";
import TaskDrawer from "../../components/TaskDrawer/TaskDrawer";
import {createStructuredSelector} from "reselect";
import {makeSelectSelectedProject, makeSelectSelectedTask} from "../../store/selectors";
import {ITask} from "../../utils/interfaces/ITask/ITask";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  duteDreacu: {
    display: 'grid',
    paddingRight: '16px'
  }
});

interface ITaskComponentComponentProps {
  type?: any;
  typeId?: any;
  tasks: ITask[];
}

//from state
interface ITaskComponentProps extends ITaskComponentComponentProps {
  orderedTasks: any;
  // unorderedTasks: any;
  changeTaskStatus: any;
  toggleTaskDrawer: any;
  selectTask: any;
  selectedTaskId: any;
  editTask: any;
}

type TaskComponentType = ITaskComponentProps & WithStyles<keyof ReturnType<typeof styles>>;

interface ITaskComponentState {
  open: boolean,
}

class TaskComponent extends React.Component<TaskComponentType, {}> {
  public state: ITaskComponentState = {
    open: false
  }
  private columns = [
    {title: 'Title', field: 'title'},
    {title: 'Task Status', field: 'taskStatus'},
    {title: 'Assigned To', field: 'assignedTo'},
    {title: 'Due Date', field: 'dueDate'},
  ]

  // public getData = () => {
  //   const {
  //     orderedTasks,
  //     // unorderedTasks
  //   } = this.props;
  //
  //   // const john = orderedTasks.map(task => {
  //   //   let item = {};
  //   //   this.columns.map(columnType => {
  //   //     const fieldName = columnType['field']
  //   //     item[fieldName] = task[fieldName]
  //   //   })
  //   //   item['id'] = task['id'];
  //   //   return item;
  //   // })
  //
  //   // console.log(typeof unorderedTasks);
  //   //
  //   // const keys = Object.keys(unorderedTasks)
  //   //
  //   // const john = keys.map(id => {
  //   //   let item = {};
  //   //   const task = unorderedTasks[id];
  //   //   // console.log('task: ', task);
  //   //   this.columns.map(columnType => {
  //   //     // console.log('columnType: ', columnType);
  //   //     const fieldName = columnType['field']
  //   //     item[fieldName] = task[fieldName]
  //   //   })
  //   //   item['id'] = id;
  //   //   return item;
  //   // })
  //   // //
  //   // // console.log('-----john-----', john);
  //   //
  //   // // console.log(data.toJS())
  //   // // return data.toJS();
  //   // return john;
  // }

  public onChangeTaskStatus = (taskId, status) => {
    this.props.changeTaskStatus(taskId, status);

  }

  public closeDrawer = () => {
    this.setState({open: false})
  }

  public toggleDrawer = () => {
    this.setState((prevState: ITaskComponentState) => ({
      open: !prevState.open
    }));
  }

  public handleRowClick = (task) => {
    const {
      toggleTaskDrawer,
      selectTask,
    } = this.props;

    selectTask(task.id)
    toggleTaskDrawer();
  }

  public onClickCreateNewTask = () => {
    const {
      toggleTaskDrawer,
      selectTask,
    } = this.props;

    selectTask();
    toggleTaskDrawer()
  }

  public handleCreateNewTask = (values) => {
    console.log('create new task values: ', values);
    this.props.editTask({
      ...values,
      dueDate: values.dueDate && values.dueDate.toString(),
    })
  }

  public getTableData = () => {
    const {
      tasks
    } = this.props;

    return tasks.map( (task, index) => ({
      ...task,
      tableData: {id: index}
    }));
  }

  render() {
    const {
      tasks,
    } = this.props

    return (
      <React.Fragment>
        <TaskDrawer
          onSubmit={this.handleCreateNewTask}
        />
        {
          tasks &&
          <MaterialTable
              title="All Project Tasks"
              columns={this.columns}
              data={this.getTableData()}
              actions={[
                {
                  icon: () => <FontAwesomeIcon icon='plus'/>,
                  tooltip: 'Add Task',
                  onClick: this.onClickCreateNewTask,
                  isFreeAction: true
                }
              ]}


              components={{
                Container: props => <Paper {...props} elevation={0}/>,
                Row: props => {
                  // return (
                  //   <MTableBodyRow {...props}/>
                  // )
                  return (
                    <TableRow
                      // className={classes.duteDreacu}
                      onClick={() => this.handleRowClick(props.data)}
                    >
                      <td>
                        <TaskElement
                          task={props.data}
                          changeTaskStatus={this.onChangeTaskStatus}
                        />
                      </td>
                    </TableRow>
                  )
                },
                Header: props => {
                  // console.log('in header: ', props);
                  return (
                    <tbody>
                      <tr>
                        <th>
                          <div>headshot</div>
                          <Divider/>
                        </th>
                      </tr>
                    </tbody>
                  )
                },
              }
            }
          />
        }
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    changeTaskStatus: (taskId, status) => { dispatch(ChangeTaskStatusAction(taskId, status)) },
    toggleTaskDrawer: () => {dispatch(toggleTaskDrawerAction())},
    selectTask: (task) => {dispatch(SelectTaskAction(task))},
    editTask: (values) => {dispatch(EditTaskAction(values))}
  };
}

export default compose<React.ComponentClass<ITaskComponentComponentProps>>(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(TaskComponent);
