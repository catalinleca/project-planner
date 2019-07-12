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
import classnames from 'classnames';

const styles = (theme: Theme): StyleRules => ({
  root: {},
  avatarIcon: {
    backgroundColor: 'rgba(0, 119, 173)',
    // color: 'white',
    padding: '6px',
    marginLeft: '6px',
    '&:hover': {
      backgroundColor: 'rgba(0, 119, 173, 0.84)'

    }
  },
  avatarStyle: {

  }
});

interface IAvatarButtonComponentProps {
  onClickHandler?: any;
  img: string;
  disableRipple?: boolean
}

//from state
interface IAvatarButtonProps extends IAvatarButtonComponentProps {
}

type AvatarButtonType = IAvatarButtonProps & WithStyles<keyof ReturnType<typeof styles>>;

class AvatarButton extends React.Component<AvatarButtonType, {}> {

  render() {
    const {
      onClickHandler,
      children,
      img,
      classes,
      ...rest
    } = this.props;

    console.log(this.props);

    return (
      <IconButton
        color='primary'
        onClick={onClickHandler}
        className={classes.avatarIcon}
        {...rest}
      >
        <Avatar alt={img} src={img}/>
      </IconButton>
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
