import { Mongo } from "meteor/mongo";
import CommentSchema from './schema'
import { Posts } from '/db'

const Comments = new Mongo.Collection('Comments');
Comments.attachSchema(CommentSchema);

Comments.addLinks({
    post: {
        type: 'one',
        field: 'postId',
        collection: Posts,
    },
});

export default Comments;