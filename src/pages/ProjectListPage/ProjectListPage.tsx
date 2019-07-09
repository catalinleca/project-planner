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
import {DeleteProjectAction, TrackUntrackProjectAction} from "../../store/action";
import MaterialTable, {MaterialTableProps} from 'material-table';
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
  makeSelectIsAdmin,
  makeSelectIsLoggedIn,
  makeSelectLoggedInUser,
  makeSelectLoggedInUserId,
  makeSelectSelectedTask,
  makeSelectTaskDrawerOpen,
  makeSelectUserParent
} from "../../store/selectors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CreateNewProject from "../../containers/CreateNewProject/CreateNewProject";
import AppMenu from "../../containers/AppMenu/AppMenu";

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

interface IProjectListPageComponentProps {
  customData?: any;
  customMaterialTableProps?: MaterialTableProps;
}

//from state
interface IProjectListPageProps extends IProjectListPageComponentProps {
  dispatch?: any;
  projects?: any;
  isAdmin?: boolean;
  loggedInUserParent?: string;
  loggedInUserId?: string;

  getProjects(): void;

  deleteProject(id: number): void
  trackUntrackProject(id: number, track: boolean): void
}

type ProjectListPageType = IProjectListPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProjectListPage extends React.Component<ProjectListPageType, {}> {
  private columns = [
    {title: 'Name', field: 'name'},
    {title: 'Project Phase', field: 'projectPhase'},
    {title: 'Status', field: 'status'},
    {title: 'Sprint', field: 'sprint'},
  ]

  // public getData = () => {
  //   const {
  //     projects
  //   } = this.props;
  //
  //   return projects.map( project => {
  //     let item = {};
  //     this.columns.map ( columnType => {
  //       const fieldName = columnType['field']
  //       item[fieldName] = project[fieldName]
  //     })
  //     item['id'] = project['id'];
  //     return item;
  //   })
  // }

  public getTableData = () => {
    const {
      projects,
      loggedInUserParent,
      isAdmin,
      loggedInUserId
    } = this.props;

    return projects.filter( project => !isAdmin ? project.createdBy === loggedInUserParent : project.createdBy === loggedInUserId).map((project, index) => ({
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

  public iconStyle = (rowData) => {
    return rowData.tracked
      ? 'fas'
      : 'far'
  }

  public tooltip = (rowData) => {
    return rowData.tracked
      ? 'Untrack'
      : 'Track'
  }

  public trackUntrack = (rowData) => {
    console.log(rowData)
    const {
      trackUntrackProject
    } = this.props;

    const currentTrackStatus = rowData.tracked;

    trackUntrackProject(rowData.id, !currentTrackStatus)
  }

  render() {
    const {
      customData,
      projects,
      customMaterialTableProps,
      isAdmin
    } = this.props;

    // console.log(this.props.projects);

    const newProjectButton = isAdmin && (
      <CreateNewProject/>
    )
    return (
      <React.Fragment>
        {newProjectButton}
        {
          projects &&
          <MaterialTable
            title='All Projects'
            columns={this.columns}
            data={customData || this.getTableData()}
            onRowClick={(e, rowData) => {
              this.handleRowClick(rowData)
            }}
            actions={[
              rowData => ({
                icon: () => <FontAwesomeIcon
                  icon={[this.iconStyle(rowData), 'bookmark']}
                />,
                tooltip: this.tooltip(rowData),
                onClick: (e, rowData) => this.trackUntrack(rowData)
              }),
              {
                icon: 'delete',
                tooltip: 'Delete Project',
                onClick: (e, rowData) => {
                  this.onDeleteHandler(e, rowData)
                }
              }
            ]}
            {...customMaterialTableProps}
          />
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log('app state: ', state);
  return createStructuredSelector({
    projects: makeSelectFirestoreOrderedData('projects'),
    isAdmin: makeSelectIsAdmin(),
    loggedInUserParent: makeSelectUserParent(),
    loggedInUserId: makeSelectLoggedInUserId()
  })(state);
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    dispatch,
    deleteProject: (id) => {
      dispatch(DeleteProjectAction(id))
    },
    trackUntrackProject: (id, track) => {
      dispatch(TrackUntrackProjectAction(id, track))
  }
  };
}

export default compose<React.ComponentClass<any>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(ProjectListPage);
