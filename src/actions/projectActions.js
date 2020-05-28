import axios from 'axios'
import {DELETE_PROJECT, GET_ERRORS, GET_PROJECT, GET_PROJECTS} from "./types";
export const createProject=(project,history) => async dispatch=> {
    try {
        const res = await axios.post("http://localhost:8090/api/project", project)
        history.push("/dashboard")
        dispatch(
            {
                type: GET_ERRORS,
                payload: {}//to remove error on succesful operation
            }
        );
    }
    catch (error) {
        dispatch(
            {
                type:GET_ERRORS,
                payload:error.response.data
            }
        )
    }
}
export const clearProjectErrors=()=>async dispatch=>
{
    dispatch(
        {
            type:GET_ERRORS,
            payload:{}
        }
    );
}
export const getProjects=()=>async dispatch=>
{
    const res= await axios.get("http://localhost:8090/api/project/all")
    console.log(res.data);
    dispatch(
        {
            type:GET_PROJECTS,
            payload:res.data
        }
    );
}

export const getProject=(id,history)=>async dispatch=>
{
    const res= await axios.get(`http://localhost:8090/api/project/${id}`);
    console.log(res.data);
        dispatch(
            {
                type: GET_PROJECT,
                payload: res.data
            }
        );

}
export const deleteProject=(id,history)=>async dispatch=>
{
    if( window.confirm(`Are You sure you wanna delete project ${id}`))
    {
    const res= await axios.delete(`http://localhost:8090/api/project/${id}`);
    console.log(res.data);
    dispatch(
        {
            type: DELETE_PROJECT,
            payload: id
        }
    );

}
}


