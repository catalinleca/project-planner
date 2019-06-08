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

const styles = (theme: Theme): StyleRules => ({
  root: {},
  duteDreacu: {
    display: 'grid',
    paddingRight: '16px'
  }
});

interface ITaskComponentComponentProps {
}

//from state
interface ITaskComponentProps extends ITaskComponentComponentProps {
  orderedTasks: any;
  unorderedTasks: any;
}

type TaskComponentType = ITaskComponentProps & WithStyles<keyof ReturnType<typeof styles>>;

class TaskComponent extends React.Component<TaskComponentType, {}> {
  private columns = [
    {title: 'Title', field: 'title'},
    {title: 'Task Status', field: 'taskStatus'},
    {title: 'Assigned To', field: 'assignedTo'},
    {title: 'Due Date', field: 'dueDate'},
  ]

  private asd = [
  ]

  public getData = () => {
    const {
      orderedTasks,
      unorderedTasks
    } = this.props;

    // const john = orderedTasks.map(task => {
    //   let item = {};
    //   this.columns.map(columnType => {
    //     const fieldName = columnType['field']
    //     item[fieldName] = task[fieldName]
    //   })
    //   item['id'] = task['id'];
    //   return item;
    // })

    // console.log(typeof unorderedTasks);
    //
    const keys = Object.keys(unorderedTasks)

    const john = keys.map(id => {
      let item = {};
      const task = unorderedTasks[id];
      console.log('task: ', task);
      this.columns.map(columnType => {
        console.log('columnType: ', columnType);
        const fieldName = columnType['field']
        item[fieldName] = task[fieldName]
      })
      item['id'] = id;
      return item;
    })
    //
    console.log('-----john-----', john);

    // console.log(data.toJS())
    // return data.toJS();
    return john;
  }

  render() {
    const {
      orderedTasks,
      unorderedTasks,
      classes
    } = this.props

    console.log('orderedTasks: ', orderedTasks)
    console.log('unorderedTasks: ', unorderedTasks)

    return (
      <React.Fragment>
        {
          orderedTasks &&
          <MaterialTable
              title="All Projects"
              columns={this.columns}
              data={orderedTasks}
              actions={[
                {
                  icon: 'bookmark',
                  tooltip: 'Save Project',
                  onClick: (e, rowData) => {
                    console.log(rowData);
                  }
                },
                {
                  icon: 'delete',
                  tooltip: 'Delete Project',
                  onClick: (e, rowData) => {
                    // this.onDeleteHandler(e, rowData)
                    console.log('sug pl iesi aks');
                  }
                }
              ]}
              detailPanel={[
                {
                  tooltip: 'Show crew orders',
                  render: (agent) => {
                    console.log('agent: ', agent)
                    return (
                      <div style={{ overflowY: 'auto', height: '300px' }}>
                        BLAH
                        <div>{agent.name}</div>
                      </div>
                    )
                  },
                },
              ]}

              components={{
                Container: props => <Paper {...props} elevation={0}/>,
                Row: props => {
                  console.log('in row: ', props);
                  // return (
                  //   <MTableBodyRow {...props}/>
                  // )
                  return (
                    <TableRow
                      // className={classes.duteDreacu}
                    >
                      <td>
                        <TaskElement
                          task={props.data}
                        />
                      </td>
                    </TableRow>
                  )
                },
                Header: props => {
                  console.log('in header: ', props);
                  return (
                    <tr>
                      <th>
                        <div>headshot</div>
                        <Divider/>
                      </th>
                    </tr>
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

const mapStateToProps = (state: any) => {
  // console.log('mapStateToProps in ProjectListPage: ', state);
  // return createStructuredSelector({
  //   // projects: makeSelectProjects(),
  // })(state)

  return {
    orderedTasks: state.firestore.ordered.tasks,
    unorderedTasks: state.firestore.data.tasks,
  }
}

export default compose<React.ComponentClass<ITaskComponentComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'tasks'}
  ])
)(TaskComponent);