import * as React from 'react';
import {
  Grid, Paper,
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
import {connect} from "react-redux";
import {createProject, doTheThingAction, FirstAction, GetProjectsAction} from "../../store/action";
import {makeSelectProjects, makeSelectProjectTitle} from "../../store/selectors";
import {createStructuredSelector} from "reselect";

const styles = (theme: Theme): StyleRules => ({
  root: {},
  paperContainer: {
    padding: '16px'

  }
});

interface IProjectListPageComponentProps {
  projects: any;
}

//from state
interface IProjectListPageProps extends IProjectListPageComponentProps {
  getProjects(): void;
}

type ProjectListPageType = IProjectListPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProjectListPage extends React.Component<ProjectListPageType, {}> {
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const {
      classes
    } = this.props;

    console.log(this.props.projects);
    return (
      <Paper
        elevation={3}
        className={classes.paperContainer}
      >
        

      </Paper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return createStructuredSelector({
    projects: makeSelectProjects(),
  })(state)
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    getProjects: () => { dispatch(GetProjectsAction())}
  };
}

export default compose<React.ComponentClass<IProjectListPageComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ProjectListPage);