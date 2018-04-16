import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import { AutoForm, LongTextField, SubmitField, ErrorsField } from 'uniforms-unstyled';
import { Comments } from '/db';
import CommentSchema from '/db/comments/schema';

class CommentListReactive extends Component {
    constructor(props) {
        super(props);
    }

    remove = (commentId) => {
        Meteor.call('comment.remove', commentId, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Comment removed!')
        });
    }

    submit = (comment) => {
        Meteor.call('comment.create', comment, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Comment added!')
        });
    };

    render() {
        const { comments } = this.props;
        const model = {
            postId: this.props.postId
        };

        if (!comments) {
            return <div>Loading....</div>
        }

        return (
            <div>
                <div className="add-comments">
                    <AutoForm onSubmit={this.submit} schema={CommentSchema} model={model}>
                        <LongTextField name="text" />
                        <ErrorsField />
                        <SubmitField value="Add Comment" />
                    </AutoForm>
                </div>
                <div className="comments">
                    { comments.length > 0 ? comments.map((comment) => {
                        return (
                            <div key={comment._id}>
                                <p>comment text: {comment.text}</p>
                                <button onClick={() => this.remove(comment._id)}> Remove comment
                                </button>
                            </div>
                        )
                    }) : <div>No Comments For Post</div>}
                </div>

            </div>
        );
    }
}

export default withTracker(props => {
    const { postId } = props;
    const handle = Meteor.subscribe('comments', { postId });
    return {
        loading: !handle.ready(),
        comments: Comments.find({ postId }).fetch(),
        ...props
    };
})(CommentListReactive);