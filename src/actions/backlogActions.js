import React from "react";
import axios from "axios";
import {GET_BACKLOG,DELETE_PROJECT_TASK, GET_ERRORS,GET_PROJECT_TASK} from "./types";

export  const addProjectTask=( backlog_id,project_task,history)=> async dispatch=>
{
    try {
        await axios.post(`http://localhost:8090/api/backlog/${backlog_id}`, project_task);
    dispatch(
        {
            type:GET_ERRORS,
            payload:{}
        }
    );
        history.push(`/projectBoard/${backlog_id}`)
    }
    catch (e) {
        dispatch(
            {
                type:GET_ERRORS,
                payload:e.response.data
            }
        );
    }
}
export const clearErrors=()=>async dispatch=>
{
    dispatch(
        {
            type:GET_ERRORS,
            payload:{}
        }
    );
}
export const getBacklog=( backlog_id)=> async  dispatch=>
{
    try
    {
        const res=await axios.get(`http://localhost:8090/api/backlog/${backlog_id}`);
        dispatch(
            {
                type:GET_BACKLOG,
                payload:res.data
            }
        );

    }catch (error) {
        dispatch(
            {
                type:GET_ERRORS,
                payload:error.response.data
            });

    }
}
export const getProjectTask=( backlog_id,pt_id,history)=> async  dispatch=>
{
    try
    {
        const res=await axios.get(`http://localhost:8090/api/backlog/${backlog_id}/${pt_id}`);
        console.log("post rewuest of getProject taks",res.data);
        dispatch(
            {
                type:GET_PROJECT_TASK,
                payload:res.data
            }
        );

    }catch (error) {
        dispatch(
            {
                type:GET_ERRORS,
                 payload:error.response.data
            }
            );
    }
}
export const deleteProjectTask=( backlog_id,pt_id)=> async  dispatch=>
{
if( window.confirm(`Are You sure you wanna delete task ${pt_id}`))
{
    await axios.delete(`http://localhost:8090/api/backlog/${backlog_id}/${pt_id}`);
    dispatch(
        {
            type:DELETE_PROJECT_TASK,
            payload:pt_id
        }
    )
}

}