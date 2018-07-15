import React, { Component } from 'react';

class TodoList extends Component {
    render() {
      return (
        <div className="todolist">
          {this.props.items.map(item => (
            <TodoItem key={item.id} id={item.id} text={item.text} completed={item.done} onItemCompleted={this.props.onItemCompleted} onDeleteItem={this.props.onDeleteItem} />
          ))}
        </div>
      );
    }
  }

  class TodoItem extends Component {
    constructor(props) {
      super(props);

      this.state = {
        Isclick: false,
        text : this.props.text,
        id : this.props.id
      };

      this.markCompleted = this.markCompleted.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.handinfo = this.handinfo.bind(this);
      this.handleTextUpdate = this.handleTextUpdate.bind(this);
      this.handleUpdateItem = this.handleUpdateItem.bind(this);
      this.handleCancleItem = this.handleCancleItem.bind(this);
    }
    markCompleted(event) {
      this.props.onItemCompleted(this.props.id);
    }
    deleteItem(event) {
      this.props.onDeleteItem(this.props.id);
    }

    handinfo(event){
      
        this.setState({
          Isclick: true
        });
      
       
    }

    handleCancleItem(event){
      event.preventDefault();
      this.setState({
        Isclick: false
      });

      console.log(this.state.Isclick)
    }

    handleUpdateItem(event){
      event.preventDefault();
      this.setState({
        Isclick: false,
        text:this.state.text
      });
    }

    handleTextUpdate(event){
      this.setState({
        text: event.target.value
      });

      
    }
    // Highlight newly added item for several seconds.
    componentDidMount() {
      if (this._listItem) {
        // 1. Add highlight class.
        this._listItem.classList.add("highlight");
  
        // 2. Set timeout.
        setTimeout((listItem) => {
          // 3. Remove highlight class.
          listItem.classList.remove("highlight");
        }, 500, this._listItem);
      }


    }
    render() {
      var itemClass = "row form-check todoitem " + (this.props.completed ? "done" : "undone");
      return (
        <div id="box" className={itemClass} ref={li => this._listItem = li }>
          <div className="col-md-1">
            <input type="checkbox" className="form-check-input" onChange={this.markCompleted} /> 
          </div>
        
          <div className="col-md-10">
            
              
              {this.state.Isclick == true ? 
                
                 <form className="row" onSubmit={this.handleUpdateItem}>
                    <div className="col-md-8">
                      <input type="text" className="form-control" onChange={this.handleTextUpdate} value={this.state.text} placeholder="กรุณากรอกรายการ"/>
                    </div>
                    <div className="col-md-4 btn-box">
                      <button disabled={!this.props.text} className="btn btn-primary">
                        <i className='fa fa-check-circle-o' aria-hidden='true'></i>
                      </button>
                        
                      <a onClick={this.handleCancleItem} className="btn btn-danger btn-paddingleft">
                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                      </a>
                    </div>    
                </form>  

                :<label className="form-check-label"><a onClick={this.handinfo} id="text_todo">{this.state.text}</a> </label>} 

           
          </div>
            
          <div className="col-md-1">
              <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteItem}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
          </div>    
           
        </div>
      );
    }
  }

  export default TodoList;