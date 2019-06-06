import * as React from 'react';
import {
  Theme,
  withStyles,
  WithStyles,
  Grid,
  SwipeableDrawer,
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  Input,
  MenuItem,
  ListItemText,
  Checkbox,
  Stepper,
  Step, StepLabel, StepContent
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
import CreateNewProjectForm from "./CreateNewProjectForm/CreateNewProjectForm";
import {CreateProjectAction, DeleteProjectAction, GetProjectsAction} from "../../store/action";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  fullHeight: {
    height: '100%'
  }
});

interface ICreateNewProjectComponentProps {
  // onSubmit?: any;
}

//from state
interface ICreateNewProjectProps extends ICreateNewProjectComponentProps {
}

type CreateNewProjectType = ICreateNewProjectProps & InjectedFormProps & WithStyles<keyof ReturnType<typeof styles>>;

interface IStateProps {
  open: boolean;
  selectedValues: any;
  activeStep: number;
}



class CreateNewProject extends React.Component<CreateNewProjectType, {}> {
  public state: IStateProps = {
    open: false,
    selectedValues: [],
    activeStep: 0
  }

  public submit = (values) => {
    console.log(values);
    const newValues = {
      ...values,
      dueDate: new Date(values.dueDate),
      leadSources: values.leadSources.map( leadSource => leadSource.id)
    }
    console.log(newValues);
    this.props.createProject(newValues);
  }

  public handleSelectChange = (users?: IUser) => {
    console.log(users);
   this.setState({
     selectedValues: users
   })
  }

  public handleBack = () => this.setState( prevState => ({
    ...prevState,
    activeStep: this.state.activeStep - 1
  }))

  public handleNext = () => this.setState( prevState => ({
    ...prevState,
    activeStep: this.state.activeStep + 1
  }))

  public getStepContent = (step: number) => {
    switch(step) {
      case 0:
        return <CreateNewProjectForm
          onSubmit={this.submit}
          selectedValues={this.state.selectedValues}
          users={this.props.users}
          handleSelectChange={this.handleSelectChange}
          handleClose={() => this.setState({open: false})}
        />;
      case 1:
        return (
          <Grid
            container={true}
            direction='row'
          >
            <Grid item={true} xs={4}> Item 1</Grid>
            <Grid item={true} xs={4}> Item 1</Grid>
            <Grid item={true} xs={4}> Item 1</Grid>
            <Grid item={true} xs={4}> Item 1</Grid>
            <Grid item={true} xs={4}> Item 1</Grid>
            <Grid item={true} xs={4}> Item 1</Grid>

          </Grid>
        )
    }
  }

  public getSteps = () => ['Add your project details', 'Insert Tasks'];

  render() {
    const {
      classes,
      users
    } = this.props;

    const {
      activeStep
    } = this.state;
    // console.log('currentProps: ', this.props.users);

    const steps = this.getSteps();

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
              <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map( (label, index) => (
                  <Step key={`${label}${index}`}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      {this.getStepContent(index)}
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Create The Project'}
                      </Button>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>

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

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    createProject: (project) => {
      dispatch(CreateProjectAction(project))
    },
  };
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

  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'users'}
  ]),
  withStyles(styles)
)(CreateNewProject);