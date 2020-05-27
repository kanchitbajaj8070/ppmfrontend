import React, {Component} from 'react';
import '../assests/css/updateproject.css'
import '../assests/css/fonts.css'
import {createProject, getProject} from "../actions/projectActions";
import PropTypes from "prop-types"
import {connect} from "react-redux"
import classnames from 'classnames'
class UpdateProject extends Component {
    constructor(props) {
        super(props);
        this.state= {
            id:"",
            projectName: "",
            projectIdentifier: this.props.match.params.id,
            description: "",
            start_date:"",
            end_date:"",
            errors:{}
        };
        this.onInputChange=this.onInputChange.bind(this);
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
    }

    onInputChange= (event)=>
    {
        this.setState({[event.target.name] : event.target.value});

    }
    onSubmitHandler=(event)=> {
        event.preventDefault();
        const newProject =
            { id:this.state.id,
                projectName: this.state.projectName,
                projectIdentifier: this.state.projectIdentifier,
                description: this.state.description,
                start_date:this.state.start_date,
                end_date:this.state.end_date,
            }
        console.log(newProject);
        this.props.createProject(newProject,this.props.history);
    }
    componentWillReceiveProps(nextProps) {

    const {id,projectName,projectIdentifier,description,start_date,end_date}=nextProps.project;
    this.setState({
             id:id,
            projectName: projectName,
            projectIdentifier: projectIdentifier,
            description: description,
            start_date:start_date,
            end_date:end_date
    }
    )
        if( nextProps.errors)
        {
            this.setState({errors:nextProps.errors})
        }

    }

    componentDidMount() {
this.props.getProject(this.props.match.params.id,this.props.history)
        console.log( "here",this.props.project)

    }

    render() {
        const{errors}=this.state;

        console.log( this.props.match.params.id)
        return (
            <div className="main">
                    <div className="container ">
                        <div className="row d-flex flex-wrap">
                            <div className="shadow-lg col-md-8 col-sm-12 m-auto">
                                <h5 className="display-4 font-plex text-center">Edit Project form</h5>
                                <hr/>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="projectName" className="font-libre form-row">Project Name</label>
                                        <input type="text" className={classnames("form-control form-control-lg",
                                            {"is-invalid":this.state.errors.projectName})}
                                               placeholder="Project Name" name="projectName"
                                         value={this.state.projectName} onChange={this.onInputChange}/>
                                        {errors.projectName && (<div className="h-1 font-weight-bolder text-sm-left invalid-feedback">
                                            {errors.projectName}
                                        </div>)}

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="projectIdentifier" className="font-libre form-row">Project Identifier</label>
                                        <input type="text" className="form-control form-control-lg"
                                               placeholder="Unique Project ID" name="projectIdentifier"
                                               value={this.state.projectIdentifier}
                                               className={classnames("form-control form-control-lg",
                                                   {"is-invalid":this.state.errors.projectIdentifier})}  disabled/>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description" className="font-libre form-row">Project Description</label>
                                        <textarea name="description" className="form-control form-control-lg"
                                                  value={this.state.description}   className={classnames("form-control form-control-lg",
                                            {"is-invalid":this.state.errors.description})}   onChange={this.onInputChange} placeholder="Project Description"></textarea>
                                        {errors.description && (<div className="h-1 font-weight-bolder text-sm-left invalid-feedback">
                                            {errors.description}
                                        </div>)}

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="start_date" className="font-libre form-row ">Estimated Start Date</label>
                                        <input type="date"
                                               value={this.state.start_date}
                                               className={classnames("form-control form-control-lg",
                                                   {"is-invalid":this.state.errors.start_date})}onChange={this.onInputChange}className="form-control form-control-lg" name="start_date"/>
                                        {errors.start_date && (<div className="h-1 font-weight-bolder text-sm-left invalid-feedback">
                                            {errors.start_date}
                                        </div>)}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="end_date" className="font-libre form-row">Estimated End Date</label>
                                        <input type="date" className={classnames("form-control form-control-lg",
                                            {"is-invalid":this.state.errors.end_date})} value={this.state.end_date} onChange={this.onInputChange} className="form-control form-control-lg" name="end_date"/>
                                        {errors.end_date && (<div className="h-1 font-weight-bolder text-sm-left invalid-feedback">
                                            {errors.end_date}
                                        </div>)}
                                    </div>
                                    <input type="submit" onClick={this.onSubmitHandler} className="btn btn-primary btn-block mt-2 mb-2"/>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>


        );
    }
}
UpdateProject.propTypes={
    getProject:PropTypes.func.isRequired,
    project:PropTypes.object.isRequired,
    createProject:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
    project:state.project.project,
    errors:state.errors
});
export default connect(mapStateToProps,{getProject,createProject }) (UpdateProject) ;