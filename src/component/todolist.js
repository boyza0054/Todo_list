import React, { Component } from 'react';
import moment from 'moment';
import uuid from 'node-uuid';
import Modal from 'react-responsive-modal';
// step 1 import moment,uuid and Modal
class TodoList extends Component {
  // step 2 send obj from props to Class TodoItem
  render() {
    return (
      this.props.items.length === 0 ?
        <div className="todolist nodata">No data available in completed tasks.</div>
        : <div className="todolist">
          {this.props.items.map(item => (
            <TodoItem key={uuid()} id={item.id} text={item.text} des={item.des} date={item.date} time={item.time} completed={item.done} onItemCompleted={this.props.onItemCompleted} onUpdateItem={this.props.onUpdateItem} onDeleteItem={this.props.onDeleteItem} />
          ))}
        </div>
    );
  }
}

class TodoItem extends Component {
  // step 3 constructor
  constructor(props) {
    super(props);
    this.state = {
      Isclick: false,
      text: this.props.text,
      oldtext: this.props.text,
      des: this.props.des,
      date: this.props.date,
      time: this.props.time,
      id: this.props.id,
      open: false
    };
    // step 4 function
    this.markCompleted = this.markCompleted.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handinfo = this.handinfo.bind(this);
    this.handleTextUpdate = this.handleTextUpdate.bind(this);
    this.handleDesUpdate = this.handleDesUpdate.bind(this);
    this.handleDateUpdate = this.handleDateUpdate.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.UpdateItem = this.UpdateItem.bind(this);
    this.CancleItem = this.CancleItem.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  markCompleted(event) {
    this.props.onItemCompleted(this.props.id);
  }
  deleteItem(event) {
    if (window.confirm('Are you sure you want to delete ?')) {
      this.props.onDeleteItem(this.props.id);
    }
  }
  handinfo(event) {
    this.setState({ Isclick: true });
  }

  CancleItem(event) {
    this.setState({
      Isclick: false,
      text: this.state.oldtext
    });
  }

  UpdateItem(event) {
    event.preventDefault();
    this.setState({
      Isclick: false,
      text: this.state.text,
      oldtext: this.state.text,
      des: this.state.des,
      date: this.state.date,
      time: this.state.time
    });
    const Newupdate = { id: this.state.id, text: this.state.text, des: this.state.des, date: this.state.date, time: this.state.time }
    this.props.onUpdateItem(this.props.id, Newupdate);
  }

  handleTextUpdate(event) {
    this.setState({ text: event.target.value });
  }

  handleDesUpdate(event) {
    this.setState({ des: event.target.value });
  }

  handleDateUpdate(event) {
    this.setState({ date: event.target.value });
  }

  handleTimeUpdate(event) {
    this.setState({ time: event.target.value });
  }
  // step 5 render
  render() {
    var itemClass = "row form-check todoitem " + (this.props.completed ? "done" : "undone");
    const { open } = this.state;
    const today = moment().format("DD/MM/YYYY");
    const duedate = moment(this.state.date).format("DD/MM/YYYY");
    const time = this.state.time === null ? "00:00" : this.state.time;

    return (
      <div id="box" className={itemClass} ref={li => this._listItem = li}>
        <div className="col-md-1">
          <input type="checkbox" className="form-check-input" onChange={this.markCompleted} checked={this.props.completed} />
        </div>
        <div className="col-md-9">
          {this.state.Isclick === true ?
            <form className="row" onSubmit={this.UpdateItem}>
              <div className="col-md-8">
                <input type="text" className="form-control" onChange={this.handleTextUpdate} value={this.state.text} placeholder="Please input Title" />
              </div>
              <div className="col-md-4 btn-box">
                <button disabled={!this.props.text} className="btn btn-primary">
                  <i className='fa fa-check-circle-o' aria-hidden='true'></i>
                </button>
                <a onClick={this.CancleItem} className="btn btn-danger btn-paddingleft">
                  <i className="fa fa-times-circle" aria-hidden="true"></i>
                </a>
              </div>
            </form>
            : <label className="form-check-label"><a onClick={this.handinfo} id="text_todo">{this.state.text}</a> <div className="duedate">{today === duedate ? "Today " + time : duedate}</div></label>}
        </div>
        <div className="col-md-1 nopaddingleft-right">
          <button type="button" className="btn btn-success btn-sm" onClick={this.onOpenModal}>
            <i className="fa fa-pencil-square-o"></i>
          </button>
        </div>
        <div className="col-md-1 nopaddingleft-right" style={{ width: "35px" }}>
          <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteItem}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </div>
        <Modal open={open} onClose={this.onCloseModal}>
          <form className="submit_addtodo" onSubmit={this.UpdateItem}>
            <div className="modal-header">
              <h4 className="modal-title">Update Todo</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="user">Title:</label>
                <input type="text" className="form-control" onChange={this.handleTextUpdate} value={this.state.text} placeholder="Please input Title" />
              </div>
              <div className="form-group">
                <label htmlFor="des">Description:</label>
                <textarea className="form-control" onChange={this.handleDesUpdate} value={this.state.des} placeholder="Please input Description">{this.state.des}</textarea>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" className="form-control" onChange={this.handleDateUpdate} value={this.state.date} required />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date">Time:</label>
                    <input type="text" className="form-control" onChange={this.handleTimeUpdate} value={this.state.time} placeholder="00:00" />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" disabled={!this.state.text}>Update</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default TodoList;