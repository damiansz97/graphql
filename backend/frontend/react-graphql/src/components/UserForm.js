import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import getUsersQuery from '../getUsersQuery';
import getPostsQuery from '../getPostsQuery';


const createUserMutation = gql`
    mutation AddUser($addUserInput: addUserInput) { 
        addUser(input: $addUserInput) {
            id
            firstName
            lastName
        }
    }
`

const updateUserMutation = gql`
    mutation UpdateUser($updateUserInput: updateUserInput) {
        updateUser(input: $updateUserInput) {
            id
            firstName
            lastName
        }
    }
`

class UserForm extends Component {
    render() {
        if(this.props.updateUserIndex===-1)
        {
            return (
                <Mutation 
                    mutation={createUserMutation}
                    refetchQueries={[
                        {
                            query: getUsersQuery
                        },
                        {
                            query: getPostsQuery
                        }
                    ]}
                    awaitRefetchQueries={true}
                >
                    {(addUser, {loading, error}) => (
                        <form 
                            autoComplete="off" 
                            onSubmit={e => {
                                e.preventDefault();
                                addUser({
                                    variables: {
                                        addUserInput: {
                                            firstName: this.props.user.firstName,
                                            lastName: this.props.user.surname
                                        }
                                    }
                                })
                                .then(result => {
                                    console.log(result);
                                    this.props.handleAddOrUpdate(-1, "Add", {firstName: '', surname: ''});
                                });
                            }}>
                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="firstName" className="col-sm-3 col-form-label">First name:</label>
                                    <div className="col-sm-9">
                                        <input id="firstName" className="form-control form-control-sm" aria-describedby="firstNameHelp" name="firstName" type="text" placeholder="e.g. Jan" value={this.props.user.firstName} onChange={this.props.handleInputChange} required minLength="3" pattern="^[A-Za-z]+$"/>
                                    </div>
                                </div>
                                <small id="firstNameHelp" className="form-text text-muted">First name should have minimum 3 letters.</small>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="surname" className="col-sm-3 col-form-label">Surname:</label>
                                    <div className="col-sm-9">
                                        <input id="surname" className="form-control form-control-sm" aria-describedby="surnameHelp" name="surname" type="text" placeholder="e.g. Kowalski" value={this.props.user.surname} onChange={this.props.handleInputChange} required minLength="3" pattern="^[A-Za-z]+$"/>
                                    </div>
                                </div>
                                <small id="nameHelp" className="form-text text-muted">Surname should have minimum 3 letters.</small>
                            </div>            
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
                    mutation={updateUserMutation}
                    refetchQueries={[
                        {
                            query: getUsersQuery
                        },
                        {
                            query: getPostsQuery
                        }
                    ]}
                    awaitRefetchQueries={true}
                >
                    {(updateUser, {loading, error}) => (
                        <form 
                            autoComplete="off" 
                            onSubmit={e => {
                                e.preventDefault();
                                updateUser({
                                    variables: {
                                        updateUserInput: {
                                            id: this.props.updateUserIndex,
                                            firstName: this.props.user.firstName,
                                            lastName: this.props.user.surname
                                        }
                                    }
                                })
                                .then(result => {
                                    console.log(result);
                                    this.props.handleAddOrUpdate(-1, "Add", {firstName: '', surname: ''});
                                }); //moze zwrocenie resulta
                            }}>
                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="firstName" className="col-sm-3 col-form-label">First name:</label>
                                    <div className="col-sm-9">
                                        <input id="firstName" className="form-control form-control-sm" aria-describedby="firstNameHelp" name="firstName" type="text" placeholder="e.g. Jan" value={this.props.user.firstName} onChange={this.props.handleInputChange} required minLength="3" pattern="^[A-Za-z]+$"/>
                                    </div>
                                </div>
                                <small id="firstNameHelp" className="form-text text-muted">First name should have minimum 3 letters.</small>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label htmlFor="surname" className="col-sm-3 col-form-label">Surname:</label>
                                    <div className="col-sm-9">
                                        <input id="surname" className="form-control form-control-sm" aria-describedby="surnameHelp" name="surname" type="text" placeholder="e.g. Kowalski" value={this.props.user.surname} onChange={this.props.handleInputChange} required minLength="3" pattern="^[A-Za-z]+$"/>
                                    </div>
                                </div>
                                <small id="nameHelp" className="form-text text-muted">Surname should have minimum 3 letters.</small>
                            </div>            
                            <button type="submit" className="btn btn-primary">{this.props.buttonActionName}</button>
                        </form>
                    )}
                </Mutation>
            );
        }
    };
};

export default UserForm;

