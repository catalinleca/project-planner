import * as React from 'react';
import {
  Avatar, Button, Fab, IconButton, Step, StepLabel, Stepper,
  Theme, Tooltip, Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import {
  StyleRules
} from '@material-ui/core/styles';
import {
  compose,
} from 'redux';
import Grid from "@material-ui/core/es/Grid";
import {ProjectPhase} from "../../utils/types/types";
import {formatStringDate, USER_DETAILS} from "../../utils/constants";
import {createStructuredSelector} from "reselect";
import {makeSelectDataById, selectReducerState} from "../../store/selectors";
import {connect} from "react-redux";
import {ChangeTaskStatusAction, EditTaskAction, SelectTaskAction, toggleTaskDrawerAction} from "../../store/action";
import {push} from "connected-react-router";
import DueDateComponent from "../../components/DueDateComponent/DueDateComponent";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  fullHeight: {
    height: '100%'
  },
});

interface IProjectInfoSectionComponentProps {
  project: any;
}

//from state
interface IProjectInfoSectionProps extends IProjectInfoSectionComponentProps {
  user: any
  dispatch: any

}

type ProjectInfoSectionType = IProjectInfoSectionProps & WithStyles<keyof ReturnType<typeof styles>>;

const ProjectInfoSection: React.FC<ProjectInfoSectionType> = props => {

  const { user } = props;

  const rowItem = (item1, item2, index) => (
    <Grid
      key={`${item1}${item2}${index}`}
      container={true}
      direction='row'
      alignItems='center'
      spacing={8}
    >
      <Grid
        item={true}
        xs={4}
      >
        <Typography variant='body1' color='inherit'>
          {item1}
        </Typography>
      </Grid>
      <Grid
        item={true}
        xs={4}
      >
        <Typography variant='body1' color='inherit'>
          {item2}
        </Typography>
      </Grid>
    </Grid>
  )


  const getSteps = (): ProjectPhase[] => ['initial', 'planning', 'execution', 'closure']

  const {
    project,
    classes
  } = props;

  const dataSet1 = project && user && [
    ['Sprint:', project.sprint],
    ['Created By:', `${user.firstName} ${user.lastName}`],
  ]

  const newDate = project && new Date(project.dueDate);
  const formatted_date = newDate && formatStringDate(newDate);

  const createdDate = project && new Date(project.createdDate);
  const formattedCreatedDate = newDate && formatStringDate(createdDate)

  const dateComp = (
    <DueDateComponent
      dateAsString={formatted_date}
      type='project'
    />
  )

  const dataSet2 = project && [
    ['Created Date:', formattedCreatedDate],
    ['Due Date:', dateComp],
  ]

  const steps: ProjectPhase[] = getSteps();

  const projectPhase = project && (
    <Grid
      item={true}
      xs={12}
    >
      <Stepper
        activeStep={steps.indexOf(project.projectPhase)}
      >
        {steps.map((label, index) => (
          <Step
            key={`${label}${index}`}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))
        }
      </Stepper>
    </Grid>
  )

  const handleLeadClick = (user) => {
    props.dispatch(push(`${USER_DETAILS}/${user.id}/profile`))

  }

  return (
    <Grid
      container={true}
      direction='row'
      justify='space-between'
      spacing={8}
      className={classes.fullHeight}
    >
      {projectPhase}
      {dataSet1 &&
			<Grid
				container={true}
				item={true}
				direction='column'
				justify='space-around'
				alignItems='flex-start'
				xs={true}
			>
        {dataSet1.map((item, index) => rowItem(item[0], item[1], index))}
			</Grid>
      }

      {dataSet2 &&
			<Grid
				item={true}
				container={true}
				direction='column'
				justify='space-around'
				alignItems='flex-start'
				xs={true}
			>
        {dataSet2.map((item, index) => rowItem(item[0], item[1], index))}
			</Grid>
      }

      <Grid
        item={true}
        xs={12}
      >
        <Grid
          container={true}
          direction='row'
          alignItems='center'
        >
          <Grid
            item={true}
            style={{
              marginRight: '16px'
            }}
           >
            <Typography variant='body1' color='inherit'>
              LeadSource:
            </Typography>
          </Grid>
          <Grid
            item={true}
          >
            <Grid
              container={true}
              direction='row'
              justify='flex-start'
            >
              {
                project && project.leadSources.map((user, index) => {
                  const firstName = user.firstName;
                  const lastName = user.lastName;
                  return (
                    <Tooltip
                      title={`${firstName} ${lastName}`}
                      placement='top'
                      key={index}
                      style={{marginRight: '4px'}}
                    >
                      <Fab
                        onClick={() => handleLeadClick(user)}
                        size='small'
                      >
                        <Avatar
                          key={index}
                        >
                          {firstName && firstName.trim().charAt(0).toUpperCase() || lastName && lastName.trim().charAt(0).toUpperCase()}
                        </Avatar>
                      </Fab>
                    </Tooltip>
                  );
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (originalState: any, ownProps: any) => {
  return createStructuredSelector({
    user: makeSelectDataById('users', ownProps.project.createdBy),
  })(originalState);
};

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    dispatch
  };
}

export default compose<React.ComponentClass<IProjectInfoSectionComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(ProjectInfoSection);
