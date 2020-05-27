import React, {Component} from 'react';
import classnames from 'classnames'
import '../assests/css/fonts.css'
import PropTypes from "prop-types"
import {connect} from "react-redux"
import '../assests/css/addproject.css'
import {createProject} from "../actions/projectActions";
class AddProject extends Component {
    constructor(props) {
        super(props);
        this.state= {
            projectName: "",
            projectIdentifier: "",
            description: "",
            start_date:"",
            end_date:"",
            errors:{}
        };
        this.onSubmitHandler=this.onSubmitHandler.bind(this);
        this.onInputChange=this.onInputChange.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if( nextProps.errors)
        {
            this.setState({errors:nextProps.errors})
        }
    }

    onInputChange= (event)=>
{
    this.setState({[event.target.name] : event.target.value});

    }
 onSubmitHandler=(event)=> {
        event.preventDefault();
     const newProject =
         {
             projectName: this.state.projectName,
             projectIdentifier: this.state.projectIdentifier,
             description: this.state.description,
             start_date:this.state.start_date,
             end_date:this.state.end_date,
            errors:this.state.errors
         }
     console.log(newProject);
    this.props.createProject(newProject,this.props.history);
    }
    render() {
     const {errors}=this.state;
        return (
                <div className="main">
                    <div className="container">
                        <div className="row d-flex justify-content-sm-center">
                            <div className="col-lg-8 col-md-12 shadow-lg">
                                <h5 className="display-4 text-center font-libre">Create Project form</h5>
                                <hr/>
                                <form action={"/"} method={"POST"}>
                                    <div className="form-group">
                                        <label htmlFor="projectName" className="font-libre form-row">Project Name</label>
                                        <input type="text" name="projectName"
                                               className={classnames("form-control form-control-lg ",{
                                                   "is-invalid":errors.projectName})}
                                               placeholder="Project Name"
                                        value={this.state.projectName} onChange={this.onInputChange}/>
                                        {errors.projectName && (<div className="h-1 text-sm-left invalid-feedback font-weight-bolder">
                                            {errors.projectName}
                                        </div>)
                                        }
               </div>

                                    <div className="form-group">
                                        <label htmlFor="projectIdentifier" className="font-libre form-row">Project Identifier</label>
                                        <input type="text" className={classnames("form-control form-control-lg",
                                            {"is-invalid":errors.projectIdentifier})}
                                               onChange={this.onInputChange}  value={this.state.projectIdentifier}       placeholder="Unique Project ID of 4 or 5 characters only"  name="projectIdentifier"/>
                                        {errors.projectIdentifier && (<div className="h-1 text-sm-left font-weight-bolder invalid-feedback">
                                            {errors.projectIdentifier}
                                        </div>)
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description"  className="font-libre form-row">Project Description</label>
                                        <textarea className={classnames("form-control form-control-lg",
                                            {"is-invalid":errors.description})}
                                                  onChange={this.onInputChange} value={this.state.description} placeholder="Project Description" name={"description"}>
                                        </textarea>
                                        {errors.description && (<div className="h-1 text-sm-left font-weight-bolder invalid-feedback">
                                            {errors.description}
                                        </div>)
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="start_date"  className="font-libre form-row">Start Date</label>
                                        <input type="date" min={new Date()} onChange={this.onInputChange}
                                               value={this.state.start_date}
                                               className={classnames("form-control form-control-lg",
                                                   {"is-invalid":errors.start_date})} name="start_date"/>
                                        {errors.start_date && (<div className="h-1 font-weight-bolder text-sm-left invalid-feedback">
                                            {errors.start_date}
                                        </div>)
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="end_date" className="font-libre form-row">Estimated End Date</label>
                                        <input type="date" min={this.state.start_date} value={this.state.end_date}
                                               onChange={this.onInputChange}  className={classnames("form-control form-control-lg",
                                            {"is-invalid":errors.description})} name="end_date"/>
                                        {errors.end_date && (<div className="h-1 font-weight-bolder text-sm-left invalid-feedback">
                                            {errors.end_date}
                                        </div>)}
                                    </div>
                                        <div className="form-group">
                                    <input type="submit"  onClick={this.onSubmitHandler}
                                           className="text-dark font-libre border-all rounded-button col-sm-4"/></div>

                                </form>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
AddProject.propTypes= {
    createProject:PropTypes.func.isRequired,
    errors:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>(
{
    errors:state.errors
}
) ;/* Parenthesize the body of a function to return an object literal expression:
params => ({foo: bar})*/
export default connect(mapStateToProps,{createProject})(AddProject);