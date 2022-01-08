import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
//import getUsersQuery from '../getUsersQuery'
import getPostsQuery from '../getPostsQuery';
import PostSelectInput from './PostSelectInput';


const createPostMutation = gql`
    mutation AddPost($addPostInput: addPostInput) { 
        addPost(input: $addPostInput) {
            id
            title
            content
            premium
        }
    }
`

const updatePostMutation = gql`
    mutation UpdatePost($updatePostInput: updatePostInput) {
        updatePost(input: $updatePostInput) {
            id
            title
            content
            premium
        }
    }
`

class PostForm extends Component {
    
    selectInput = React.createRef(null);

    

    componentDidUpdate(prevProps, prevState) {
        console.log("Zamiana - komponent sie zmienil");
        if(prevProps.updatePostIndex!==this.props.updatePostIndex)
        {
            console.log("przed");
            if(this.selectInput.current)
                {
                    this.selectInput.current.value = this.props.post.author;
                    console.log("cokolwiek");
                    
                }
        }
    
                // zmiana warunku (zastanowic sie kiedy rerenderuje sie komponent)

    }

    render() {
        if(this.props.updatePostIndex===-1)
        {
            return (

                
                <Mutation 
                    mutation={createPostMutation}
                    refetchQueries={[
                        {
                            query: getPostsQuery
                        }
                    ]}
                    awaitRefetchQueries={true}
                >
                    {(addPost, {loading, error}) => (
                        <form 
                            autoComplete="off" 
                            onSubmit={e => {
                                e.preventDefault();
                                addPost({
                                    variables: {
                                        addPostInput: {
                                            title: this.props.post.title,
                                            content: this.props.post.content,
                                            premium: this.props.post.premium === 'true',
                                            userId: this.props.post.author=parseInt(this.props.post.author) // zmiana 
                                        }
                                    }
                                })
                                .then(result => {
                                    console.log(result);
                                    this.props.handleAddOrUpdate(-1, "Add", {title: '', content: '', premium: '', author: ''});
                                    if(this.selectInput.current)
                                    {
                                        this.selectInput.current.value = '';
                                        console.log("w add");
                                        
                                    }
                                });
                            }}>
                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="title" className="col-sm-3 col-form-label">Title:</label>
                                    <div className="col-sm-9">
                                        <input id="title" className="form-control form-control-sm" aria-describedby="titleHelp" name="title" type="text" placeholder="e.g. GraphQL" value={this.props.post.title} onChange={this.props.handleInputChange} required minLength="5" pattern="^[A-Za-z]+$"/>
                                    </div>
                                </div>
                                <small id="titleHelp" className="form-text text-muted">Title should have minimum 5 letters.</small>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="content" className="col-sm-3 col-form-label">Content:</label>
                                    <div className="col-sm-9">
                                        <input id="content" className="form-control form-control-sm" aria-describedby="contentHelp" name="content" type="text" placeholder="e.g. A query language for your API" value={this.props.post.content} onChange={this.props.handleInputChange} required minLength="10"/>
                                    </div>
                                </div>
                                <small id="contentHelp" className="form-text text-muted">Content should have minimum 10 letters.</small>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-3">Premium</div>
                                    <div className="col-sm-9">
                                        <div className="form-check form-check-inline">
                                            <input id="yesPremium" className="form-check-input" name="premium" value="true" type="radio" checked={this.props.post.premium === 'true'} onChange={this.props.handleInputChange} required/>
                                            <label htmlFor="yesPremium" className="form-check-label">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input id="noPremium" className="form-check-input" name="premium" value="false" type="radio" checked={this.props.post.premium === 'false'} onChange={this.props.handleInputChange} required/>
                                            <label htmlFor="noPremium" className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                   <PostSelectInput 
            handleInputChange={this.props.handleInputChange}
            selectInput={this.selectInput}
            
            
            />
                            
            
                            <button type="submit" className="btn btn-primary">{this.props.buttonActionName}</button>
                        </form>
                    )}
                </Mutation>  
                
            );
        }
        else
        {
            return (
                <Mutation 
                    mutation={updatePostMutation}
                    refetchQueries={[
                        {
                            query: getPostsQuery
                        }
                    ]}
                    awaitRefetchQueries={true}
                >
                    {(updatePost, {loading, error}) => (
                        <form 
                            autoComplete="off" 
                            onSubmit={e => {
                                e.preventDefault();
                                //console.log(this.props.updatePostIndex);
                                console.log(this.props.post.author);
                                console.log(typeof(this.props.post.author));
                                updatePost({
                                    variables: {
                                        updatePostInput: {
                                            id: this.props.updatePostIndex,
                                            title: this.props.post.title,
                                            content: this.props.post.content,
                                            premium: this.props.post.premium === 'true',
                                            author: parseInt(this.props.post.author)
                                        }
                                    }
                                })
                                .then(result => {
                                    console.log(result);
                                    this.props.handleAddOrUpdate(-1, "Add", {title: '', content: '', premium: '', author: ''});
                                    if(this.selectInput.current)
                                    {
                                        this.selectInput.current.value = '';
                                        console.log("w update");
                                        
                                    }
                                });
                            }}>
                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="title" className="col-sm-3 col-form-label">Title:</label>
                                    <div className="col-sm-9">
                                        <input id="title" className="form-control form-control-sm" aria-describedby="titleHelp" name="title" type="text" placeholder="e.g. GraphQL" value={this.props.post.title} onChange={this.props.handleInputChange} required minLength="5" pattern="^[A-Za-z]+$"/>
                                    </div>
                                </div>
                                <small id="titleHelp" className="form-text text-muted">Title should have minimum 5 letters.</small>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="content" className="col-sm-3 col-form-label">Content:</label>
                                    <div className="col-sm-9">
                                        <input id="content" className="form-control form-control-sm" aria-describedby="contentHelp" name="content" type="text" placeholder="e.g. A query language for your API" value={this.props.post.content} onChange={this.props.handleInputChange} required minLength="10"/>
                                    </div>
                                </div>
                                <small id="contentHelp" className="form-text text-muted">Content should have minimum 10 letters.</small>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-3">Premium</div>
                                    <div className="col-sm-9">
                                        <div className="form-check form-check-inline">
                                            <input id="yesPremium" className="form-check-input" name="premium" value="true" type="radio" checked={this.props.post.premium === 'true'} onChange={this.props.handleInputChange} required/>
                                            <label htmlFor="yesPremium" className="form-check-label">Yes</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input id="noPremium" className="form-check-input" name="premium" value="false" type="radio" checked={this.props.post.premium === 'false'} onChange={this.props.handleInputChange} required/>
                                            <label htmlFor="noPremium" className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                   <PostSelectInput 
            handleInputChange={this.props.handleInputChange}
            selectInput={this.selectInput}
            
            />
                            
            
                            <button type="submit" className="btn btn-primary">{this.props.buttonActionName}</button>
                        </form>
                    )}
                </Mutation>
            );
        }
    };
};

export default PostForm;








