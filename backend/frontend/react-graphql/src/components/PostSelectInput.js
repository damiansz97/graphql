import React, { Component } from 'react';
import { Query } from 'react-apollo'
import getUsersQuery from '../getUsersQuery'





class PostSelectInput extends Component {

    

    shouldComponentUpdate() {
        return false;
    }

    render() {
        
            return (

                <Query query={getUsersQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Ładuje dane...</div>
                    if (error) return <div>Wystąpił błąd</div>
                    console.log(data);
                    const users = data.getUsers;
                    return (                   
                        <div className="form-group">
                                <div className="row">
                                    <label htmlFor="author" className="col-sm-3 col-form-label">Author</label>
                                    <div className="col-sm-9">
                                        <select id="author" className="form-control form-control-sm" name="author" ref={this.props.selectInput} onChange={this.props.handleInputChange} required>
                                        <option value="" hidden>Select one...</option>
                                            {
                                                users.map((user) => 
                                                    
                                                    <option key={user.id} value={user.id}>{user.firstName + ' ' + user.lastName}</option>
                                                )
                                            }
                                        </select>
                                    </div>  
                                </div>  
                            </div>

                 
                            )
                }}
            </Query>
            );
        
    };
};

export default PostSelectInput;








