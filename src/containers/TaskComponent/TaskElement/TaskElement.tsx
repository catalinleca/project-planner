import * as React from 'react';

import {
  Grid,
  Typography,
  Avatar,
  ButtonBase,
  Divider,
  withStyles,
  WithStyles,
  Theme,
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
// import StatusChip from '../../../../../components/StatusChip/StatusChip';
import classNames from 'classnames';
import * as Immutable from 'immutable';
import {
  compose,
} from 'redux';
import {
  Map
} from 'immutable';

const styles = (theme: Theme): StyleRules => ({
  root: {},
  tableRow: {
    // height: ROW_HEIGHT,
    paddingTop: 0,
    paddingBottom: 0,
    // overflow: 'hidden',
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
  passed: {
    color: Immutable.getIn(theme.palette, ['status', 'passed'], 'none'),
  },
  missed: {
    color: Immutable.getIn(theme.palette, ['status', 'missed'], 'none'),
  },
  quoted: {
    color: Immutable.getIn(theme.palette, ['status', 'quoted'], 'none'),
  },
  lost: {
    color: Immutable.getIn(theme.palette, ['status', 'lost'], 'none'),
  },
  won: {
    color: Immutable.getIn(theme.palette, ['status', 'won'], 'none'),
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
});

type TaskElementProps =  WithStyles<keyof ReturnType<typeof styles>>;


class TaskElement extends React.Component<any> {
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
  render() {
    const {
      classes,
      toggler
    } = this.props;

    const task = Map({
      unos: "cac pe viata ta"
    });
    return (
      <Grid
        item={true}
        // className={classNames(classes.tableRow, classes[taskStatus])}
        className={classNames(classes.tableRow)}
        container={true}
        direction='column'
        wrap='nowrap'
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
              style={{marginRight: '-8px'}}
            >
              <ButtonBase
                color='primary'
                onClick={toggler}
              >
                <Typography variant='body2'>
                  {task.get('task')}
                </Typography>
              </ButtonBase>
            </Grid>
            <Grid
              item={true}
              container={true}
              direction='row'
              className={classes.marginTopBot}
            >
              {this.getButtons(classes.sideVerticalDivider)}
            </Grid>
            <Grid
              item={true}
              container={true}
              direction='row'
              className={classNames(classes.noWrap, classes.marginTopBot)}
              alignItems='center'
            >
              {/*<StatusChip*/}
              {/*  status={task.get('taskStatus')}*/}
              {/*  anchorEl={anchorEl}*/}
              {/*  handleOpen={this.handleMenuOpen}*/}
              {/*  handleExit={this.handleMenuExit}*/}
              {/*  handleClose={this.handleMenuClose}*/}
              {/*  changeStatus={this.changeStatus}*/}
              {/*  Statuses={CriteriaStatus}*/}
              {/*  TypographyProps={{*/}
              {/*    variant: 'caption'*/}
              {/*  }}*/}
              {/*/>*/}
              this.getDate()
            </Grid>
            <Grid
              item={true}
              className={classes.marginTopBot}
            >
              <Typography variant='caption'>
                <FontAwesomeIcon
                  icon='tasks'
                  className={classes.alignTasks}
                />
                {/*{`${completedCriterias}/${totalCriterias}`}*/}
                {/* Comments number section */}
                {/*<Typography inline={true}>
                  <FontAwesomeIcon
                    icon='comment'
                    className={classes.alignComments}
                  />
                  2
                </Typography>*/}
              </Typography>
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
              item={true}
            >
              <Typography variant='caption'>
                Created by
                <Typography
                  inline={true}
                  color='primary'
                >
                  {/*{` ${task.get('taskFrom').get('first_name')} ${task.get('taskFrom').get('last_name')}`}*/}
                </Typography>
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
      </Grid>
    );
  }
}
export default compose<React.ComponentClass<any>> (
  withStyles(styles),
)(TaskElement);
