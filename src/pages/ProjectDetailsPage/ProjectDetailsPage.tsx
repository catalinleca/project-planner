import * as React from 'react';
import {
  Button,
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
import WidgetDetailStyle from "../../components/WidgetDetailStyle/WidgetDetailStyle";
import TaskComponent from "../../containers/TaskComponent/TaskComponent";
import ProjectInfoSection from "../../containers/ProjectInfoSection/ProjectInfoSection";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  widgetContainerStyle: {
    backgroundColor: 'rgb(238,238,238)',
    padding: `${theme.spacing.unit * 2}px`
  },
  widgetStyle: {
    padding: 4,
    height: 2 * 196,
  },
  widgetStylePaper: {
    flex: '1 0 0',
    width: '100%',
    padding: `${theme.spacing.unit * 2}px`,
  },
});

interface IProjectDetailsPageComponentProps {
}

//from state
interface IProjectDetailsPageProps extends IProjectDetailsPageComponentProps {
}

type ProjectDetailsPageType = IProjectDetailsPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProjectDetailsPage extends React.Component<ProjectDetailsPageType, {}> {
  render() {
    const {
      classes
    } = this.props;

    return (
      <Grid
        container={true}
        direction='column'
        wrap='nowrap'
        className={classes.widgetContainerStyle}
      >
        <Grid
          container={true}
          item={true}
        >
          <Grid
            container={true}
            direction='row'
            className={classes.titleContainer}
          >
            <Typography
              variant='h5'
              className={classes.titleStyle}
            >
              Big Name
            </Typography>
            <Grid>
              <Button>
                Track Button TBD
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container={true}
        >
          <Grid
            item={true}
            container={true}
            direction='column'
            wrap='nowrap'
            xs={12}
          >
            <Grid
              container={true}
              item={true}
            >
              <Grid
                // ProjectInfo
                // leaderii scrumu pzdms
                item={true}
                container={true}
                direction='column'
                xs={12}
                sm={8}
                className={classes.widgetStyle}
              >
                <Paper
                  elevation={0}
                  classes={{
                    root: classes.widgetStylePaper
                  }}
                >
                  <WidgetDetailStyle
                    header={
                      <Grid container={true}>
                        <Grid container={true} item={true} xs={true} alignItems='center'>
                          <Typography variant='h6'>
                            Project Info
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                  >
                    <ProjectInfoSection/>
                  </WidgetDetailStyle>
                </Paper>
              </Grid>
              <Grid
                // Due Date tasks
                // My user page like in jira
                item={true}
                container={true}
                direction='column'
                xs={12}
                sm={4}
                className={classes.widgetStyle}
              >
                <Paper
                  elevation={0}
                  classes={{
                    root: classes.widgetStylePaper
                  }}
                >
                  <WidgetDetailStyle
                    header={
                      <Grid container={true}>
                        <Grid container={true} item={true} xs={true} alignItems='center'>
                          <Typography variant='h6'>
                            Due Dates
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                  >
                    <Grid
                      container={true}
                      direction='column'
                    >
                      <Grid>PLT</Grid>
                      <Grid>PLT</Grid>
                      <Grid>PLT</Grid>
                      <Grid>PLT</Grid>
                      <Grid>PLT</Grid>
                    </Grid>
                  </WidgetDetailStyle>
                </Paper>
              </Grid>
              <Grid
                // Tasks
                item={true}
                container={true}
                direction='column'
                xs={12}
                className={classes.widgetStyle}
              >
                <Paper
                  elevation={0}
                  classes={{
                    root: classes.widgetStylePaper
                  }}
                >
                  <WidgetDetailStyle
                    header={
                      <Grid container={true}>
                        <Grid container={true} item={true} xs={true} alignItems='center'>
                          <Typography variant='h6'>
                            Tasks

                          </Typography>
                        </Grid>
                      </Grid>
                    }
                  >
                    <TaskComponent/>
                  </WidgetDetailStyle>
                </Paper>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default compose<React.ComponentClass<IProjectDetailsPageComponentProps>>(
  withStyles(styles),
)(ProjectDetailsPage);
