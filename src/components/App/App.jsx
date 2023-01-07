import React, { Component } from "react";
import TodoAdd from "../TodoAdd/TodoAdd";
import TodoList from "../TodoList/TodoList";
import TodoHeader from "../TodoHeader/TodoHeader";
import TodoSearch from "../TodoSearch/TodoSearch";

class App extends Component {
  state = {
    todos:[
      {title:'Learn Js', completed:false, importand:false, id:1},
      {title:'Learn React', completed:false, importand:false, id:2},
      {title:'Learn Python', completed:false, importand:false, id:3},
      {title:'Learn Node js', completed:false, importand:false, id:4}
    ],
    term: ''
  }

  addTodo = (newTodo)=>{
    const oldId = this.state.todos.map(element=>element.id )
      const todo  = {title:newTodo,completed:false, importand:false, id:oldId.at(-1)+1 || 1}
      this.setState( {todos:[...this.state.todos,todo]})
  }


  deleteTodo =(id)=>{
    this.setState({todos:this.state.todos.filter(el=> el.id!==id)})

  }

  completeTodo = (id) =>{
    const index = this.state.todos.findIndex(el=>el.id===id)
    const oldTodo = this.state.todos[index]
    const before = this.state.todos.slice(0, index)
    const after = this.state.todos.slice(index +1)
    const upTodo = {
      ...oldTodo, completed: !oldTodo.completed
    } 
    this.setState({todos:[...before, upTodo, ...after]})
    console.log(upTodo);
  }
  impotandTodo = (id) =>{
    const index = this.state.todos.findIndex(el=>el.id===id)
    const oldTodo = this.state.todos[index]
    const before = this.state.todos.slice(0, index)
    const after = this.state.todos.slice(index +1)
    const upTodo = {
      ...oldTodo, importand: !oldTodo.importand
    } 
    this.setState({todos:[...before, upTodo, ...after]})
    console.log(upTodo);
  }

  onSearchChange = ( term ) =>{
    this.setState({term})

  }

  search(items, term) {
    if (term.length === 0) {
      return items
      
    }
    return items.filter((item) => {
      return item.title.toLowerCase().indexOf(term.toLowerCase())>-1
    })
  }
  render() {

    const {todos, term} = this.state
    const visebleItems = this.search(todos, term)
    const doneCount = todos.filter((el) =>el.completed).length //count
    const allCount = todos.length-doneCount


    return (
      <div className="mx-auto" style={{ width: 700 }}>
        <TodoHeader 
        doneCount = {doneCount}
        allCount = {allCount} />
        <TodoSearch onSearchChange = {this.onSearchChange} />
        <TodoList 
        todoData = {visebleItems} 
        onDelete = {this.deleteTodo}
        onCompleted = {this.completeTodo}
        onImportand = {this.impotandTodo}
        />
        <TodoAdd onAddTodo = {this.addTodo}/>git 
      </div>
    );
  }
}

export default App;