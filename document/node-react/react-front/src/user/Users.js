import React, { Component } from 'react';
import { list } from './apiUser';
import DefaultProfile from '../images/avatar.png';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        })
    }

    renderUsers = (users) => (
        <div className="row">
            {users.map((user, i) => (
                <div className="col-md-3 mb-4" key={i}>
                    <div className="card">
                        <img 
                            style={{height: "200px", width:'auto', 'object-fit':'cover'}}
                            className="img-thumbnail"
                            src={`http://localhost:8080/user/photo/${user._id}`}
                            onError = {i => (i.target.src = `${DefaultProfile}`)}
                            alt={user.name} 
                        />
                        <div className="card-body">
                            <h4 className="card-title">{user.name}</h4>
                            <p className="card-text">{user.email}</p>
                            <Link to={`/user/${user._id}`} className="btn btn-primary">View profile</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                {this.renderUsers(users)}
            </div>
        )
    }
}

export default Users;