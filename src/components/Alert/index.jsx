import React from 'react';
import classNames from 'classnames';
import { ReactComponent as CloseIcon } from './close.svg';
import './index.scss';

const Alert = ({type = 'success', onClose, children, className,...props}) => {

    return (
        <div className={classNames(className, 'alert', {
            'alert-success': type === 'success',
            'alert-danger': type === 'danger'
        })}{...props}>
            {children}
            <button onClick={onClose} className='alert-close'>
                <CloseIcon/>
            </button>
        </div>
    )
}

export default Alert;