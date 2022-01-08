import React, { Component } from 'react';

import UserForm from './UserForm';
import UserList from './UserList';

class ManageUsers extends Component {
    state = {
      user: {
        firstName: '',
        surname: ''
      },
      updateUserIndex: -1,
      buttonActionName: "Add"
    }
  
    handleInputChange = e => {
      this.setState(prevState => ({
        user: {
          ...prevState.user,
          [e.target.name]: e.target.value
        }
      }
      ));
    };
  
    handleEdit = (index, action, user) => {
      this.setState({
        user: user,
        buttonActionName: action,
        updateUserIndex: parseInt(index)
      })
    }
  
    render() {
      return (
        <React.Fragment>
          <UserForm
            user={{
              firstName: this.state.user.firstName,
              surname: this.state.user.surname
            }}
            handleInputChange={this.handleInputChange}
            buttonActionName={this.state.buttonActionName}
            updateUserIndex={this.state.updateUserIndex}
            handleAddOrUpdate={this.handleEdit}      
          />
          <UserList handleEdit={this.handleEdit}/>
        </React.Fragment>
      )
    }
  }
  
  export default ManageUsers;