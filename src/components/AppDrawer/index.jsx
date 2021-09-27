import React, { useState } from 'react';
import {
    Drawer,
    DrawerHeader,
    DrawerContent,
    List,
    ListItem,
    ListItemGraphic,
    ListItemText,
    ListGroup,
    ListDivider,
    ListItemMeta,
    Icon,
    Layout,
    Typography,
    IconButton,
    Button
} from 'mdc-react';
import { NavLink } from 'react-router-dom';
import './AppDrow.scss';
import TextAreaLayout from '../TextAreaLayout';

import useStore from '../../hooks/store';


const AppDrawer = ({lists}) => {
    const {state, actions} = useStore();
    const [isListFormOpen, setListFormOpen] = useState(false);
    const [listTitle, setListTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(e);
        actions.createList({
            title: listTitle,
            userId: state.user.uid
        }).then(() => {
            setListTitle('');
            setListFormOpen(false)
        })
    }

    const handleListTitle = (e) => {
        if(e.code === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    const handleListDelete = (listId) => {
        actions.deleteList(listId);
    }
    return (  
        <Drawer className="mdc-drawer">
            <DrawerHeader
                title='Korobskix Todo'
            >
                <Layout className='layout-user'>
                    <Typography variant="body2">{state.user.email}</Typography>
                    <IconButton onClick={() => actions.signOutUser()} title="Выйти">
                        <Icon>exit_to_app</Icon>
                    </IconButton>
                </Layout>
            </DrawerHeader>

           <DrawerContent>
                <ListGroup>
                    <List>
                        {[
                            {title: 'Задачи', icon: 'home', to: '/', exact: true},
                            {title: 'Важно', icon: 'star', to: '/important'},
                            { title: 'Запланированные', icon: 'event', to: '/planned' }
                        ].map(i => (
                            <ListItem 
                            key={i.title}
                            component={NavLink}
                            to={i.to}
                            exact={i.exact}
                            activeClassName="mdc-list-item--activated"
                            >
                                <ListItemGraphic>
                                    <Icon>{i.icon}</Icon>
                                </ListItemGraphic>

                                <ListItemText>
                                    {i.title}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>

                    <ListDivider element='hr'/>

                    <List>
                        {lists.map(i => (
                            <ListItem 
                            key={i.id}
                            component={NavLink}
                            to={i.id}
                            activeClassName="mdc-list-item--activated"
                            className='list-item-dg'
                            >
                                <ListItemGraphic>
                                    <Icon>list</Icon>
                                </ListItemGraphic>

                                <ListItemText>
                                    {i.title}
                                </ListItemText>

                                <ListItemGraphic className='list-item-gr-fe'>
                                    <IconButton 
                                    onClick={() => handleListDelete(i.id)}
                                    className='list-delete-button'
                                    >
                                        <Icon className='list-icon-delete'>delete</Icon>
                                    </IconButton>
                                </ListItemGraphic>
                            </ListItem>
                        ))}
                    </List>

                    <Layout>
                        {isListFormOpen ?
                            <form>
                                <TextAreaLayout
                                    labelValue='Новая задача'
                                    value={listTitle}
                                    onChange={setListTitle}
                                    placeholder='Добавить задачу'
                                    handleTextarea={handleListTitle}
                                />
                            </form>
                        :
                            <Button 
                            className='add-list-button' 
                            icon={<Icon>add</Icon>}
                            onClick={() => setListFormOpen(true)}
                            >Добавить список</Button>
                        }
                    </Layout>
                </ListGroup>
           </DrawerContent>
        </Drawer>
        
        
    )
}

export default AppDrawer;