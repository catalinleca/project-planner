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

const styles = (theme: Theme): StyleRules => ({
  root: {}
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
    handleClose
  } = props;

  console.log(props);
  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant='text'
        aria-owns={anchorEl ? 'change-status' : undefined}
      >
        <Typography>
          {options.get(status)}
        </Typography>
        <Menu
          id='change-status'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onExit={() => handleClose()}
          onClose={() => handleClose()}
        >
          {
            options.map ( (value, index) => (
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

      </Button>
    </React.Fragment>
  );
}

export default compose<React.ComponentClass<IStatusChipComponentProps>>(
  withStyles(styles),
)(StatusChip);