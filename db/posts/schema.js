import SimplSchema from 'simpl-schema';
import uniforms from 'uniforms-unstyled';
import SelectField from 'uniforms-unstyled/SelectField';
import {PostTypesEnum, PostTypesLabels} from './enums/types';

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
        allowedValues: () => Object.values(PostTypesEnum),
        uniforms: {
            component: SelectField,
            transform(id) {
                return PostTypesLabels[id];
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