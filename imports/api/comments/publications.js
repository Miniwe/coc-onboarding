import { Comments } from '/db';
import { Meteor } from "meteor/meteor";

Meteor.publish('comments', (query = {}) => {
    return Comments.find(query);
});