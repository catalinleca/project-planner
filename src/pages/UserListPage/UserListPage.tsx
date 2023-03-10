import * as React from 'react';
import {
  Avatar,
  Grid, IconButton, Paper,
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
// import {DeleteUserAction} from "../../store/action";
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
import {Link} from "react-router-dom";
import {pick, USER_DETAILS} from "../../utils/constants";
import {createStructuredSelector} from "reselect";
import {makeSelectFirestoreOrderedData, makeSelectIsAdmin} from "../../store/selectors";
import AvatarButton from "../../components/AvatarButton/AvatarButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import _ from 'lodash';

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

interface IUserListPageComponentProps {
  users: any;
  isAdmin: boolean;
  deleteUser(id: number): void
}

//from state
interface IUserListPageProps extends IUserListPageComponentProps {
  dispatch: any;
  asd: any;
}

type UserListPageType = IUserListPageProps & WithStyles<keyof ReturnType<typeof styles>>;

class UserListPage extends React.Component<UserListPageType, {}> {

  public columnsDefault =  [
    {title: 'Avatar', filed: 'avatar', render: rowData => <AvatarButton userData={pick(rowData, ['avatar', 'firstName', 'lastName'])}/>, cellStyle: {width: '131px'}, headerStyle: {marginLeft: '4px'}},
    {title: 'First Name', field: 'firstName'},
    {title: 'Last Name', field: 'lastName'},
    {title: 'Job Title', field: 'jobTitle'},
  ]

  public onDeleteHandler = (e,rowData) => {
    const {
      deleteUser
    } = this.props;

    deleteUser(rowData.id)
  }

  public userActions = rowData => <IconButton onClick={e => this.onDeleteHandler(e, rowData)}><FontAwesomeIcon icon='trash'/></IconButton>

  public columnsAdminExtension = [
    {title: 'Actions', field: '', render: this.userActions, cellStyle: {width: '131px'}},
  ]




  public handleRowClick = (rowData) => {
    this.props.dispatch(push(`${USER_DETAILS}/${rowData.id}`))
  }

  render() {
    const {
      classes,
      users,
      isAdmin
    } = this.props;

    const columns = isAdmin
      ? [
        ...this.columnsDefault,
        ...this.columnsAdminExtension
      ]
      : this.columnsDefault

    return (
      <React.Fragment>
        {
          users &&
					<MaterialTable
						title="All Users"
						columns={columns}
						data={users.map( (user, index) => ({
              ...user,
              tableData: {id: index}
            }))}
						onRowClick={ ( e, rowData) => { this.handleRowClick(rowData) } }
					/>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return createStructuredSelector({
    users: makeSelectFirestoreOrderedData('users'),
    isAdmin: makeSelectIsAdmin()
  })(state)
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    dispatch,
  };
}

export default compose<React.ComponentClass<IUserListPageComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(UserListPage);
