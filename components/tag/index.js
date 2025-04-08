import classes from './tag.module.less';

const Tag = ({ id, tag }) => {
    return (
        <div key={id} className={classes.tag_wrapper}>
            <span className={classes.tag_inner}>{tag}</span>
        </div>
    );
}


export default Tag;