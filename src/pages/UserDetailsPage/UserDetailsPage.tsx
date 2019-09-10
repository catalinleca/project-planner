import * as React from 'react';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Grid, List, ListItem, ListItemIcon, ListItemText, Slide,
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
import {connect} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {createStructuredSelector} from "reselect";
import {
  makeSelectFirestoreData,
  makeSelectFirestoreOrderedData, makeSelectIsAdmin,
  makeSelectLoggedInUserId,
  makeSelectSelectedUser
} from "../../store/selectors";
import {DeleteUserAction, EditUserAction, SelectUserAction, SignOutAction} from "../../store/action";
import {IUser} from "../../utils/interfaces/IUser/IUser";
import {
  USER_DETAILS, USER_LIST,
  USER_PROFILE_PATH,
  USER_SETTINGS_PATH,
  USER_TASKS_PATH
} from "../../utils/constants";
import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';
import {
  IconProp
} from "@fortawesome/fontawesome-svg-core";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {ResponsiveListItemText} from "../../components/ResponsiveListItemText/ResponsiveListItemText";
import UserTasksPage from "../UserTasksPage/UserTasksPage";
import UserProfilePage from "../UserProfilePage/UserProfilePage";
import {push} from "connected-react-router";
import {ITask} from "../../utils/interfaces/ITask/ITask";
import UserSettingsPage from "../UserSettingsPage/UserSettingsPage";
import DialogComponent from "../../components/DialogComponent/DialogComponent";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  menuItemContainer: {
    height: 'calc(100% + 48px)',
    marginTop: '-24px',
    marginLeft: '-24px',
    borderRight: '1px solid lightgray',
    backgroundColor: 'gainsboro',
    paddingTop: '40px',
  },
  listIcon: {
    marginRight: 0
  },
  listWidth: {
    width: '100%'
  },
  ripple: {
    color: 'blue',
    backgroundColor: 'green'
  }
});

interface IUserDetailsPageComponentProps {
  width: any
}

//from state
interface IUserDetailsPageProps extends IUserDetailsPageComponentProps {
  user: IUser;
  match: any;
  editUser: any;
  dispatch: any;
  deleteUser: any;
  tasks: ITask[];
  loggedInUserId: string;
  currentUserId: string;
  isAdmin: boolean;
  selectUser: any;
  logOut: any;
}

type UserDetailsPageType = IUserDetailsPageProps & WithStyles<keyof ReturnType<typeof styles>>;

interface IUserItemMenu {
  icon: IconProp,
  label: string,
  to?: string,
  action?: {
    (...args: any[]): any
  }
}


class UserDetailsPage extends React.Component<UserDetailsPageType, {}> {
  public state: any = {
    open: false
  }

  private userItemMenuDefault: IUserItemMenu[] = [
    {
      icon: 'tasks',
      label: 'Tasks',
      to: `tasks`
    },
    {
      icon: 'user',
      label: 'Profile',
      to: `profile`
    },
  ]

  private userItemMenuCogExtension: IUserItemMenu[] = [
    {
      icon: 'cog',
      label: 'Change Password',
      to: `settings`
    },
    ]

  private userItemMenuTrashExtension: IUserItemMenu[] = [
    {
      icon: 'trash',
      label: 'Delete Account',
      action: (callback) => callback()
    },
  ]

  public handleEditUserProfile = (values) => {
    console.log(values);

    this.props.editUser(values)
  }


  public deleteUser = () => {
    const {
      deleteUser,
      currentUserId,
      dispatch,
      loggedInUserId,
      logOut
    } = this.props

    deleteUser(currentUserId);

    currentUserId === loggedInUserId ? logOut() : dispatch(push(USER_LIST))
  }

  public getUserTasks = (): ITask[] => {
    const {
      tasks,
      currentUserId,
    } = this.props;

    return tasks.filter( (task: ITask) => task.assignedTo.id === currentUserId)
  }

  public handleClickOpen = () => {
    this.setState({open: true});
  }

  public handleClose = () => {
    this.setState({open: false});
  }

  componentDidMount() {
    const {
      selectUser,
      currentUserId,
    } = this.props;

    selectUser(currentUserId);

  }

  render() {
    const {
      user,
      classes,
      width,
      tasks,
      loggedInUserId,
      currentUserId,
      isAdmin
    } = this.props;

    console.log('this.state: ', this.state);

    /**
     * vezi cand schimba userii daca iti schimba si taskurile
     */
    const isOwnProps = loggedInUserId === currentUserId;

    const userItemMenu = isOwnProps
      ? this.userItemMenuDefault.concat(this.userItemMenuCogExtension).concat(this.userItemMenuTrashExtension)
      : isAdmin
        ? this.userItemMenuDefault.concat(this.userItemMenuTrashExtension)
        : this.userItemMenuDefault

    const sideUserMenu = (
      <List
        classes={{
          root: classes.listWidth
        }}
      >
        {
          userItemMenu.map( (userItem, index) => {
            const body = (
              <ListItem button={true}
                onClick={() => userItem.action && userItem.action(this.handleClickOpen)}
                TouchRippleProps={{
                  classes: {
                    ripple: classes.ripple
                  }
                }}
              >
                <ListItemIcon classes={{
                  root: classes.listIcon
                }}>
                  <FontAwesomeIcon
                    icon={userItem.icon}
                  />
                </ListItemIcon>
                <ResponsiveListItemText
                  widthBreakpoint={width}
                  primary={userItem.label}
                  primaryTypographyProps={{
                    variant: 'body1',
                  }}
                  responsive={true}
                />
              </ListItem>
            );
            return (
              <Grid key={`${index}${userItem.label}`}>
                {
                  userItem.to
                    ? (
                      <Link to={userItem.to} style={{textDecoration: 'none'}}>
                        {body}
                      </Link>
                    )
                    : body
                }
              </Grid>
            )
          })
        }
      </List>
    )

    return (
      <Grid
        container={true}
        direction='row'
        style={{height: '100%'}}
      >

        <Grid
          item={true}
          xs={2}
          container={true}
          direction='column'
          alignItems='center'
          className={classes.menuItemContainer}
        >
          {sideUserMenu}
          <DialogComponent
            open={this.state.open}
            handleClose={this.handleClose}
            handleAgree={this.deleteUser}
            title='Warning'
            text='Are you sure you want to delete this user?'
          >
          </DialogComponent>

        </Grid>
        <Grid
          item={true}
          xs={10}
          container={true}
          direction='column'
        >
          <Switch>
            <Redirect from={`${USER_DETAILS}/:id`} to={`${USER_DETAILS}/:id/tasks`} exact={true}/>
            {tasks && <Route path={`${USER_DETAILS}/:id/tasks`} render={(props) => <UserTasksPage {...props} tasks={this.getUserTasks()}/>}/>}
            <Route path={`${USER_DETAILS}/:id/profile`} render={(props) => <UserProfilePage {...props} onSubmit={this.handleEditUserProfile}/>}/>
            <Route path={`${USER_DETAILS}/:id/settings`} component={UserSettingsPage}/>
          </Switch>
        </Grid>
      </Grid>
    );
  }
}

export const mapStateToProps = (state: any, ownProps: any) => {
  const currentUserId = ownProps.match.params.id;
  const {
    loggedInUserId,
    users,
    tasks,
    isAdmin
  }: {
    loggedInUserId: string;
    isAdmin: boolean,
    users: IUser[],
    tasks: ITask[],
  } =  createStructuredSelector({
    users: makeSelectFirestoreData('users'),
    tasks: makeSelectFirestoreOrderedData('tasks'),
    loggedInUserId: makeSelectLoggedInUserId(),
    isAdmin: makeSelectIsAdmin()
  })(state)

  return {
    user:  users ? users[currentUserId] : null,
    tasks,
    loggedInUserId,
    currentUserId,
    isAdmin,
  }
}

export function mapDispatchToProps(dispatch: React.Dispatch<any>, ownProps) {
  const userId = ownProps.match.params.id;
  return {
    dispatch,
    editUser: (values) => dispatch(EditUserAction(values)),
    deleteUser: (id) => dispatch(DeleteUserAction(id)),
    selectUser: (id) => dispatch(SelectUserAction(id)),
    logOut: () => dispatch(SignOutAction())
  };
}

export default compose<React.ComponentClass<IUserDetailsPageComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(UserDetailsPage);
