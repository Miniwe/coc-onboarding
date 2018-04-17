const PostTypesEnum = {
    NATURE: 'nature',
    PSYCHOLOGY: 'psychology',
    MUSIC: 'music',
    PROGRAMMING: 'programming',
    OTHER: 'other',

}
// maybe you want to have them used as human readable
const PostTypesLabels = {
    [PostTypesEnum.NATURE]: 'Nature',
    [PostTypesEnum.PSYCHOLOGY]: 'Psychology',
    [PostTypesEnum.MUSIC]: 'Music',
    [PostTypesEnum.PROGRAMMING]: 'Programming',
    [PostTypesEnum.OTHER]: 'Project Management - Other',
};

export default PostTypesEnum;

export {
    PostTypesEnum,
    PostTypesLabels,
}