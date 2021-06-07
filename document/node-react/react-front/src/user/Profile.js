import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from './apiUser';
import DefaultProfile from '../images/avatar.png';
import DeleteUser from './DeleteUser';
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from './ProfileTabs';
import { listByUser } from '../post/apiPost';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: { following: [], followers: [] },
            redirectToSignin: false,
            following: false,
            error: '',
            about: '',
            posts: []
        }
    }

    clickFollowButton = callApi => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        callApi(userId, token, this.state.user._id)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error });
                } else {
                    this.setState({ user: data, following: !this.state.following });
                }
            });
    };

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
                this.loadPosts(data._id);
            }
        });
    }

    loadPosts = userId => {
        const token = isAuthenticated().token;
        listByUser(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        })
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
        const { redirectToSignin, user, posts } = this.state;
        if (redirectToSignin) return <Redirect to="/signin" />
        const photoUrl = user._id ? `http://localhost:8080/user/photo/${user._id}?${new Date().getTime()}` : DefaultProfile;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Profile</h2>
                <div className="row">
                    <div className="col-md-4">
                        <img
                            style={{ height: "200px", width: 'auto' }}
                            className="img-thumbnail"
                            onError={i => (i.target.src = `${DefaultProfile}`)}
                            src={photoUrl}
                            alt={user.name}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="lead ml-5">
                                    <p>Hello {user.name}</p>
                                    <p>Email: {user.email}</p>
                                    <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
                                </div>
                                {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
                                    <div className="d-inline-block">
                                        <Link className="btn btn-raised btn-info me-3" to={`/post/create`}>Create Post</Link>
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
                            <div className="col-md-5">
                                {isAuthenticated().user &&
                                    isAuthenticated().user.role === "admin" && (
                                        <div class="card mt-5">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    Admin
                                                </h5>
                                                <p className="mb-2 text-danger">
                                                    Edit/Delete as an Admin
                                                </p>
                                                <Link
                                                    className="btn btn-raised btn-success me-3"
                                                    to={`/user/edit/${user._id}`}
                                                >
                                                    Edit Profile
                                                </Link>
                                                <DeleteUser userId={user._id} />
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <p className="lead">{user.about}</p>
                    </div>
                    <hr />
                    <ProfileTabs
                        followers={user.followers}
                        following={user.following}
                        posts={posts}
                    />
                </div>
            </div>
        )
    }
}
export default Profile;
