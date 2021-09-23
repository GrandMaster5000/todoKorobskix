import React from 'react';
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
    IconButton
} from 'mdc-react';
import { NavLink } from 'react-router-dom';
import './AppDrow.scss';

import useStore from '../../hooks/store';


const AppDrawer = ({lists}) => {
    const {state, actions} = useStore();

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
                            >
                                <ListItemGraphic>
                                    <Icon>list</Icon>
                                </ListItemGraphic>

                                <ListItemText>
                                    {i.title}
                                </ListItemText>

                                  <ListItemMeta>
                                    
                                </ListItemMeta>
                            </ListItem>
                        ))}
                    </List>
                </ListGroup>

           </DrawerContent>
        </Drawer>
        
        
    )
}

export default AppDrawer;