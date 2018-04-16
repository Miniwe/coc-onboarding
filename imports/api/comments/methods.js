import {Meteor} from 'meteor/meteor'
import {Comments} from '/db';

Meteor.methods({
    'comment.create'(comment) {
        comment.userId = this.userId;
        Comments.insert(comment);
    },

    'comment.list' () {
        return Comments.find().fetch();
    },

    'comment.remove' (_id){
        Comments.remove(_id);
    }
});