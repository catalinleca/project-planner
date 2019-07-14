import * as React from 'react';
import {
  Grid, List, ListItem, ListItemIcon, ListItemText,
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
import {DeleteUserAction, EditUserAction, SelectUserAction} from "../../store/action";
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
  selectUser: any;
  selectedUserId: any;
  match: any;
  editUser: any;
  dispatch: any;
  deleteUser: any;
  tasks: ITask[];
  loggedInUserId: string;
  currentUserId: string;
  isAdmin: boolean;
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
  private userItemMenuDefault: IUserItemMenu[] = [
    {
      icon: 'tasks',
      label: 'Tasks',
      to: `${this.props.match.url}/tasks`
    },
    {
      icon: 'user',
      label: 'Profile',
      to: `${this.props.match.url}/profile`
    },
  ]

  private userItemMenuCogExtension: IUserItemMenu[] = [
    {
      icon: 'cog',
      label: 'Change Password',
      to: `${this.props.match.url}/settings`
    },
    ]

  private userItemMenuTrashExtension: IUserItemMenu[] = [
    {
      icon: 'trash',
      label: 'Delete Account',
      action: (callback) => callback()
    },
  ]

  componentDidMount() {
    this.props.selectUser();
  }

  public handleEditUserProfile = (values) => {
    console.log(values);

    this.props.editUser(values)
  }

  public deleteUser = () => {
    this.props.deleteUser();

    this.props.dispatch(push(USER_LIST))
  }

  public getUserTasks = (): ITask[] => {
    const {
      tasks,
      selectedUserId
    } = this.props;

    return tasks.filter( (task: ITask) => task.assignedTo.id === selectedUserId)
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
                onClick={() => userItem.action && userItem.action(this.deleteUser)}
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
    selectedUserId,
    loggedInUserId,
    users,
    tasks,
    isAdmin
  }: {
    selectedUserId: string
    loggedInUserId: string;
    isAdmin: boolean,
    users: IUser[],
    tasks: ITask[],
  } =  createStructuredSelector({
    selectedUserId: makeSelectSelectedUser(),
    users: makeSelectFirestoreData('users'),
    tasks: makeSelectFirestoreOrderedData('tasks'),
    loggedInUserId: makeSelectLoggedInUserId(),
    isAdmin: makeSelectIsAdmin()
  })(state)

  return {
    user:  users ? users[selectedUserId] : null,
    tasks,
    loggedInUserId,
    currentUserId,
    isAdmin
  }
}

export function mapDispatchToProps(dispatch: React.Dispatch<any>, ownProps) {
  const userId = ownProps.match.params.id;
  return {
    dispatch,
    selectUser: () => dispatch(SelectUserAction(userId)),
    editUser: (values) => dispatch(EditUserAction(values)),
    deleteUser: () => dispatch(DeleteUserAction())
  };
}

export default compose<React.ComponentClass<IUserDetailsPageComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(UserDetailsPage);
