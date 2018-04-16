import { Comments } from '/db';
import { Users } from '/db';
import { Meteor } from "meteor/meteor";

Meteor.publish('comments', (query = {}) => {
    const comments = Comments.find(query);
    const usersIds = [];
    comments.fetch().forEach(({userId}) => {
        usersIds.push(userId);
    });
    return [
        comments,
        Users.find({_id: {$in: usersIds} })
    ];
});