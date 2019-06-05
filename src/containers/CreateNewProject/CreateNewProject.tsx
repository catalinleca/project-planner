import * as React from 'react';
import {
  Theme,
  withStyles,
  WithStyles,
  Grid,
  SwipeableDrawer, Button, TextField, FormControl, Select, InputLabel, Input, MenuItem, ListItemText, Checkbox
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import FieldTextField from "../../components/FieldTextField/FieldTextField";
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import {
  BaseFieldProps,
} from 'redux-form';
import {IFieldTextFieldComponentProps} from '../../components/FieldTextField/FieldTextField'
import FieldDatePicker from "../../components/FieldDatePicker/FieldDatePicker";
import FieldMultiSelect from "../../components/FieldMultiSelect/FieldMultiSelect";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {IUser} from "../../utils/interfaces/IUser/IUser";
import ReactSelect from 'react-select';
import FieldReactSelect from "../../components/FieldReactSelect/FieldReactSelect";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  fullHeight: {
    height: '100%'
  }
});

interface ICreateNewProjectComponentProps {
  onSubmit: any;
}

//from state
interface ICreateNewProjectProps extends ICreateNewProjectComponentProps {
}

type CreateNewProjectType = ICreateNewProjectProps & InjectedFormProps & WithStyles<keyof ReturnType<typeof styles>>;

interface IStateProps {
  open: boolean;
  selectedValues: any
}

class CreateNewProject extends React.Component<CreateNewProjectType, {}> {
  public state: IStateProps = {
    open: false,
    selectedValues: []
  }

  public handleSelectChange = (users?: IUser) => {
    // console.log(e.target.value[0])
    console.log(users);
   this.setState({
     selectedValues: users
   })
    // const newArray = this.state.selectedValues;
    // newArray.push(e.target.value[0]);
    // this.setState( {
    //   selectedValues: newArray
    // })
  }


  render() {
    const {
      classes,
      users
    } = this.props;

    // console.log('currentProps: ', this.props.users);

    const names: string[] = [
      'Oliver Hansen',
      'Van Henry',
      'April Tucker',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
      'Virginia Andrews',
      'Kelly Snyder',
    ];

    return (
      <React.Fragment>
        <SwipeableDrawer
          anchor="bottom"
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          onOpen={() => this.setState({open: true})}
          classes={{
            paper: classes.fullHeight
          }}
        >
          {
            users &&
            <Grid
                container={true}
                direction='column'
            >
                <form onSubmit={this.props.handleSubmit}>
                    <Grid
                        container={true}
                        direction='column'
                    >
                        <Field
                            name='project-name'
                            component={FieldTextField}
                            label='Project Name'
                        />
                        <Field
                            name='project-due-date'
                            component={FieldDatePicker}
                            label='Project Due Date'
                        />
                      {/*<Field*/}
                      {/*  name='lead-sources'*/}
                      {/*  component={FieldMultiSelect}*/}
                      {/*  props={{*/}
                      {/*    inputProps: {*/}
                      {/*      value: this.state.selectedValues as Array<string>,*/}
                      {/*      onChange: this.handleSelectChange*/}
                      {/*    },*/}
                      {/*    label: "Choose your Lead Sources",*/}
                      {/*    values: users as Array<IUser>,*/}
                      {/*  }}*/}
                      {/*/>*/}

                      {/*  <Field*/}
                      {/*      name='lead-sources'*/}
                      {/*      component={ReactSelect}*/}
                      {/*      props={{*/}
                      {/*        label: 'Select your leads',*/}
                      {/*        isMulti: true,*/}
                      {/*        // value: this.state.selectedValues,*/}
                      {/*        onChange: this.handleSelectChange,*/}
                      {/*        options: users.map(user => ({*/}
                      {/*          label: [user.firstName, user.lastName].join(' '),*/}
                      {/*          value: user.id,*/}
                      {/*          ...user*/}
                      {/*        }))*/}
                      {/*      }}*/}
                      {/*      value='asdadasdasd'*/}
                      {/*  />*/}
                        <Field
                            name='lead-sources'
                            component={FieldReactSelect}
                            props={{
                              label: 'Select your leads',
                              isMulti: true,
                              // value: this.state.selectedValues,
                              onChange: this.handleSelectChange,
                              options: users.map(user => ({
                                label: [user.firstName, user.lastName].join(' '),
                                value: user.id,
                                ...user
                              }))
                            }}
                            value='asdadasdasd'
                        />
                    </Grid>
                    <Button
                        type='submit'
                    >
                        Submit
                    </Button>

                </form>
                <Grid>
                    <Button
                        onClick={() => this.setState({open: false})}
                    >
                        close
                    </Button>
                </Grid>
            </Grid>
          }
        </SwipeableDrawer>
        <Button
          onClick={() => this.setState({open: true})}
        >
          Open
        </Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  // return createStructuredSelector({
  //   // projects: makeSelectProjects(),
  // })(state)

  return {
    users: state.firestore.ordered.users,
  }
}

export default compose<React.ComponentClass<ICreateNewProjectComponentProps>>(
  reduxForm({
    form: 'newProject'
  }),
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'users'}
  ]),
  withStyles(styles)
)(CreateNewProject);