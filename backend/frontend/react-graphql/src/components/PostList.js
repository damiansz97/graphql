import React, { Component } from 'react'
//import ReactPaginate from 'react-paginate'

import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag';
import getPostsQuery from '../getPostsQuery';

const removePostMutation = gql`
    mutation RemovePost($removePostInput: findPostInput) {
        removePost(input: $removePostInput) {
            id
            title
            content
            premium
            author {
                id
                firstName
                lastName
            }
        }
    }
`;

class PostList extends Component {
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
            <Query query={getPostsQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Ładuje dane...</div>
                    if (error) return <div>Wystąpił błąd</div>
                    console.log(data);
                    const posts = data.getPosts;     
                    return (       
                        <div className="table-responsive">
                            <table className="table table-hover">
                                {
                                    posts.length===0?null:<thead className="thead-light"><tr><th scope="col">Rekord</th><th scope="col">Title</th><th scope="col">Content</th><th scope="col">Premium</th><th scope="col">Author</th></tr></thead>
                                }
                                <tbody>
                                    {posts.map((post,index) => 
                                        <tr key={post.id}>
                                            <td>{index+1}</td>
                                            <td>{post.title}</td>
                                            <td>{post.content}</td>
                                            <td>{String(post.premium)}</td>
                                            <td>{post.author.firstName + ' ' + post.author.lastName}</td>
                                            <td className="itemButton">
                                                <button className="btn btn-primary" onClick={() => {
                                                    console.log({title: post.title,
                                                        content: post.content,
                                                        premium: String(post.premium),
                                                        author: parseInt(post.author.id)});
                                                    this.props.handleEdit(post.id, "Update", {
                                                        title: post.title,
                                                        content: post.content,
                                                        premium: String(post.premium),
                                                        author: parseInt(post.author.id)
                                                    });
                                                }}>Edit
                                                </button>
                                            </td>
                                            <td className="itemButton">
                                                <Mutation 
                                                    mutation={removePostMutation}
                                                    refetchQueries={[
                                                        {
                                                            query: getPostsQuery
                                                        }
                                                    ]}
                                                    awaitRefetchQueries={true}
                                                >
                                                    {(removePost, {loading, error}) => (
                                                        <button className="btn btn-primary" onClick={() => {
                                                            console.log(post.id);
                                                            removePost({
                                                                variables: {
                                                                    removePostInput: {
                                                                        id: post.id
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

export default PostList;


