import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import Backlog from "./Backlog";
import classnames from "classnames";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addProjectTask, clearErrors, getProjectTask} from "../actions/backlogActions";

class UpdateProjectTask extends Component {
    constructor(props) {
        super(props);
        const{backlog_id,pt_id}=this.props.match.params;
        this.state=
            {   id:"",
                projectSequence:pt_id,
                summary : "",
                acceptanceCriteria: "",
                status: "",
                priority: 0,
                dueDate: "",
                projectIdentifier: backlog_id,
                errors:{},
                isValidProject:true
            }
    }
    onSubmit=( e)=>
    {
        e.preventDefault();
        const newTask={
            id:this.state.id,
            summary : this.state.summary,
            acceptanceCriteria: this.state.acceptanceCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier,
            projectSequence: this.state.projectSequence
        }
        console.log(this.state.errors)
        this.props.addProjectTask(this.state.projectIdentifier,newTask,this.props.history);
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange=( e)=>
    {
        this.setState({[e.target.name]:e.target.value});
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors)
            this.setState({errors: nextProps.errors});
        if( nextProps.errors.projectNotFound)
            this.setState({isValidProject:false});
        console.log(nextProps.errors)
        this.setState(
            {
                id: nextProps.project.id,
                projectSequence: nextProps.project.projectSequence,
                summary: nextProps.project.summary,
                acceptanceCriteria: nextProps.project.acceptanceCriteria,
                status: nextProps.project.status,
                priority: nextProps.project.priority,
                dueDate: nextProps.project.dueDate,
                projectIdentifier: nextProps.project.projectIdentifier
            }
            );
    }
    componentDidMount() {
        const{ backlog_id,pt_id}=this.props.match.params;
    this.props.getProjectTask(backlog_id,pt_id,this.props.history);
    console.log(this.props.project)

    }
    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {
        const{ backlog_id,pt_id}=this.props.match.params;
        const {errors}=this.state;
        return (
            <div className="main-content">
                {this.state.isValidProject&&(
                <div className="container justify-content-sm-center">
                    <div className="row">
                        <div className="col-md-9 m-auto font-plex  ">
                            <div className="row justify-content-sm-start">
                                <Link to={`/projectBoard/${backlog_id}`} className="btn btn-dark border-all p-2 ">
                                    <Image className="add-image" src={require("../assests/icons/back.png")}
                                           height="25px" width="30px"  />
                                    Back to Project Board
                                </Link>
                            </div>
                            <section className="shadow-lg p-4 m-4 col-sm-12">
                                <header className="display-4 font-plex text-center m-2 ">Update Project Task</header>
                                <div className="row d-flex flex-wrap">
                                    <div className="col-sm-6 text-center font-flex text-dark alert alert-info">
                                        Project Name :{`${backlog_id}`}
                                    </div>
                                    <div className="col-sm-6 text-center font-flex text-dark alert alert-primary">
                                   Project Task:{`${pt_id}`}</div>
                                </div>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="summary" className="font-libre form-row">Project Summary</label>
                                        <input type="text"  className={classnames("form-control form-control-lg ",{
                                            "is-invalid":errors.summary})} name="summary"
                                               placeholder="Project Task summary"
                                               value={this.state.summary} onChange={this.onChange}/>
                                        {errors.summary && (<div className="h-1 text-sm-left invalid-feedback font-weight-bolder">
                                            {errors.summary}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="acceptanceCriteria" className="font-libre form-row">Acceptance Criteria</label>
                                        <textarea className="form-control form-control-lg"
                                                  placeholder="Acceptance Criteria"
                                                  onChange={this.onChange}    className={classnames("form-control form-control-lg ",{
                                            "is-invalid":errors.acceptanceCriteria})}      value={this.state.acceptanceCriteria}
                                                  name="acceptanceCriteria"></textarea>
                                        {errors.acceptanceCriteria && (<div className="h-1 text-sm-left invalid-feedback font-weight-bolder">
                                            {errors.acceptanceCriteria}</div>)}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="dueDate" className="font-libre form-row">Due Date</label>
                                        <input type="date" defaultValue={"2020-03-04"}
                                               className={classnames("form-control form-control-lg ",{
                                                   "is-invalid":errors.dueDate})}  onChange={this.onChange}
                                               value={this.state.dueDate}
                                               className="form-control form-control-lg" name="dueDate"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="priority" className="font-libre form-row">Priority</label>
                                        <select
                                            className="form-control form-control-lg" onChange={this.onChange} name="priority" value={this.state.priority}>
                                            <option value={0}>Select Priority</option>
                                            <option value={1}>High</option>
                                            <option value={2}>Medium</option>
                                            <option value={3}>Low</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="status" className="font-libre form-row">Status</label>
                                        <select className="form-control form-control-lg" onChange={this.onChange} name="status" value={this.state.status}>
                                            <option value="">Select Status</option>
                                            <option value="TO_DO">TO DO</option>
                                            <option value="IN_PROGRESS">IN PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>
                                    </div>

                                    <input type="submit" className="btn p-1 btn-secondary border-all btn-block mt-2 mb-4"/>
                                </form>
                            </section>
                        </div>

                    </div>
                </div>)}
                {!this.state.isValidProject&&(
                    <div className="row mt-40 pt-20 justify-content-sm-center">
                    <div className="font-weight-bold col-sm-8  font-plex alert alert-danger">
                        This Project Task Is Not Valid. Please Check Again
                    </div>
                    </div>)}
                </div>
        );
    }
}
UpdateProjectTask.protoTypes={
    addProjectTask:PropTypes.func.isRequired,
    getProjectTask:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>(
    {
        project:state.backlog.project_task,
        errors:state.errors
    }
);
export default connect(mapStateToProps,{getProjectTask,addProjectTask,clearErrors})( UpdateProjectTask);