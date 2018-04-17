import { Comments } from '/db';

class CommentsServices {
    static createComment(comment) {
        return Comments.insert(comment);
    }

    static list() {
        return Comments.find().fetch();
    }

    static remove(query) {
        return Comments.remove(query);
    }

    static _getComment(commentId) {
        return Comments.findOne(commentId);
    }
}

export default CommentsServices;
