import { AppBar, Button, Container, Drawer, Icon, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from '../../theme/useStyles';
import { Link } from 'react-router-dom';

const MenuAppBar = () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const openToggle = () => {
        setOpen(true);
    }

    const closeToggle = () => {
        setOpen(false);
    }

    return (
        <AppBar position="static" className={classes.appBar}>
            <Container>
                <Toolbar>
                    <div className={classes.sectionMobile}>
                        <IconButton color="inherit" onClick={openToggle}>
                            <Icon fontSize="large">menu</Icon>
                        </IconButton>
                    </div>
                    <Drawer
                        open={open}  
                        onClose={closeToggle}>
                        <div className={classes.list}>
                            <List>
                                <ListItem button className={classes.listItem} onClick={closeToggle}>
                                    <Link to="/login" color="inherit" className={classes.linkAppBarMobile} underline="none">
                                        <ListItemIcon className={classes.listItemIcon}>
                                            <Icon>person</Icon>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Login
                                        </ListItemText>
                                    </Link>
                                </ListItem>
                            </List>
                        </div>
                    </Drawer>
                    <div className={classes.grow}>
                        <Link color="inherit" className={classes.linkAppBarLogo} underline="none">
                            <Icon className={classes.mr} fontSize="large">store</Icon>
                            <Typography variant="h5">
                                Autopiezas NEA
                            </Typography>
                        </Link>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <Button color="inherit" className={classes.buttonIcon}>
                            <Link to="/login" color="inherit" className={classes.linkAppBarDesktop} underline="none">
                                <Icon className={classes.mr}>person</Icon>
                                Login
                            </Link>
                        </Button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default MenuAppBar;