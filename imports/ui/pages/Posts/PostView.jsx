import React, { Component } from 'react';
import Comments from './Comments';

class PostView extends Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
    }

    remove = () => {
        const { history } = this.props;
        Meteor.call('post.remove', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            } else {
                alert('Post removed!')
                history.push('/posts');
            }
        });
    }

    canRemove = (userId) => {
        return Meteor.userId() === userId;
    };

    render() {
        const { history } = this.props;
        const { post } = this.state;

        if (!post) {
            return <div>Loading....</div>
        }

        return (
            <div key={post._id}>
                <p>Post id: {post._id} </p>
                <p>
                Post title: {post.title},
                <br />
                Post Description: {post.description}
                <br />
                Post Type: {post.type}
                <br />
                Post Views: {post.views}
                <br />
                UserId: {post.userId}
                </p>

                <button onClick={() => history.push("/posts/edit/" + post._id)}> Edit post </button>
                {this.canRemove(post.userId) ? <button onClick={this.remove}> Remove post</button> : null}
                <button onClick={() => history.push('/posts')}>Back to posts</button>

                <Comments postId={post._id} postOwner={post.userId} />
            </div>
        );
    }
}

export default PostView;