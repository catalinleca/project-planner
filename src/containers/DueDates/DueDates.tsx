import * as React from 'react';
import {
  Grid,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import ReactTooltip from 'react-tooltip'
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

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

import '../../main.scss'
import {render} from "react-dom";
import {TaskColor, taskStatusValues} from "../../utils/constants";
import {TaskStatus} from "../../utils/types/types";
import {ChangeTaskStatusAction, EditTaskAction, SelectTaskAction, toggleTaskDrawerAction} from "../../store/action";

const styles = (theme: Theme): StyleRules => ({
  root: {},
});

interface IDueDatesComponentProps {
  tasks: ITask[];
  projectId: any
}

//from state
interface IDueDatesProps extends IDueDatesComponentProps {
  toggleTaskDrawer: any;
  selectTask: any;
}

type DueDatesType = IDueDatesProps & WithStyles<keyof ReturnType<typeof styles>>;

interface IDueDatesState {
}

class DueDates extends React.Component<DueDatesType, {}> {
  state = {
    calendarWeekends: true,
    calendarEvents: [ // initial event data
      { title: '', date: new Date() }
    ]
  }

  public handleEventPositioned = (info) => {
    info.el.setAttribute("data-tooltip",`${info.event.title}`);
    info.el.getElementsByTagName('div')[0].classList.add('john')
    ReactTooltip.rebuild();
  }

  public handleEventClick  = (event) => {
    const {
      toggleTaskDrawer,
      selectTask,
    } = this.props;

    selectTask(event.event.id)
    toggleTaskDrawer();
  }

  render() {
    const {
      tasks
    } = this.props;

    const sortedTasks = tasks.sort( (a, b) => {
      const date1 = new Date(a.dueDate).getTime();
      const date2 = new Date(b.dueDate).getTime();
      return date1 - date2;
    })

    const oldReturn =
      sortedTasks.map( (task, index) => (
        <Grid
          key={`${index}${task.id}`}
        >
          <TaskElement
            task={task}
          />
        </Grid>
      ))

    const newTasks = tasks && tasks.filter(task => task.projectId === this.props.projectId).reduce( (acc: any, currentValue: ITask) => {
      return [
        ...acc,
        {
          ...currentValue,
          date: new Date(currentValue.dueDate),
          allDay: true,
          color: TaskColor[currentValue.taskStatus]
        }
      ]
    }, [])
    console.log('newTasks: ', newTasks)
    return (
      <React.Fragment>
        <FullCalendar
          defaultView="dayGridMonth"
          header={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth'
          }}
          plugins={[ dayGridPlugin]}
          events={ newTasks }
          eventClick={ this.handleEventClick}
          eventPositioned={this.handleEventPositioned}
        />
      </React.Fragment>
    )
  }
}


const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    toggleTaskDrawer: () => {dispatch(toggleTaskDrawerAction())},
    selectTask: (task) => {dispatch(SelectTaskAction(task))},
  };
}

export default compose<React.ComponentClass<IDueDatesComponentProps>>(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(DueDates);
