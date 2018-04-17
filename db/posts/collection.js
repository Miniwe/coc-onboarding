import {Mongo} from "meteor/mongo";
import PostSchema from './schema'
import Users from '/db/users/collection'
// import Comments from '/db/comments/collection'

const Posts = new Mongo.Collection('posts');
Posts.attachSchema(PostSchema);

Posts.addLinks({
    user: {
        type: 'one',
        collection: Users,
        field: 'userId',
    },
    // comments: {
    //     type: 'many',
    //     collection: Comments,
    //     field: 'postId'
    // }
});

export default Posts;