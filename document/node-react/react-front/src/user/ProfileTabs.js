import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/avatar.png';

class ProfileTabs extends Component {
    render() {
        const { following, followers, posts } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <h3 className="text-primary">Followers</h3>
                        <hr />
                        {followers.map((person, i) => {
                            return (
                                <div key={i}>
                                    <div>
                                        <Link to={`/user/${person._id}`} className="d-flex align-items-center">
                                            <img
                                                style={{ borderRadius: "50%", border: '1px solid black', width: '100px', height: '100px' }}
                                                className="float-left me-2"
                                                onError={i => (i.target.src = `${DefaultProfile}`)}
                                                src={`http://localhost:8080/user/photo/${person._id}`}
                                                alt={person.name}
                                            />
                                            <div className="ms-3">
                                                <p className="lead">{person.name}</p>
                                            </div>
                                        </Link>
                                        <p style={{ clear: 'both' }}>
                                            {person.about}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Following</h3>
                        <hr />
                        {following.map((person, i) => {
                            return (
                                <div key={i}>
                                    <div>
                                        <Link to={`/user/${person._id}`} className="d-flex align-items-center">
                                            <img
                                                style={{ borderRadius: "50%", border: '1px solid black', width: '100px', height: '100px' }}
                                                className="float-left me-2"
                                                onError={i => (i.target.src = `${DefaultProfile}`)}
                                                src={`http://localhost:8080/user/photo/${person._id}`}
                                                alt={person.name}
                                            />
                                            <div className="ms-3">
                                                <p className="lead mb-0">{person.name}</p>
                                            </div>
                                        </Link>
                                        <p style={{ clear: 'both' }}>
                                            {person.about}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-md-4">
                        <h3 className="text-primary">Posts</h3>
                        <hr />
                        {posts.map((post, i) => {
                            return (
                                <div key={i}>
                                    <div>
                                        <Link to={`/post/${post._id}`}>
                                            <div>
                                                <p className="lead">{post.title}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileTabs;
