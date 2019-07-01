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
import {connect} from "react-redux";
import {DeleteProjectAction} from "../../store/action";
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {firestoreConnect} from "react-redux-firebase";
import {
  push
} from 'connected-react-router'
import {PROJECT_DETAILS} from "../../utils/constants";
import {createStructuredSelector} from "reselect";
import {
  makeSelectFirestoreOrderedData,
  makeSelectSelectedTask,
  makeSelectTaskDrawerOpen
} from "../../store/selectors";
import ProjectListPage from "../ProjectListPage/ProjectListPage";

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn
};

const styles = (theme: Theme): StyleRules => ({
  root: {},
  paperContainer: {
    padding: '16px'

  }
});

interface IHomePageComponentProps {
  projects: any;

  deleteProject(id: number): void
}

//from state
interface IHomePageProps extends IHomePageComponentProps {
  dispatch: any;

  getProjects(): void;

  asd: any;
}

type HomePageType = IHomePageProps & WithStyles<keyof ReturnType<typeof styles>>;

class HomePage extends React.Component<HomePageType, {}> {
  private columns = [
    {title: 'Name', field: 'name'},
    {title: 'Project Phase', field: 'projectPhase'},
    {title: 'Status', field: 'status'},
    {title: 'Sprint', field: 'sprint'},
  ]

  public getTrackedProjects = () => {
    const {
      projects
    } = this.props;

    return projects.filter( task => task.tracked === true).map((project, index) => ({
      ...project,
      tableData: {id: index}
    }))
  }

  public onDeleteHandler = (e, rowData) => {
    const {
      deleteProject
    } = this.props;

    deleteProject(rowData.id)
  }

  public handleRowClick = (rowData) => {
    this.props.dispatch(push(`${PROJECT_DETAILS}/${rowData.id}`))
  }

  render() {
    const {
      projects
    } = this.props;

    // console.log(this.props.projects);

    return (
      <React.Fragment>
        {
          projects &&
          <ProjectListPage
              customData={this.getTrackedProjects()}
              customMaterialTableProps={{
                title: 'Tracked Projects'
              }}
          />
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return createStructuredSelector({
    projects: makeSelectFirestoreOrderedData('projects'),
  })(state);
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    dispatch,
    deleteProject: (id) => {
      dispatch(DeleteProjectAction(id))
    },
  };
}

export default compose<React.ComponentClass<IHomePageComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(HomePage);
