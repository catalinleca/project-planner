import * as React from 'react';
import {
  Button, Divider,
  Grid, Paper,
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
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import FieldTextField from "../../components/FieldTextField/FieldTextField";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {makeSelectDataById, makeSelectFirestoreOrderedData, selectReducerState} from "../../store/selectors";
import {IAction} from "../../utils/interfaces";
import {IUser} from "../../utils/interfaces/IUser/IUser";
import {firestoreConnect} from "react-redux-firebase";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  profilePageContainer: {
    height: '100%',
    marginLeft: '24px'
  },
  profileItem: {
    marginBottom: '24px'
  }
});

interface IUserProfilePageComponentProps {
  onSubmit: any
}

//from state
interface IUserProfilePageProps extends IUserProfilePageComponentProps {
  handleSubmit: any;
  initialize: any;
  user: any
}

type UserProfilePageType = IUserProfilePageProps & WithStyles<keyof ReturnType<typeof styles>>;

class UserProfilePage extends React.Component<UserProfilePageType, {}> {
  public handleInitialize() {
    const {
      user
    } = this.props;

    const initData = user && {
      "firstName": user.firstName,
      "lastName": user.lastName,
      "username": user.username,
      "email": user.email,
      "jobTitle": user.jobTitle,
      "mobilePhone": user.mobilePhone,
    }

    this.props.initialize(initData);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.handleInitialize()
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  render() {
    const {
      classes,
      handleSubmit,
      user
    } = this.props;

    const fullname = user && [user.firstName, user.lastName].join(' ').split(' ').filter( value => value != '').join(' ')
    return (
      <Grid
        container={true}
        direction='column'
        className={classes.profilePageContainer}
      >
        <Grid
          item={true}
          style={{
            width: 'calc(100% + 48px)',
            marginLeft: '-24px',
            marginTop: '-24px',
            marginBottom: '24px'
          }}
        >
          <Paper elevation={0} style={{height: '60px'}}>
            <Grid
              container={true}
              direction='row'
              justify='center'
              alignItems='center'
              style={{height: '100%'}}
            >
              <Typography color='inherit' variant='h6'>
                {`${fullname}'s Profile`}
              </Typography>
            </Grid>
          </Paper>
          <Divider/>

        </Grid>

        <form onSubmit={handleSubmit}>
          <Grid
            container={true}
            justify='center'
          >
            <Grid
              item={true}
              xs={8}
              container={true}
              direction='column'
              justify='space-evenly'
              alignItems='center'
            >
              <Grid
                item={true}
                container={true}
                direction='row'
                justify='space-between'
                className={classes.profileItem}
              >
                <Grid item={true} xs={12} md={5}>
                  <Field
                    name='firstName'
                    component={FieldTextField}
                    label='First Name'
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </Grid>
                <Grid item={true} xs={12} md={5}>
                  <Field
                    name='lastName'
                    component={FieldTextField}
                    label='Last Name'
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item={true} className={classes.profileItem} style={{width: '100%'}}>
                <Field
                  name='username'
                  component={FieldTextField}
                  label='Username'
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </Grid>
              <Grid item={true} className={classes.profileItem} style={{width: '100%'}}>
                <Field
                  name='email'
                  component={FieldTextField}
                  label='Email'
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </Grid>
              <Grid item={true} className={classes.profileItem} style={{width: '100%'}}>
                <Field
                  name='jobTitle'
                  component={FieldTextField}
                  label='Job Title'
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </Grid>
              <Grid item={true} className={classes.profileItem} style={{width: '100%'}}>
                <Field
                  name='mobilePhone'
                  component={FieldTextField}
                  label='Phone Number'
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </Grid>
              <Grid item={true} className={classes.profileItem}>
                <Typography color='inherit' variant='caption'>
                  {user && `${user.firstName} ${user.lastName} registered on ${user.registeredDate}`}
                </Typography>
              </Grid>
              <Button type='submit'>
                Submit the shit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

    );
  }
}


const mapStateToProps = (state: any, ownProps) => {
  const currentUserId = ownProps.match.params.id;

  // doesn't use ownProps so technically there is no need for memoization
  // if the arguments do not change then the function will return the previous value
  // the argument is the state, that means each time the selector is called, that state is changed
  // because otherwise mapStateToProps wouldn't have been called in the first place, but but but,
  // if memoization keeps only the last value then, YES indeed there is no need for memoization
  //, but if the memoization will do it's job for all the values that the function was called in the past
  // then, considering the change of rerunning the selector with the same state values again will lead
  // to increase performance because of the memoization

  return createStructuredSelector({
    user: makeSelectDataById('users', currentUserId)
  })(state);

};

export default compose<React.ComponentClass<IUserProfilePageComponentProps>>(
  reduxForm({
    form: 'userProfilePage'
  }),
  withStyles(styles),
  connect(mapStateToProps),
)(UserProfilePage);
