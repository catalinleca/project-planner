import * as React from 'react';
import {
  Avatar,
  Button, Fab, IconButton,
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
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {ButtonProps} from "@material-ui/core/Button";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  avatarIcon: {
    backgroundColor: '#0077AD',
    color: 'white',
    padding: '6px',
    margin: '6px'
  },
  pzdms: {
    backgroundColor: 'rgba(0, 0, 0, 0.84)'
  }
});

interface IAvatarButtonComponentProps {
  onClick?: any;
  img: string;
}

//from state
interface IAvatarButtonProps extends IAvatarButtonComponentProps {
}

type AvatarButtonType = IAvatarButtonProps & WithStyles<keyof ReturnType<typeof styles>>;

class AvatarButton extends React.Component<AvatarButtonType, {}> {

  render() {
    const {
      onClick,
      children,
      img,
      classes
    } = this.props;

    console.log(this.props);

    return (
      <Fab
        color='primary'
        onClick={onClick}
      >
        <Avatar alt={img} src={img}/>
      </Fab>
    )
  }
}

const mapStateToProps = createStructuredSelector({
})

export function mapDispatchToProps(dispatch: React.Dispatch<any>) {
  return {
    dispatch,
  };
}
export default compose<React.ComponentClass<IAvatarButtonComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AvatarButton);
