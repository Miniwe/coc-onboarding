import { Meteor } from 'meteor/meteor'
import CommentsServices from './services';

Meteor.methods({
    'comment.create'(comment) {
        return CommentsServices.createComment({
            ...comment,
            userId: this.userId
        });
    },

    'comment.list' () {
        return CommentsServices.list();
    },

    'comment.remove' (_id){
        return CommentsServices.remove(_id);
    }
});