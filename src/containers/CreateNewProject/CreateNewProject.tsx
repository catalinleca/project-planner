import * as React from 'react';
import {
  Theme,
  withStyles,
  WithStyles,
  Grid,
  SwipeableDrawer, Button, TextField
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import FieldTextField from "../../components/FieldTextField/FieldTextField";
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import {
  BaseFieldProps,
} from 'redux-form';
import { IFieldTextFieldComponentProps } from '../../components/FieldTextField/FieldTextField'
import FieldDatePicker from "../../components/FieldDatePicker/FieldDatePicker";

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

class CreateNewProject extends React.Component<CreateNewProjectType, {}> {
  public state = {
    open: false
  }


  render() {
    const {
      classes
    } = this.props;

    return (
      <React.Fragment>
        <SwipeableDrawer
          anchor="bottom"
          open={this.state.open}
          onClose={() => this.setState({ open : false})}
          onOpen={() => this.setState({ open : true})}
          classes={{
            paper: classes.fullHeight
          }}
        >
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
              </Grid>
              <Button
                type='submit'
              >
                Submit
              </Button>

            </form>
            <Grid>
              <Button
                onClick={() => this.setState({ open: false })}
              >
                close
              </Button>
            </Grid>
          </Grid>
        </SwipeableDrawer>
        <Button
          onClick={ () => this.setState({ open : true})}
        >
          Open
        </Button>
      </React.Fragment>
    );
  }
}

export default compose<React.ComponentClass<ICreateNewProjectComponentProps>>(
  reduxForm({
    form: 'newProject'
  }),
  withStyles(styles)
)(CreateNewProject);