import React, {Component} from 'react';
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";
import '../assests/css/fonts.css'
 const CreateProject =()=>{
        return (
            <React.Fragment>
                <div className='container'>
                <div className="d-flex flex-wrap row justify-content-sm-center">
                    <div className="col-sm-12 " >
                        <div className="display-2 font-plex text-center ">
                            Projects</div>
                        <br/>
                        <div className="d-flex flex-wrap col-sm-auto">
                        <Link to="/addproject"
                              className="btn  border-all font-plex btn-dark m-2 p-2">
                            <Image className="add-image" src={require("../assests/icons/create.png")}
                                   height="25px" width="30px"  />
                            Create a Project
                        </Link>
                        </div>
                        <hr className="hr-line"/>
                    </div>
                </div>
                <div className="row justify-content-sm-start text-center ">
                        <div className="col-sm-2 vertical-line  d-none d-md-block justify-content-sm-start"  >
                        <div className="font-plex  text-left">Identifier </div>
                        </div>
                    <div className="col-sm-6 d-none d-md-block vertical-line " >
                        <div className="font-plex  text-left">Description</div>
                    </div>
                    <div className="col-sm-4 d-none vertical-line d-md-block" >
                        <div className="font-plex text-left">Options</div>
                    </div>
                    </div>

                <div className="row justify-content-sm-center">
                    <div className="col-sm-12 d-none d-md-block"><hr className="hr-line"/> </div>
                </div>
                </div>
            </React.Fragment>
        );
}

export default CreateProject;