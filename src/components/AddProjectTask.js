import React, {Component} from 'react';
import '../assests/css/fonts.css';
import '../assests/css/addproject.css'
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import {connect} from "react-redux";
import classnames from "classnames";
import {addProjectTask} from "../actions/backlogActions";
import PropTypes from "prop-types"
class AddProjectTask extends Component {
    constructor(props) {
        super(props);
        const{ id}=this.props.match.params;
        this.state=
        {
            summary : "",
            acceptanceCriteria: "",
            status: "",
            priority: 0,
            dueDate: "",
            projectIdentifier: id,
            errors:{}
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if( nextProps.errors)
            this.setState({errors:nextProps.errors});
        console.log(nextProps.errors)
    }
    onSubmit=( e)=>
    {
e.preventDefault();
const newTask={
    summary : this.state.summary,
    acceptanceCriteria: this.state.acceptanceCriteria,
    status: this.state.status,
    priority: this.state.priority,
    dueDate: this.state.dueDate,
    projectIdentifier: this.state.projectIdentifier
}
console.log(this.state.errors)
this.props.addProjectTask(this.state.projectIdentifier,newTask,this.props.history);

    }
    onChange=( e)=>
    {
this.setState({[e.target.name]:e.target.value});
    }
    render() {
        const{ id}=this.props.match.params;
        const {errors}=this.state;
        let dueDateError=errors.dueDate;
        console.log(dueDateError)
        return (
            <div className="main-content">
                    <div className="container justify-content-sm-center">
                        <div className="row">
                            <div className="col-md-9 m-auto font-plex  ">
                                <div className="row justify-content-sm-start">
                                <Link to={`/projectBoard/${id}`} className="btn btn-dark border-all p-2 ">
                                    <Image className="add-image" src={require("../assests/icons/back.png")}
                                    height="25px" width="30px"  />
                                    Back to Project Board
                                </Link>
                                </div>
                                <section className="shadow-lg p-4 m-4 col-sm-12">
                                <header className="display-4 font-plex text-center m-2 ">Add Project Task</header>
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
                                        <input type="date" className={classnames("form-control form-control-lg ",{
                                            "is-invalid":dueDateError})}
                                                onChange={this.onChange} value={this.state.dueDate}
                                               className="form-control form-control-lg" name="dueDate"/>
                                        {dueDateError &&(<div className="small text-left alert alert-danger">
                                            {dueDateError}</div>)}
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
                    </div>
                </div>
        );
    }
}
AddProjectTask.protoTypes={
    addProjectTask:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>(
{
    errors:state.errors
}
);
export default connect(mapStateToProps,{addProjectTask})(AddProjectTask);