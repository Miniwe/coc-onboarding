import { Meteor } from 'meteor/meteor'
import PostsServices from './services';
import CommentsServices from '../comments/services';

Meteor.methods({
    'post.create'(post) {
        return PostsServices.createPost({
            ...post,
            userId: this.userId
        });
    },

    'post.list' () {
        return PostsServices.list()
    },

    'post.edit' (_id, post) {
        return PostsServices.update(_id, {
            title: post.title,
            description: post.description,
            type: post.type,
            userId: this.userId
        });
    },

    'post.remove' (_id){
        CommentsServices.remove({ postId: _id });
        return PostsServices.remove(_id);
    },

    'post.get' (_id) {
        PostsServices.updateViews(_id);
        return PostsServices._getPost(_id);

    }
});