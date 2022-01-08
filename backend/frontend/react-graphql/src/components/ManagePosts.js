import React, { Component } from 'react';

import PostForm from './PostForm';
import PostList from './PostList';

class ManagePosts extends Component {
    state = {
      post: {
        title: '',
        content: '',
        premium: '',
        author: ''
      },
      updatePostIndex: -1,
      buttonActionName: "Add"
    }
  
    handleInputChange = e => {
      console.log(e.target.value);
      this.setState(prevState => ({
        post: {
          ...prevState.post,
          [e.target.name]: e.target.value
        }
      }
      
      ));
    };
  
    handleEdit = (index, action, post) => {
      this.setState({
        post: post,
        buttonActionName: action,
        updatePostIndex: parseInt(index)
      })
    }
  
    render() {
      return (
        <React.Fragment>
          <PostForm
            post={{
              title: this.state.post.title,
              content: this.state.post.content,
              premium: this.state.post.premium,
              author: this.state.post.author
            }}
            handleInputChange={this.handleInputChange}
            buttonActionName={this.state.buttonActionName}
            updatePostIndex={this.state.updatePostIndex}
            handleAddOrUpdate={this.handleEdit}      
          />
          <PostList handleEdit={this.handleEdit}/>
        </React.Fragment>
      )
    }
  }
  
  export default ManagePosts;