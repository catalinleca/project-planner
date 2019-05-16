import * as React  from 'react';
import {connect} from 'react-redux';
import TaskElement from "./TaskElement/TaskElement";

function mapStateToProps(state) {
  return {};
}

class TaskComponent extends React.Component {
  render() {
    return (
      <TaskElement/>
    );
  }
}

export default connect(
  mapStateToProps,
)(TaskComponent);
