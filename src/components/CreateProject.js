import React, {Component} from 'react';
import {Image} from "react-bootstrap";
import {Link} from "react-router-dom";

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
                        <hr/>
                    </div>
                </div>
                </div>
                <div className="row justify-content-sm-start text-center ">
                        <div className="col-sm-3 d-none d-sm-block justify-content-sm-start"  >
                        <div className="font-plex vertical-line text-center">Identifier </div>
                        </div>
                    <div className="col-sm-6 d-none d-sm-block" >
                        <div className="font-plex vertical-line text-left">Description</div>
                    </div>
                    <div className="col-sm-2 d-none d-sm-block" >
                        <div className="font-plex vertical-line text-left">Options</div>
                    </div>
                </div>
                <div className="row justify-content-sm-center">
                    <div className="col-sm-10 d-none d-sm-block"> <hr/></div>
                </div>

            </React.Fragment>
        );
}

export default CreateProject;