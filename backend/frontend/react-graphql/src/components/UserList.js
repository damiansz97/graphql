import React, { Component } from 'react'
//import ReactPaginate from 'react-paginate'

import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import getUsersQuery from '../getUsersQuery';
import getPostsQuery from '../getPostsQuery';

const removeUserMutation = gql`
    mutation RemoveUser($removeUserInput: findUserInput) {
        removeUser(input: $removeUserInput) {
            id
            firstName
            lastName
        }
    }
`;

class UserList extends Component {
    //usersPerPage = 5;
    state = {
        currentIndex: -1,
        buttonActionName: "Add"
    };

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    handleEdit(index) {
        console.log(index);
    };

    handleDelete = index => {
        console.log(index);
    };

    render() {
        return (
            <Query query={getUsersQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Ładuje dane...</div>
                    if (error) return <div>Wystąpił błąd</div>
                    console.log(data);
                    const users = data.getUsers;     
                    return (       
                        <div className="table-responsive">
                            <table className="table table-hover">
                                {
                                    users.length===0?null:<thead className="thead-light"><tr><th scope="col">Rekord</th><th scope="col">First name</th><th scope="col">Surname</th></tr></thead>
                                }
                                <tbody>
                                    {users.map((user,index) => 
                                        <tr key={user.id}>
                                            <td>{index+1}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td className="itemButton">
                                                <button className="btn btn-primary" onClick={() => {
                                                    this.props.handleEdit(user.id, "Update", {
                                                        firstName: user.firstName,
                                                        surname: user.lastName
                                                    });
                                                }}>Edit
                                                </button>
                                            </td>
                                            <td className="itemButton">
                                                <Mutation 
                                                    mutation={removeUserMutation}
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
                                                    {(removeUser, {loading, error}) => (
                                                        <button className="btn btn-primary" onClick={() => {
                                                            console.log(user.id);
                                                            removeUser({
                                                                variables: {
                                                                    removeUserInput: {
                                                                        id: user.id
                                                                    }
                                                                }
                                                            })
                                                            .then(result => {
                                                                console.log(result)
                                                            }); //moze zwrocenie resulta
                                                        }}>Delete
                                                        </button>
                    
                                                    )}
                                                </Mutation>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

export default UserList;


