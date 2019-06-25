import * as React from 'react';
import {
  Avatar, Step, StepLabel, Stepper,
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
import Grid from "@material-ui/core/es/Grid";
import {ProjectPhase} from "../../utils/types/types";

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
}

type ProjectInfoSectionType = IProjectInfoSectionProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProjectInfoSection extends React.Component<ProjectInfoSectionType, {}> {

  public rowItem = (item1, item2, index) => (
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

  public getSteps = ():ProjectPhase[] => ['initial', 'planning', 'execution', 'closure']

  render() {
    const {
      project,
      classes
    } = this.props;

    // console.log(project);
    const dataSet1 = project && [
      ['Sprint:', project.sprint],
      ['Created By:', project.createdBy],
    ]

    const newDate = project && new Date(project.dueDate);
    let formatted_date = newDate && newDate.getDate() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getFullYear()

    const dataSet2 = project && [
      ['Created Date:', project.createdDate],
      ['Due Date:', formatted_date],
    ]

    const steps: ProjectPhase[] = this.getSteps();

    // console.log('steps: ',steps);
    const projectPhase = project && (
      <Grid
        item={true}
        xs={12}
      >
        <Stepper
          activeStep={steps.indexOf(project.projectPhase)}
        >
          {steps.map ( (label, index) => (
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
        < Grid
            container={true}
            item={true}
            direction='column'
            justify='space-around'
            alignItems='flex-start'
            xs={true}
        >
          {dataSet1.map((item, index) => this.rowItem(item[0], item[1], index))}
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
          {dataSet2.map((item, index) => this.rowItem(item[0], item[1], index))}
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
                      <Avatar key={index}>{firstName && firstName.trim().charAt(0) || lastName && lastName.trim().charAt(0)}</Avatar>
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
}

export default compose<React.ComponentClass<IProjectInfoSectionComponentProps>>(
  withStyles(styles),
)(ProjectInfoSection);