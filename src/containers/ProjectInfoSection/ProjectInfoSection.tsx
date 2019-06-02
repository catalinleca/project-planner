import * as React from 'react';
import {
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
import Grid from "@material-ui/core/es/Grid";

const styles = (theme: Theme): StyleRules => ({
  root: {}
});

interface IProjectInfoSectionComponentProps {
}

//from state
interface IProjectInfoSectionProps extends IProjectInfoSectionComponentProps {
}

type ProjectInfoSectionType = IProjectInfoSectionProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProjectInfoSection extends React.Component<ProjectInfoSectionType, {}> {
  render() {
    return (
      <Grid
        container={true}
        direction='row'
      >
        <Grid
            container={true}
            item={true}
            direction='column'
            justify='space-around'
            alignItems='flex-start'
            xs={true}
        >

        </Grid>
        <Grid
            item={true}
            container={true}
            direction='column'
            justify='space-around'
            alignItems='flex-start'
            xs={true}
        >

        </Grid>
      </Grid>
    );
  }
}

export default compose<React.ComponentClass<IProjectInfoSectionComponentProps>>(
  withStyles(styles),
)(ProjectInfoSection);