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
import {formatStringDate} from "../../utils/constants";
import classNames from 'classnames';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  warning: {
    color: 'orange'
  },
  error: {
    color: 'red'
  },
  clockIcon: {
    marginRight: '4px'
  }
});

interface IDueDateComponentComponentProps {
  dateAsString: string
  type: 'project' | 'task'
}

//from state
interface IDueDateComponentProps extends IDueDateComponentComponentProps {
}

type DueDateComponentType = IDueDateComponentProps & WithStyles<keyof ReturnType<typeof styles>>;

const DueDateComponent: React.FC<DueDateComponentType> = ({dateAsString, type, classes}) => {
  const date = new Date(dateAsString);
  const now = new Date();

  date.setHours(0,0,0,0);
  now.setHours(0,0,0,0);

  const nowTime = now.getTime();
  const dateTime = date.getTime();

  const projectLimitDate = new Date(date.getTime());

  const isPassed = dateTime < nowTime;

  const isClose = !isPassed &&
    (type === 'task'
      ? date.getTime() === now.getTime()
      : (projectLimitDate.setMonth(projectLimitDate.getMonth() - 1)) < nowTime)

  const stringDate = formatStringDate(date)
  return (
    <Grid
      container={true}
      direction='row'
      alignItems='center'
      className={classNames({
        [classes.warning]: isClose,
        [classes.error]: isPassed,
      })}
      style={{
        marginTop: '4px'
      }}
    >
      <FontAwesomeIcon
        icon='clock'
        size='xs'
        className={classes.clockIcon}
      />
      {stringDate}
    </Grid>
  );
}

export default compose<React.ComponentClass<IDueDateComponentComponentProps>>(
  withStyles(styles),
)(DueDateComponent);