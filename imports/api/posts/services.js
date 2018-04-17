import { Posts } from '/db';
import { Comments } from '/db';

class PostsServices {
    static createPost(post) {
        Posts.insert(post);
    }

    static list() {
        return Posts.find().fetch();
    }

    static remove(postId) {
        return Posts.remove(postId);
    }

    static update(postId, data) {
        return Posts.update(postId, { $set: data });
    }

    static updateViews(postId) {
        return Posts.update(postId, { $inc: { views: 1 } });
    }

    static _getPost(postId) {
        return Posts.findOne(postId);
    }
}

export default PostsServices;
