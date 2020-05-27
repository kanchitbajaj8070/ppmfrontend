import React,{Component} from "react";
import '../assests/css/fonts.css'
import '../assests/css/dashboard.css'
import ProjectItem from "./ProjectItem";
import Header from "./Header";
import {Image} from "react-bootstrap";
import CreateProject from "./CreateProject";
import {BrowserRouter as Router, Route} from "react-router-dom";
import AddProject from "./AddProject";
import {connect} from "react-redux"
import {getProjects} from "../actions/projectActions";
import PropTypes from 'prop-types';

class Dashboard extends Component
{
    constructor(props) {
        super(props);
    }
    componentDidMount()
        {
    this.props.getProjects()
    }

    render()
    {

        const projects=this.props.project.projects.map((project,i)=>
    {
        return <ProjectItem key={i}
                   project={this.props.project.projects[i]}/>
    });

            return (
                <div className="background">
                    <CreateProject/>
                        {projects}
                </div>
            )
    }

}
Dashboard.propTypes={
    project:PropTypes.object.isRequired,
    getProjects:PropTypes.func.isRequired
}
const MapStateToProps=(state)=>(
{
    project:state.project
}
)
export default connect(MapStateToProps,{getProjects})(Dashboard);