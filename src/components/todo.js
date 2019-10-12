import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import {addItem} from '../actions/todoAction';
import { deleteItem } from '../actions/todoAction';
import { editItem } from '../actions/todoAction';
import Icon from 'react-native-vector-icons/MaterialIcons'

class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:'',
            edit_id:'',
            edit_button:false
        }
    }
    changeHandler = (e) =>{
        this.setState({
            text:e
        })
    }
    submitHandler = (e) =>{
        const myval = {id:Math.random(), textVal:this.state.text}
        if(this.state.text !== ''){this.props.addItem(myval)}
        this.setState({
            text:''
        })
    }
    deleteHandler = (e) => {
        this.props.deleteItem(e)
    }
    editHandler = (e) =>{
        this.setState({
            text:e.textVal,
            edit_id:e.id,
            edit_button:true
        })
    }
    updateHandler = (e) =>{
        this.props.editItem({id:this.state.edit_id, textVal:this.state.text})
        this.setState({
            text:'',
            edit_button:false
        })
    }
    render() {
        const {todoList} = this.props.todos
        console.log('todoList=======', todoList)
        return (
            <React.Fragment>
                <View style={{display:'flex', flexDirection:'row', paddingHorizontal:20, marginTop:20}}>
                    <TextInput
                        style={{ height: 50, flex:2, borderColor: 'gray', borderWidth: 1, borderRadius:5, paddingHorizontal:8 }}
                        placeholder="add item!"
                        onChangeText={this.changeHandler}
                        value={this.state.text}
                    />
                    {
                        this.state.edit_button == false?
                        <TouchableOpacity 
                            style={{ backgroundColor:'#000',height:50, flex:1, marginHorizontal:3, justifyContent:'center',borderRadius:5, alignItems:"center" }}
                            onPress={this.submitHandler}>
                            {/* <Text style={{color:'red',}}>Add</Text>
                            <Icon style={{marginTop:20}} name="add" size={20} color='orange'/> */}
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:'orange', fontSize:25}}>Add</Text>
                                <Text style={{color:'orange', marginHorizontal:4}}><Icon style={{marginTop:20}} name="add" size={35} color='orange'/> </Text>
                            </View>
                        </TouchableOpacity>:
                            <TouchableOpacity 
                            style={{ backgroundColor:'#000',height:50, flex:1, marginHorizontal:5, justifyContent:'center', alignItems:'center' }}
                            onPress={this.updateHandler}>
                            <Text style={{color:'red',}}>Update Item</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={{display:'flex', flexDirection:'column'}}>
                    <Text style={{ borderBottomColor: 'black',borderBottomWidth: 1,}}></Text>
                </View>
                {
                    // todoList.length?todoList.map(item=>(
                    //     <View key={item.id} style={{display:'flex', flexDirection:'row', paddingHorizontal:20, paddingVertical:10}}>
                    //         <Text style={{flex:4,height:40, backgroundColor:'gray', marginHorizontal:2, justifyContent:'center',borderRadius:5, paddingVertical:8, paddingHorizontal:8}}><Text>{item.textVal}</Text></Text>
                    //         <TouchableOpacity style={{backgroundColor:'red', height:40, flex:1, marginHorizontal:2, justifyContent:'center', alignItems:'center',borderRadius:5}} onPress={this.deleteHandler.bind(this, item.id)}>
                    //             <Text>delete</Text>
                    //         </TouchableOpacity>
                    //         <TouchableOpacity style={{backgroundColor:'green', flex:1, height:40, marginHorizontal:2, justifyContent:'center', alignItems:'center',borderRadius:5}} onPress={this.editHandler.bind(this, {id:item.id, textVal:item.textVal})}>
                    //             <Text>Edit</Text>
                    //         </TouchableOpacity>
                    //     </View>
                    // )):<View style={{display:'flex', flexDirection:'row', paddingHorizontal:20, paddingVertical:10}}>
                    //     <Text style={{flex:3,height:40, backgroundColor:'gray', marginHorizontal:2, justifyContent:'center'}}>items not found</Text>
                    // </View>
                }
                <ScrollView>
                <View style={{flexDirection:'row'}}>
                    {
                        todoList.length?<FlatList
                            data={todoList}
                            renderItem={({item})=>
                            <View style={{flexDirection:"row", paddingHorizontal: 20, marginTop:10}}>
                                <Text style={{flex:6,height:40, backgroundColor:'gray', marginHorizontal:2, justifyContent:'center',borderRadius:5, paddingVertical:8, paddingHorizontal:8}}>{item.textVal}
                                </Text>
                                <TouchableOpacity style={{backgroundColor:'', height:40, flex:1, marginHorizontal:2, justifyContent:'center', alignItems:'center',borderRadius:5}} onPress={this.deleteHandler.bind(this, item.id)}>
                                <Text><Icon name='delete' size={30} color='red' /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'', flex:1, height:40, marginHorizontal:2, justifyContent:'center', alignItems:'center',borderRadius:5}} onPress={this.editHandler.bind(this, {id:item.id, textVal:item.textVal})}>
                                <Text><Icon name='edit' size={30} color='green' /> </Text>
                            </TouchableOpacity>
                            </View>}
                            keyExtractor={item => item.id}
                        /> :
                            <Text style={{flex:3,height:40, backgroundColor:'gray', marginHorizontal:2, justifyContent:'center'}}>items not found</Text>
                    }
                </View>

                </ScrollView>

                <View>
                    <Text>
                        {/* <Icon name="delete" size={30} color="orange" /> */}
                    </Text>
                </View>

                
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    todos:state.todo
});
const mapDispatchToProps = (dispatch) =>{
    return{
        addItem:(e)=>{
            console.log('eeeee', e)
            dispatch(addItem(e))
        },
        deleteItem:(e)=>{
            dispatch(deleteItem(e))
        },
        editItem:(e)=>{
            dispatch(editItem(e))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo)