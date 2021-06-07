import React, { Component } from 'react';
import { comment, uncomment } from './apiPost';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import DefaultProfile from '../images/avatar.png';

class Comment extends Component {
    state = {
        text: "",
        error: ""
    }

    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    }

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 150) {
            this.setState({ error: "Comment should not be empty and less than 150 characters long" });
            return false;
        }
        return true;
    }

    addComment = e => {
        e.preventDefault();

        if (!isAuthenticated()) {
            this.setState({ error: "Please signin to leave a comment" });
            return false;
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;
            comment(userId, token, postId, { text: this.state.text }).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    this.setState({ text: '' });
                    // dispatch fresh list of comments to parent (SinglePost)
                    this.props.updateComments(data.comments);
                }
            });
        }
    }

    deleteComment = (comment) => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;
        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    }

    deleteConfirmed = (comment) => {
        let answer = window.confirm("Are you sure you want to delete your comment?");
        if (answer) {
            this.deleteComment(comment);
        }
    }

    render() {
        const { comments } = this.props;
        const { error } = this.state;
        return (
            <div className="mb-5">
                <h2 className="mt-5 mb-3">Leave a comment</h2>
                <form onSubmit={this.addComment} className="mb-3">
                    <div className="form-group">
                        <textarea
                            onChange={this.handleChange}
                            value={this.state.text}
                            className="form-control"
                            placeholder="Leave a comment..."
                            style={{ height: "100px" }}
                        ></textarea>
                        <button className="btn btn-raised btn-primary mt-2">Post</button>
                    </div>
                </form>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>{error}</div>
                <div className="col-md-12">
                    <h3 className="text-primary">{comments.length} Comments</h3>
                    <hr />
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <div className="d-flex align-items-center mb-3">
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img
                                        style={{ borderRadius: "50%", border: '1px solid black', width: '50px', height: '50px' }}
                                        className="float-left me-2"
                                        onError={i => (i.target.src = `${DefaultProfile}`)}
                                        src={`http://localhost:8080/user/photo/${comment.postedBy._id}`}
                                        alt={comment.postedBy.name}
                                    />
                                </Link>
                                <div className="ms-3">
                                    <p className="lead mb-0">{comment.text}</p>
                                </div>
                            </div>
                            <p className="font-italic mark">
                                Posted by <Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}{" "}</Link>
                                on {new Date(comment.created).toDateString()}
                                {isAuthenticated().user && isAuthenticated().user._id === comment.postedBy._id && (
                                    <span onClick={() => this.deleteConfirmed(comment)} className="text-primary float-end me-3">Remove</span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Comment;

