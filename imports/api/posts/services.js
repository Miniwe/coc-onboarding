import { Posts } from '/db';

class PostsServices {
    static createPost(post) {
        Posts.insert(post);
    }

    static list() {
        // return Posts.find().fetch();
        return Posts.createQuery({
            title: 1,
            description: 1,
            user: {
                emails: 1
            },
            comments: {
                _id: 1
            }
        }).fetch();
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
