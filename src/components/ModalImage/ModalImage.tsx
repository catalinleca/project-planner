import * as React from 'react';
import {
  Grid,
  Modal,
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

const styles = (theme: Theme): StyleRules => ({
  root: {},
  normalPic: {
    width: '60px',
    height: '60px'
  },
  modalPic: {
    minWidth: 600,
    maxHeight: 800,
    maxWidth: 1000
  },
  paper: {
    position: 'absolute',
  },
});

interface IModalImageComponentProps {
  picture: any
}

//from state
interface IModalImageProps extends IModalImageComponentProps {
}

type ModalImageType = IModalImageProps & WithStyles<keyof ReturnType<typeof styles>>;

class ModalImage extends React.Component<ModalImageType, {}> {
  public state = {
    open: false
  }

  public handleOpen = () => {
    this.setState({open: true})
  }
  public handleClose = () => {
    this.setState({open: false})
  }

  public getModalStyle = () => {
    const top = 50
    const left = 50

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  render() {
    const {
      open
    } = this.state;

    const {
      picture,
      classes
    } = this.props;
    const imgObject = URL.createObjectURL(picture)

    return (
      <React.Fragment>
        <Grid
          onClick={this.handleOpen}
        >
          <img src={imgObject} alt="ffff" className={classes.normalPic}/>
        </Grid>
          <Modal
            open={open}
            onClose={this.handleClose}
          >
            <div style={this.getModalStyle()} className={classes.paper}>
              <img src={imgObject} alt="ffff" className={classes.modalPic}/>
            </div>
          </Modal>
      </React.Fragment>

    );
  }
}

export default compose<React.ComponentClass<IModalImageComponentProps>>(
  withStyles(styles),
)(ModalImage);