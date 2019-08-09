import * as React from 'react';
import {
  Avatar,
  IconButton,
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
  avatarIcon: {
    backgroundColor: 'rgba(0, 119, 173)',
    // color: 'white',
    padding: '6px',
    '&:hover': {
      backgroundColor: 'rgba(0, 119, 173, 0.84)'
    },
    color: 'white',
    width: '52px',
    height: '52px'
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

interface IUserProfilePic {
  onClickHandler?: any;
  disableRipple?: boolean;
  classes?: any
}


const UserProfilePic: React.FC<IUserProfilePic> = ({onClickHandler, classes, children}) => (
  <IconButton
    color='primary'
    onClick={onClickHandler}
    className={classes.avatarIcon}
  >
    {children}
  </IconButton>
)

const AvatarButton: React.FC<AvatarButtonType> = props => {
  const {
    userData,
  } = props;

  const getFirstLetter = (val: string) => {
    if (!val) return;
    return val.trim().charAt(0).toUpperCase()
  };

  const userAvatar = <Avatar alt={userData.avatar} src={userData.avatar}/>

  const userInitials = `${getFirstLetter(userData.firstName)}${getFirstLetter(userData.lastName)}`

  return (
    <UserProfilePic
      {...props}
    >
      {
        userData.avatar
            ? userAvatar
            : userInitials
      }
    </UserProfilePic>
  )
}

export default compose<React.ComponentClass<IAvatarButtonComponentProps>>(
  withStyles(styles),
)(AvatarButton);
