import React, {Component} from 'react';
import '../assests/css/fonts.css'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteProjectTask} from "../actions/backlogActions";
import {Button} from "react-bootstrap";
class ProjectTask extends Component {

    onDeleteClick =(backlog_id,pt_id)=>
    {
        this.props.deleteProjectTask(backlog_id,pt_id);
    }
    render() {
        const {project_task}=this.props;
        let priorityType=null;
        let priorityClass=null;
        let dueDate="Not Specified"
        if(project_task.dueDate!=null)
        {
            let temp= new Date(project_task.dueDate);
            dueDate=temp.getDate()+"/"+(temp.getMonth()+1)+"/"+temp.getFullYear();
        }
        let borderClass;
        if(project_task.priority===3){
          priorityType="LOW"; priorityClass="bg-info text-light"
        borderClass=" border-info"}
        else if (project_task.priority===2){
            priorityType="MEDIUM"; priorityClass="bg-warning text-light"
            borderClass=" border-warning"}
        else
        {priorityType="HIGH";
            borderClass=" border-danger"
            priorityClass="bg-danger text-light"}

        return (
            <div className={`font-libre shadow-lg border-no ${borderClass} m-2`}>
                <div className={"card mb-1 bg-light mb-2 mt-2 shadow-lg bg-transparent "}>
                    <div className={`card-header text-primary ${priorityClass}`}>
                        ID: {project_task.projectSequence} -- Priority: {priorityType}
                    </div>
                    <div className="card-body bg-light p-2">
                        <h5 className="card-title text-justify">{project_task.summary}</h5>
                        <p className="card-text text-truncate text-justify ">
                            {project_task.acceptanceCriteria}
                        </p>
                        <h6 className="font-libren"> Due Date :{dueDate}</h6>
                        <Link to ={`/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`}
                               className="btn btn-primary m-1 p-2" >
                            View / Update
                        </Link>

                        <Button className="btn btn-danger ml-sm-4 m-1 p-2"
                        onClick={this.onDeleteClick.bind(this,project_task.projectIdentifier,
                            project_task.projectSequence)}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
ProjectTask.propTypes=
    {
        deleteProjectTask:PropTypes.func.isRequired
    }
export default connect(null,{deleteProjectTask})(ProjectTask);