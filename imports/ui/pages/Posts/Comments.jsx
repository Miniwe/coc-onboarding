import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import { AutoForm, LongTextField, SubmitField, ErrorsField } from 'uniforms-unstyled';
import { Comments } from '/db';
import { Users } from '/db';
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
            } else {
                this.form.reset();
                alert('Comment added!')
            }
        });
    };

    canRemove = (userId) => {
        return Meteor.userId() === userId || Meteor.userId() === this.props.postOwner;
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
                    <AutoForm onSubmit={this.submit} schema={CommentSchema} model={model} ref={ref => this.form = ref}>
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
                                <p>comment author: {comment.author}</p>

                                {this.canRemove(comment.userId) ? <button onClick={() => this.remove(comment._id)}> Remove comment</button> : null}
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
    let comments = Comments.find({ postId }).fetch();
    comments = comments.map((comment) => {
        return {
            ...comment,
            author: Users.findOne(comment.userId).emails[0].address
        };
    });
    return {
        loading: !handle.ready(),
        comments,
        ...props
    };
})(CommentListReactive);