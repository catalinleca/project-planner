import * as React from 'react';
import {
  Avatar,
  Button, Fab, Grid, IconButton,
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
  userData: any
  disableRipple?: boolean
}

//from state
interface IAvatarButtonProps extends IAvatarButtonComponentProps {
}

type AvatarButtonType = IAvatarButtonProps & WithStyles<keyof ReturnType<typeof styles>>;

const AvatarButton: React.FC<AvatarButtonType> = props => {

  const {
    onClickHandler,
    children,
    userData,
    classes,
    ...rest
  } = props;

  console.log(props);

  const getFirstLetter = (val: string) => {
    if (!val) return
    return val.trim().charAt(0).toUpperCase()
  }

  const userAvatar = (
    <IconButton
      color='primary'
      onClick={onClickHandler}
      className={classes.avatarIcon}
      {...rest}
    >
      <Avatar alt={userData.avatar} src={userData.avatar}/>
    </IconButton>
  )

  const userInitials = (
    <Avatar>
      {`${getFirstLetter(userData.firstName)}${getFirstLetter(userData.lastName)}`}
    </Avatar>
  )

  return userData.avatar
    ? userAvatar
    : userInitials
}

export default compose<React.ComponentClass<IAvatarButtonComponentProps>>(
  withStyles(styles),
)(AvatarButton);
