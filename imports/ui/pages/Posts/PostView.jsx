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

    render() {
        const {history} = this.props;
        const {post} = this.state;

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

                <button onClick={() => {
                    history.push("/posts/edit/" + post._id)
                }}> Edit post
                </button>
                <button onClick={() => history.push('/posts')}>Back to posts</button>

                <Comments postId={post._id} />
            </div>
        );
    }
}

export default PostView;