import {ADD_TODO, DELETE_TODO, EDIT_ITEM} from './types';

export const addItem = (payload)=>{
    return{
        type:ADD_TODO,
        payload
    }
}

export const deleteItem = (payload)=>{
    return{
        type:DELETE_TODO,
        payload
    }
}

export const editItem = (payload)=>{
    return{
        type:EDIT_ITEM,
        payload
    }
}