import * as React from 'react';
import {
  Button, Dialog,
  DialogActions,
  DialogContent, DialogContentText,
  DialogTitle, Grid,
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
  root: {},
  john: {
    color: 'red'
  }
});

interface IDialogComponentComponentProps {
  open?: any;
  handleClose?: any;
  title?: any;
  text?: any;
  handleAgree?: any;
}

//from state
interface IDialogComponentProps extends IDialogComponentComponentProps {
}

type DialogComponentType = IDialogComponentProps & WithStyles<keyof ReturnType<typeof styles>>;

const DialogComponent: React.FC<DialogComponentType> = ({open, handleClose, title, text, handleAgree, classes}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        disableTypography={true}
      >
        <Typography
          variant='h5'
          classes={{
            root: classes.john
          }}
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleAgree} style={{color: 'red'}}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default compose<React.ComponentClass<IDialogComponentProps>>(
  withStyles(styles),
)(DialogComponent);