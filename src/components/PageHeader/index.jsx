import React, {useEffect, useRef, useState} from 'react'
import {Typography, IconButton, Icon} from 'mdc-react';
import './index.scss';
import classNames from 'classnames';

const PageHeader = ({list, onSortChange}) => {
    const [isMenuToggle, setMenuToggle] = useState(false);
    const [activateItem, setActivateItem] = useState('title');
    const dropDownRef = useRef(null);

    useEffect(() => {
        if(isMenuToggle) {
            document.addEventListener('click', handleCloseMenu);
        } 
    }, [isMenuToggle])


    const toggleMenu = () => {
        setMenuToggle(!isMenuToggle); 
    };

    const handleCloseMenu = (e) => {
        if(e.target !== dropDownRef) {
            setMenuToggle(false);
            document.removeEventListener('click', handleCloseMenu);
        }
    }

    const handleSort = (sortName) => {
        onSortChange(sortName);
        setActivateItem(sortName);
    }
    
    return (
        <div className='dropdown-menu-wrapper'>
            <Typography 
            className='todo-list__title'
            type='headline4'
            >
                <span>{list && list.title}</span>
                <IconButton onClick={toggleMenu}>
                    <Icon>sort</Icon>
                </IconButton>
            </Typography>

            {isMenuToggle && <div
            className='dropdown-menu'
            ref={dropDownRef}
            >
                <button
                 className={classNames('dropdown-item', {
                    'dropdown-item--activated': activateItem === 'title'
                })}
                onClick={() => handleSort('title')}>По названию</button>
                <button
                className={classNames('dropdown-item', {
                    'dropdown-item--activated': activateItem === 'important'
                })}
                onClick={() => handleSort('important')}>По важности</button>
                <button
                className={classNames('dropdown-item', {
                    'dropdown-item--activated': activateItem === 'completed'
                })}
                onClick={() => handleSort('completed')}>По завершенным</button>
            </div>}
        </div>
    )
}

export default PageHeader;