import * as React from 'react';
import {
  Button, ListItemText, Menu, MenuItem,
  Theme, Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import * as Immutable from "immutable";
import classnames from 'classnames';

const styles = (theme: Theme): StyleRules => ({
  root: {},
  chip: {
    borderRadius: '4px',
    fontSize: '14px',
    padding: '6px 10px',
    textTransform: 'uppercase',
    width: '140px',
    cursor: 'pointer',
    textAlign: 'center'
  },
  toDo: {
    background: 'orange',
  },
  inProgress: {
    background: 'lightblue',
  },
  completed: {
    background: 'blue',
  },
  rejected: {
    background: 'red',
  },
  accepted: {
    background: 'green',
  },
});

interface IStatusChipComponentProps {
  anchorEl: any
  status: any
  options: any,
  changeStatus: any
  handleOpen: any
  handleClose: any
}

//from state
interface IStatusChipProps extends IStatusChipComponentProps {
}

type StatusChipType = IStatusChipProps & WithStyles<keyof ReturnType<typeof styles>>;

const StatusChip: React.FC<StatusChipType> = (props) => {
  const {
    anchorEl,
    status,
    options,
    changeStatus,
    handleOpen,
    handleClose,
    classes
  } = props;

  console.log(props);
  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant='text'
        aria-owns={anchorEl ? 'change-status' : undefined}
        className={classnames([classes.chip, classes[status]])}
      >
        <Typography>
          {options.get(status)}
        </Typography>
      </Button>

      <Menu
        id='change-status'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onExit={() => handleClose()}
        onClose={() => handleClose()}
      >
        {
          options.map((value, index) => (
            <MenuItem
              key={`${value}${index}`}
              onClick={() => changeStatus(index)}
            >
              <ListItemText
                inset={false}
                primary={value}
              />
            </MenuItem>
          )).valueSeq().toArray()
        }
      </Menu>

    </React.Fragment>
  );
}

export default compose<React.ComponentClass<IStatusChipComponentProps>>(
  withStyles(styles),
)(StatusChip);