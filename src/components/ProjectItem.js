import React, {Component} from 'react';
import '../assests/css/fonts.css'
import '../assests/css/projectItem.css'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Image, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {connect} from"react-redux";
import {deleteProject} from "../actions/projectActions";
import {Confirm} from "react-confirm-bootstrap"
class ProjectItem extends Component {
    constructor(props) {
        super(props);

    }
    onDeleteClick=(id)=>
    {
        this.props.deleteProject(id);

    }
    render() {
        const {projectName,projectIdentifier,description} =this.props.project;
        return (
        <div className="container">
            <div className="item row  border-all shadow-sm bg-light mb-3">
                    <div className="col-sm-2">
                        <span className="font-plex text-left">{projectIdentifier}</span>
                    </div>
                    <div className="col-sm-6 font-mont">
                        <h3>{projectName}</h3>
                        <p >{description}</p>
                    </div>
                    <div className="col-sm-4  text-center">
                        <ListGroup className="font-roboto option-list ">
                            <ListGroupItem className="btn option-list ">
                                <Link to={`/projectBoard/${projectIdentifier}`}
                                      className="text-info" ><Image src={require("../assests/icons/project.png")}
                                height="20px" width="20px"/>
                                Project Board </Link>
                            </ListGroupItem >
                            <ListGroupItem  className="btn option-list">
                                <Link to={`/updateproject/${projectIdentifier}`} className={"text-primary"}>
                              <Image src={require("../assests/icons/edit.png")}
                                          height="20px" width="20px"/>
                                     Project Update
                                </Link>
                            </ListGroupItem>
                            <ListGroupItem className="btn option-list" >
                                <Image src={require("../assests/icons/delete.png")}
                                       height="20px" width="20px"/>
                                <Link to="/" className="text-danger" onClick={this.onDeleteClick.bind(this,projectIdentifier)}
                                >Delete </Link>
                                
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </div>
        </div>

        );
    }
}
ProjectItem.propTypes=
    {
        deleteProject:PropTypes.func.isRequired
    }

export default connect(null
    ,{deleteProject})(ProjectItem);