import * as React from 'react';

import {
  Grid,
  Typography,
  Avatar,
  ButtonBase,
  Divider,
  withStyles,
  WithStyles,
  Theme, ListItem,
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  List,
  Map
} from 'immutable';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
// import StatusChip from '../../../../../components/StatusChip/StatusChip';
import classNames from 'classnames';
import * as Immutable from 'immutable';
import {
  compose,
} from 'redux';
import StatusChip from "../../../components/StatusChip/StatusChip";
import {TaskStatus} from "../../../utils/types/types";
import classnames from 'classnames';
import {taskStatusValues} from "../../../utils/constants";
import DueDateComponent from "../../../components/DueDateComponent/DueDateComponent";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  tableRow: {
    // height: ROW_HEIGHT,
    paddingTop: 0,
    paddingBottom: 0,
    // overflow: 'hidden',
    marginBottom: '8px'

  },
  sideVerticalDivider: {
    borderLeft: 'solid',
    borderRight: 'solid',
    color: 'rgb(0,119,173)',
    borderWidth: '1px',
    paddingRight: `${theme.spacing.unit * 0.5}px`,
    paddingLeft: `${theme.spacing.unit * 0.5}px`,
    marginRight: `${theme.spacing.unit * 0.5}px`,
    marginLeft: `${theme.spacing.unit * 0.5}px`,
  },
  marginTopBot: {
    marginTop: `${theme.spacing.unit}px`,
    marginBottom: `${theme.spacing.unit}px`
  },
  orangeAvatar: {
    marginLeft: `${theme.spacing.unit * 0.2}px`,
    color: 'rgb(255,255,255)',
    backgroundColor: 'orange',
  },
  marginLeftRight: {
    marginLeft: `${theme.spacing.unit}px`,
    marginRight: `${theme.spacing.unit}px`
  },
  dueDate: {
    color: 'rgb(176,0,32)',
  },
  alignTasks: {
    marginRight: `${theme.spacing.unit}px`,
  },
  alignComments: {
    marginLeft: `${theme.spacing.unit * 3}px`,
    marginRight: `${theme.spacing.unit}px`,
  },
  noWrap: {
    whiteSpace: 'nowrap'
  },
  // [CriteriaStatus.InProgress]: {
  //   color: Immutable.getIn(theme.palette, ['status', 'inProgress'], 'none'),
  // },
  // [CriteriaStatus.Rejected]: {
  //   color: Immutable.getIn(theme.palette, ['status', 'cancelled'], 'none'),
  // },
  toDo: {
    borderLeftColor: '#E69C24 !important',
  },
  inProgress: {
    borderLeftColor: '#34EBFF !important',
  },
  completed: {
    borderLeftColor: '#3366ff !important',
  },
  rejected: {
    borderLeftColor: '#DF3100 !important',
  },
  accepted: {
    borderLeftColor: '#33CC33 !important',
  },
  // [CriteriaStatus.Created]: {
  //   color: Immutable.getIn(theme.palette, ['status', 'toDo'], 'none'),
  // },
  // [CriteriaStatus.Completed]: {
  //   color: Immutable.getIn(theme.palette, ['status', 'completed'], 'none'),
  // },
  taskDivider: {
    marginTop: `${theme.spacing.unit * 0.25}px`
  },
  avatarItems: {
    marginBottom: `${theme.spacing.unit * 1.5}px`
  },
  bar: {
    borderLeft: '2px solid',
    paddingLeft: `${theme.spacing.unit}px`
  },
  taskElement: {
    width: 'calc(100% + 8px)',
    marginLeft: '-8px'
  }

});

type TaskElementProps =  WithStyles<keyof ReturnType<typeof styles>>;

class TaskElement extends React.Component<any> {
  public state = {
    anchorEl: null
  }
  public getButtons = (sideVerticalDivider: string) => {
    return (
      ['Project Title', 'Quote Number', 'Spec Title'].map((value, index) => (
        <Grid
          key={index}
          color='primary'
          className={`${index === 1 ? sideVerticalDivider : ''}`}
        >
          <Typography variant='caption' color='primary'>
            {value}
          </Typography>
        </Grid>
      ))
    );
  }

  public changeStatus = (status) => {
    console.log('in changeStatus: ', status);
    this.props.changeTaskStatus(this.props.task.id, status);
    this.setState({anchorEl: null});

  }

  public handleOpen = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  public handleClose = () => {
    this.setState({anchorEl: null});
  };


  render() {
    const {
      classes,
      toggler,
      task
    } = this.props;

    const {
      anchorEl
    } = this.state;

    const newDate = task && new Date(task.dueDate);
    let formatted_date = newDate && newDate.getDate() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getFullYear()

    const fullName = [task.assignedTo.firstName, task.assignedTo.lastName].join(' ').split(' ').filter( value => value != '').join(' ')

    const keys = Object.keys(TaskStatus);
    //
    // const taskStatusValues = keys.map( key =>  ({key: key[0], value: key[1]}));


    return (

      <Grid
        item={true}
        // className={classNames(classes.tableRow, classes[taskStatus])}
        className={classnames([classes.tableRow, classes.bar, classes[task.taskStatus]])}
        container={true}
        direction='column'
        wrap='nowrap'
      >
      <ListItem
        button={true}
        className={classes.taskElement}
      >
          <Grid
            container={true}
            direction='row'
          >
            <Grid
              container={true}
              item={true}
              direction='column'
              xs={8}
            >
              <Grid
                item={true}
                // style={{marginRight: '-8px'}}
              >
                <ButtonBase
                  color='primary'
                  onClick={toggler}
                >
                  <Typography variant='body2'>
                    {task.title}
                  </Typography>
                </ButtonBase>
              </Grid>
              <Grid
                item={true}
                container={true}
                direction='row'
                className={classNames(classes.noWrap, classes.marginTopBot)}
                alignItems='center'
              >
                <StatusChip
                  status={task.taskStatus}
                  anchorEl={anchorEl}
                  options={taskStatusValues}
                  changeStatus={this.changeStatus}
                  handleOpen={this.handleOpen}
                  handleClose={this.handleClose}
                />
                <DueDateComponent
                  dateAsString={task.dueDate}
                  type='task'
                />
              </Grid>
            </Grid>
            <Grid
              container={true}
              item={true}
              direction='column'
              justify='space-between'
              alignItems='flex-end'
              xs={4}
            >
              <Grid
                container={true}
                direction='row-reverse'
                alignItems='center'
              >
                <Typography
                  inline={true}
                  color='primary'
                  variant='caption'
                >
                  {fullName}
                </Typography>
                <Typography
                  style={{marginRight: '4px'}}
                  variant='caption'
                >
                  Assigned To:
                </Typography>
              </Grid>
              {/*<Grid*/}
              {/*  item={true}*/}
              {/*  className={classes.avatarItems}*/}
              {/*>*/}
              {/*  {this.getAvatars(classes.orangeAvatar)}*/}
              {/*</Grid>*/}
            </Grid>
          </Grid>
          </ListItem>
        <Divider/>
      </Grid>
    );
  }
}
export default compose<React.ComponentClass<any>> (
  withStyles(styles),
)(TaskElement);
