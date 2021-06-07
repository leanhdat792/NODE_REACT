import React, { Component } from 'react';
import { list } from './apiPost';
import DefaultPost from '../images/construction1.jpg';
import { Link } from 'react-router-dom';

class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1
        }
    }

    loadPosts = page => {
        console.log(page);
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data });
            }
        });
    };

    componentDidMount() {
        this.loadPosts(this.state.page);
    }

    loadMore = () => {
        this.setState({ page: this.state.page + 1 });
        this.loadPosts(this.state.page + 1);
    };

    loadLess = () => {
        this.setState({ page: this.state.page - 1 });
        this.loadPosts(this.state.page - 1);
    };

    renderPosts = (posts) => {
        const isColumn = () => {
            const path = window.location.pathname;
            if (path === '/admin') {
                return "4";
            } else {
                return "3";
            }
        }
        return (
            <div className="row">
                {posts.map((post, i) => {
                    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : "";
                    const posterName = post.postedBy ? post.postedBy.name : " Unknown";
                    return (
                        <div className={`col-md-${isColumn()} mb-4`} key={i}>
                            <div className="card">
                                <div className="card-body">
                                    <img
                                        src={`${`http://localhost:8080/api/post/photo/${post._id}`}`}
                                        alt={post.title}
                                        onError={i => i.target.src = `${DefaultPost}`}
                                        className="img-thumbnail mb-3"
                                        style={{ height: "200px", width: "100%", objectFit: "cover" }}
                                    />
                                    <h4 className="card-title">{post.title}</h4>
                                    <p className="card-text">{post.body.substring(0, 100)}</p>
                                    <p className="font-italic mark">
                                        Posted by <Link to={`${posterId}`}>{posterName}{" "}</Link>
                                        on {new Date(post.created).toDateString()}
                                    </p>
                                    <Link to={`/post/${post._id}`} className="btn btn-primary">Read more</Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        const { posts, page } = this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    {!posts.length ? 'Loading...' : 'Recent Posts'}
                </h2>
                {this.renderPosts(posts)}

                {page > 1 ? (
                    <button
                        className="btn btn-raised btn-warning me-3 mt-5 mb-5"
                        onClick={() => this.loadLess()}
                    >
                        Previous
                    </button>
                ) : (
                    ""
                )}

                {(Math.round(posts.length / 2) - 1) ? (
                    <button
                        className="btn btn-raised btn-success mt-5 mb-5"
                        onClick={() => this.loadMore()}
                    >
                        Next
                    </button>
                ) : (
                    ""
                )}
            </div>
        )
    }
}

export default Posts;
