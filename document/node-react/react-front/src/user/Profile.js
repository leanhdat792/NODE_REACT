import React, { Component } from 'react';
import { isAuthenticated } from '../auth';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            redirectToSignin: false
        }
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        const test = `${process.env.REACT_APP_API_URL}/user/${userId}`
        console.log(test);
        fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${isAuthenticated().token}`
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.error) {
                console.log("ERROR");
            } else {
                console.log(data);
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <p>Hello {isAuthenticated().user.name}</p>
                <p>Email: {isAuthenticated().user.email}</p>
            </div>
        )
    }
}
export default Profile;
