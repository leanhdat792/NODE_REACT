import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';
import DefaultProfile from '../images/avatar.png';
import DeleteUser from './DeleteUser';
import FollowProfileButton from "./FollowProfileButton";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], follower: [] },
            redirectToSignin: false,
            following: false,
            error: ''
        }
    }

    clickFollowButton = callApi => {
        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;
        callApi(userId, token, this.state.user._id)
        .then(data => {
            if(data.error){
                this.setState({error: data.error});
            } else {
                this.setState({user: data, following: !this.state.following});
            }
        })
    }

    // check follow
    checkFollow = user => {
        const jwt = isAuthenticated();
        const match = user.followers.find(follower => {
            // one id has many other ids (followers) and vice versa
            return follower._id === jwt.user._id;
        });
        return match;
    }

    init = (userId) => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirectToSignin: true });
            } else {
                let following = this.checkFollow(data);
                this.setState({ user: data, following });
            }
        });
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId);
    }

    render() {
        const { redirectToSignin, user } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />
        const photoUrl = user._id ? `http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}`: DefaultProfile;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-6">
                        <img 
                            style={{height: "200px", width:'auto'}}
                            className="img-thumbnail"
                            onError = {i => (i.target.src = `${DefaultProfile}`)}
                            src={photoUrl} 
                            alt={user.name} 
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="lead ml-5">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                            <div className="d-inline-block">
                                <Link className="btn btn-raised btn-success me-3" to={`/user/edit/${user._id}`}>Edit Profile</Link>
                                <DeleteUser userId={user._id} />
                            </div>
                        ) : (
                            <FollowProfileButton 
                                following={this.state.following}
                                onButtonClick={this.clickFollowButton}
                            />
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <p className="lead">{user.about}</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile;
