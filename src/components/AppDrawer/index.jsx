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
    ListGroupSubheader,
    ListDivider,
    Icon
} from 'mdc-react';
import './AppDrow.scss';


const AppDrawer = ({lists}) => {
    return (
        
        <Drawer class="mdc-drawer">
            <DrawerHeader
                title='Korobskix Todo'
            />

           <DrawerContent>
                <ListGroup>
                    <List>
                        {[
                            {title: 'Задачи', icon: 'home'},
                            {title: 'Важно', icon: 'star'},
                        ].map(i => (
                            <ListItem key={i.title}>
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
                            <ListItem key={i.title}>
                            <ListItemGraphic>
                                <Icon>list</Icon>
                            </ListItemGraphic>

                            <ListItemText>
                                {i.title}
                            </ListItemText>
                        </ListItem>
                        ))}
                    </List>
                </ListGroup>

           </DrawerContent>
        </Drawer>
        
        
    )
}

export default AppDrawer;