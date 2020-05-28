import React, {Component} from 'react';
import '../assests/css/fonts.css'
import ProjectItem from "./ProjectItem";
import ProjectTask from "./ProjectTask";


class Backlog extends Component {
    constructor(props) {
        super(props);


    }
    componentDidMount() {
    }

    render() {
        const todoItems=[];
        const inProgressItems=[];
        const doneItems=[];
        const{project_tasks_prop}=this.props;
        for (let i = 0; i <project_tasks_prop.length ; i++) {
            if( project_tasks_prop[i].status.toUpperCase()==="TO_DO")
                todoItems.push(project_tasks_prop[i]);
            else if( project_tasks_prop[i].status.toUpperCase()==="IN_PROGRESS")
              inProgressItems.push(project_tasks_prop[i]);
            else
                doneItems.push(project_tasks_prop[i]);
        }
        const todo_tasks=todoItems.map((project)=>
            (

            <ProjectTask key={project.id} project_task={project}/>));
        const inprogress_tasks=inProgressItems.map((project)=>
            (

                <ProjectTask key={project.id} project_task={project}/>));
        const done_tasks=doneItems.map((project)=>
            (

                <ProjectTask key={project.id} project_task={project}/>));
        return (
            <div>
                <div className="container ">
                    <div className="row font-plex">
                        <div className="col-md-4">
                            <div className="card text-center shadow-lg">
                                <div className="card-header font-plex bg-secondary text-white">
                                    <h3>TO DO</h3>
                                </div>
                            </div>
                            <div className="shadow-lg">
                            {todo_tasks}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2 shadow-lg">
                                <div className="card-header bg-primary font-plex text-white">
                                    <h3>In Progress</h3>
                                </div>
                            </div>
                            <div className="shadow-lg border-secondary">
                                {inprogress_tasks}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center mb-2 shadow-lg border-info ">
                                <div className="card-header bg-success shadow-lg  text-white">
                                    <h3>Done</h3>
                                </div>
                            </div>
                            <div className="shadow-lg border-info">
                                {done_tasks}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Backlog;