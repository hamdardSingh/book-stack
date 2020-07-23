import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

const themeStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  }
}));

export const Header = () => {
  const classes = themeStyles();
  return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MYReads
          </Typography>
          <Link to="/search" className="icon-link">
          <IconButton aria-label="search" color="inherit">
            <SearchIcon />
          </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    )
}
