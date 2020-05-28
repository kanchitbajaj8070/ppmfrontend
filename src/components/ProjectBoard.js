import React, {Component} from 'react';
import '../assests/css/fonts.css'
import '../assests/css/projectBoard.css'
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import Backlog from "./Backlog";
import {connect}from "react-redux";
import PropTypes from "prop-types"
import {getBacklog} from "../actions/backlogActions";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
class ProjectBoard extends Component {
    constructor(props) {
        super(props);
        this.state={
            errors:{},
            hasError:false
        }
    }
    componentDidMount() {
        const {id}=this.props.match.params;
this.props.getBacklog(id);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.errors.projectNotFound) {
            this.setState({errors: nextProps.errors,
            hasError:true});
        }
    }

    render() {
        const {id}=this.props.match.params;
        const {project_tasks}=this.props.backlog;
        const {errors}=this.state;
        console.log(id);
        console.log(project_tasks)
        console.log(errors)
        let BoardContent;
        return (
            <div>
            {!this.state.hasError&&(<div className="main-content ">
        <div className="container">
                    <div className="row justify-content-sm-start mt-5 ">
                    <Link to={`/addProjectTask/${id}`} className="btn bg-dark text-light shadow-lg mb-3 text-left font-mont pr-2 border-all
                    border-info">
                        <Image className="add-image p-1" src={require("../assests/icons/plus.png")}
                              /> Create Project Task
                    </Link>
                    </div>
                    <hr className={"hr-line"}/>
                </div>
                    <div >
                { project_tasks.length>=1&&(<div>
                <Backlog project_tasks_prop={project_tasks} />
               </div>)}
                        { project_tasks.length<1&&(
                            <div className="row justify-content-sm-center">
                                <div className="alert col-sm-8 alert-info font-weight-bolder">
                             No Project Exist Currently for This Id
                        </div>
                            </div>)}
                    </div>
            </div>
            )}
                {this.state.hasError&&(<div className="top-gap">
                    <div className="row justify-content-sm-center">
                        <div className="alert col-sm-8 alert-danger font-weight-bolder">
                            This Project Does not exist
                        </div>
                    </div>
                </div>)}
            </div>
        );
    }
}

ProjectBoard.propTypes={
    getBacklog:PropTypes.func.isRequired,
    backlog:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
}
const MapStateToProps=(state)=>({
    backlog:state.backlog,
    errors:state.errors
});
export default connect(MapStateToProps,{getBacklog})(ProjectBoard);