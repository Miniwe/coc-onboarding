import SimplSchema from 'simpl-schema';
import uniforms from 'uniforms-unstyled';
import SelectField from 'uniforms-unstyled/SelectField';

const types = {
    nature: 'Nature',
    psychology: 'Psychology',
    music: 'Music',
    programming: 'Programming',
    other: 'Project Management - Other'
};

export default new SimplSchema({
    title: String,
    description: String,
    userId: {
        type: String,
        optional: true
    },
    views: {
        type: Number,
        defaultValue: 0,
        optional: true
    },
    type: {
        type: String,
        allowedValues: () => Object.keys(types),
        uniforms: {
            component: SelectField,
            transform(id) {
                // const res = {
                //     value: id,
                //     text: types[id]
                // };
                // return res;
                return types[id];
            }
        },
        optional: true
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