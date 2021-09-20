import classNames from 'classnames'
import React from 'react';
import './index.scss';

const TextArea = ({className, ...props}) => {
    return (
        <textarea className={classNames(className, 'todo-list-textarea')} name="textarea" {...props}>

        </textarea>
    )
}

export default TextArea;