import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-responsive-modal';
import './App.css';
// step 1 import TodoList.js
import TodoList from './component/todolist';

class App extends Component {
  // step 2 constructor
  constructor(props) {
    super(props);
    const data = JSON.parse(localStorage.getItem('Session_todo'));
    if (data) {
      this.state = data;
    } else {
      this.state = {
        items: [],
        text: "",
        des: "",
        date: "",
        time: "",
        chkall: false,
        open: false,
        complete: 0,
        Iscompleted: false
      };
    }

    // step 3 function
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.markItemCompleted = this.markItemCompleted.bind(this);
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.Chackall = this.Chackall.bind(this);
    this.Delete_list = this.Delete_list.bind(this);
    this.UpdateItem = this.UpdateItem.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.changeViewCompleted = this.changeViewCompleted.bind(this);
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  onOpenModal() {
    this.setState({ open: true });
  }


  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleDesChange(event) {
    this.setState({ des: event.target.value });
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleTimeChange(event) {
    this.setState({ time: event.target.value });
  }

  handleAddItem(event) {
    event.preventDefault();
    var newItem = {
      id: Date.now(),
      text: this.state.text,
      des: this.state.des,
      date: this.state.date,
      time: this.state.time,
      done: false
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: "",
      des: "",
      date: "",
      time: "",
      complete: this.state.complete + 1
    }));
    this.onCloseModal();
  }

  markItemCompleted(itemId) {
    var updatedItems = this.state.items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;
      return item;
    });

    if (this.state.chkall === true) {
      this.setState({
        items: [].concat(updatedItems),
        chkall: false
      });
    } else {
      this.setState({
        items: [].concat(updatedItems)
      });
    }
  }

  Chackall() {
    if (this.state.chkall === true) {
      this.setState({
        chkall: false
      });
    } else {
      this.setState({
        chkall: true
      });
    }

    var CheckItems = this.state.items.map(item => {
      if (this.state.chkall === true) {
        item.done = false;
      } else {
        item.done = true;
      }
      return item;
    });
    this.setState({
      items: [].concat(CheckItems)
    });
  }

  UpdateItem(itemId, itemArray) {
    this.setState({
      items: this.state.items.map(item => item.id === itemId
        ? Object.assign(itemArray) : item)
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

  Delete_list() {
    if (this.state.items.length === 0) {
      alert('No row selected.')
    } else {
      var list_Items = this.state.items.filter(item => item.done === false);
      if (list_Items.length !== this.state.items.length) {
        if (window.confirm('Are you sure you want to delete ?')) {
          this.setState({
            items: [].concat(list_Items)
          });
        }
      } else {
        alert('No row selected.')
      }
    }
  }

  changeViewCompleted() {
    if (this.state.Iscompleted === true) {
      this.setState({ Iscompleted: false });
    } else {
      this.setState({ Iscompleted: true });
    }
  }
  // step 4 ComponentDidUpdate will update data in Localstorage
  componentDidUpdate() {
    localStorage.setItem('Session_todo', JSON.stringify(this.state));
  }
  // step 5 render
  render() {
    const { open } = this.state;
    const complete = this.state.items.filter(item => item.done === true).length;
    return (
      <div>
        <header className="App-header" style={{ marginBottom: "20px" }}>
          <h3 className="apptitle">MY TO DO LIST</h3>
        </header>
        <div className="col-md-8 col-md-offset-2" style={{ marginBottom: "20px" }}>
          <div className="row">
            <div className="col-md-offset-2 col-md-3 count_todocomplete"><a id="text_todo" onClick={this.changeViewCompleted} title="Click for view completed task">{this.state.Iscompleted === true ? <strong>Back</strong> : <strong>{complete >= 0 ? complete : 0} Completed</strong>}</a></div>
            <div className="col-md-5" align="right">
              <button onClick={this.onOpenModal} className="btn"><i className="fa fa-lg fa-plus"></i></button>
            </div>
          </div>
          <div className="row dataContent">
            {this.state.items.length === 0 ?
              <div className="col-md-8 col-md-offset-2 nodata">No data available in TodoList.</div>
              : <div className="col-md-8 col-md-offset-2">
                {this.state.Iscompleted === true ?
                  <TodoList items={this.state.items.filter(item => item.done === true)} onItemCompleted={this.markItemCompleted} onUpdateItem={this.UpdateItem} onDeleteItem={this.handleDeleteItem} />
                  : <TodoList items={this.state.items} onItemCompleted={this.markItemCompleted} onUpdateItem={this.UpdateItem} onDeleteItem={this.handleDeleteItem} />
                }
              </div>
            }
          </div>
          <div className="col-md-offset-2 col-md-2 nopaddingleft-right width_checkall">
            <input type="checkbox" className="form-check-input_main" onChange={this.Chackall} checked={this.state.chkall === true} />
            <span className="checkall">Check all</span>
          </div>
          <div className="col-md-1 deletelist" onClick={this.Delete_list}>
            <i className="fa fa-trash-o" aria-hidden="true"> Delete</i>
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal}>
          <form className="submit_addtodo" onSubmit={this.handleAddItem}>
            <div className="modal-header">
              <h4 className="modal-title">Add New Todo</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="user">Title:</label>
                <input type="text" className="form-control" onChange={this.handleTextChange} value={this.state.text} placeholder="Please input Title" />
              </div>
              <div className="form-group">
                <label htmlFor="des">Description:</label>
                <textarea className="form-control" onChange={this.handleDesChange} value={this.state.des} placeholder="Please input Description">{this.state.des}</textarea>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" className="form-control" onChange={this.handleDateChange} value={this.state.date} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Time:</label>
                    <input type="text" className="form-control" onChange={this.handleTimeChange} value={this.state.time} placeholder="00:00" required />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" disabled={!this.state.text}>Add</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
