import { ADD_TODO, DELETE_TODO, EDIT_ITEM } from '../actions/types';

const initialState = {
    todoList:[
        {
            id:Math.random(),
            textVal:"hello world"
        },
        {
            id:Math.random(),
            textVal:"hello fdfdff"
        },
        {
            id:Math.random(),
            textVal:"item from redux"
        },
        {
            id:Math.random(),
            textVal:"hello world"
        },
        {
            id:Math.random(),
            textVal:"hello fdfdff"
        },
        {
            id:Math.random(),
            textVal:"item from redux"
        },
    ],
};

export default function(state = initialState, action){
    console.log('action in todoreducer', action)
    switch(action.type){
        case ADD_TODO:
            return{
                ...state,
                todoList:[action.payload, ...state.todoList]
            }
        case DELETE_TODO:
            return{
                ...state,
                todoList:state.todoList.filter(items=>(items.id !== action.payload))
            }
        case EDIT_ITEM:
            const idited_val = [...state.todoList]
            idited_val.forEach((todo,index)=>{
            if(action.payload.id == todo.id){
                    idited_val[index]["textVal"] = action.payload.textVal;
                }
            });
            return{
                ...state,
                idited_val
            }
        default:
           return state
    }
}