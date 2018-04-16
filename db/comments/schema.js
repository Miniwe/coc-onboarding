import SimplSchema from 'simpl-schema';
import uniforms from 'uniforms-unstyled';

export default new SimplSchema({
    text: String,
    userId: {
        type: String,
        optional: true
    },
    postId: {
        type: String
    },
    createdAt: {
        type: Date,
        autoValue() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return { $setOnInsert: new Date() }
            }
            return this.unset();
        },
        optional: true
    }
});