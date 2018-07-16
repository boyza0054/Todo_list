import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import TodoList from './component/todolist'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      items: [],
      text: "",
      chkall:false

    };
    
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.markItemCompleted = this.markItemCompleted.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.Chackall = this.Chackall.bind(this);
    this.Delete_list = this.Delete_list.bind(this);
  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleAddItem(event) {
    event.preventDefault();

    var newItem = {
      id: Date.now(),
      text: this.state.text,
      done: false
    };
  
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }

  markItemCompleted(itemId) {
    // console.log(this.state,itemId)
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;
      return item;
    });

    if(this.state.chkall === true){
      this.setState({
        items: [].concat(updatedItems),
        chkall: false
      }); 
    }else{
      this.setState({
        items: [].concat(updatedItems)
      });
    }
    
  }

  Chackall(){
    if(this.state.chkall === true){
      this.setState({
        chkall: false
      });
    }else{
      this.setState({
        chkall: true
      });
    }
    
    var CheckItems = this.state.items.map(item => {
      // console.log(this.state)
      if(this.state.chkall === true){
        item.done = false;
      }else{
        item.done = true;
      }  
      return item;
    });
    this.setState({
      items: [].concat(CheckItems)
    });
  }

  handleDeleteItem(itemId) {
    var updatedItems = this.state.items.filter(item => {
      return item.id !== itemId;
    });
    

    this.setState({
      items: [].concat(updatedItems)
    });
  }

  Delete_list(){
   if(this.state.items.length === 0){
    alert('No row selected.')
   }else{
    var list_Items = this.state.items.filter(item => item.done === false);
    
    if(list_Items.length !== this.state.items.length){
      
      if (window.confirm('Are you sure you want to delete ?')) { 
        this.setState({
          items: [].concat(list_Items)
        });
      }
      
    }else{
      alert('No row selected.')
    }
   }
    
  }
 
  render() {
    
    return (
      <div>
      <header className="App-header" style={{marginBottom : "20px"}}>
          <h3 className="apptitle">MY TO DO LIST</h3>
      </header>
      <div className="col-md-8 col-md-offset-2">
        <form className="row">
           <div className="col-md-offset-2 col-md-2 nopaddingleft-right width_checkall">
            <input type="checkbox" className="form-check-input" onClick={this.Chackall} checked={this.state.chkall === true}/> 
            <span className="checkall">Check all</span>
          </div>
          <div className="col-md-1 deletelist" onClick={this.Delete_list}>
                <i className="fa fa-trash-o" aria-hidden="true"> Delete</i>
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} placeholder="กรุณากรอกรายการ"/>
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={this.handleAddItem} disabled={!this.state.text}>Add</button>
          </div>
        </form>
        <div className="row dataContent">
          <div className="col-md-8 col-md-offset-2">
            <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onDeleteItem={this.handleDeleteItem} />
          </div>
        </div>
      </div>
      </div>
    );
  }
}





ReactDOM.render(<App />, document.getElementById("root"));

export default App;
