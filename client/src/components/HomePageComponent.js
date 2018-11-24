/*eslint react/jsx-filename-extension: 0 */

import React from 'react';
import "isomorphic-fetch"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import * as Rx from 'rxjs-compat';
import Avatar from '@material-ui/core/Avatar';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom'
import '../styles/homepage.css';



class HomePageComponent extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      listdata: [],
      data: []
    };
  }

  componentWillMount() {
    Rx.Observable.fromPromise(fetch('/profile').then((data) => data.json()))
      .subscribe((data) => {
        this.setState({
          data: data
        })
      },
      (err) => { console.log('err hello')
      window.location.assign('http://localhost:5000/#/')},
      (complete) => { }
      )
  }

  state = {
    open: false,
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };
  
  render() {

    const { open } = this.state;    
  return (
    
    <div className="root">
    
      <AppBar position="static" className="app" >
        <Toolbar className="iconss">
          <Link to={`/home`} className="lnk">
            <IconButton className="menuButton" color="inherit" aria-label="Menu">
              <Home />
            </IconButton>
          </Link>
          <Link to={`/listUrl`} className="lnk">
          <Typography variant="h6" color="inherit" className="grow">
             App 
          </Typography>
          </Link>
          <Link to={`/newApp`} className="lnk">
          <Typography variant="h6" color="inherit" className="grow">
             NewApp 
          </Typography>
          </Link>
          
          {/* <span className="heading">
          Rx-Actor Model</span> */}
        

        <div className="root">
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className="button2"
          >
            <Avatar
                alt="Thumb"
                // src="https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
                src={this.state.data.avatar_url}
                
                />
                &nbsp;&nbsp;
                <i class="fa fa-chevron-down"></i>
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener  onClickAway={this.handleClose}>
                    <MenuList>
                      <h3><strong>{this.state.data.name}</strong></h3>
                      <div className="username">@{this.state.data.username}
                        <br /> {this.state.data.email}
                      </div>
                      <hr/>
                      <MenuItem><a href={this.state.data.web_url} target="_blank"
                      className="buttonmenu">
                      Go to gitlab</a></MenuItem>
                      <MenuItem> <a href={`/logout`} className="buttonmenu" target="_self">Logout</a></MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      

        </Toolbar>
      </AppBar>
    </div>
  );
}
}

export default (HomePageComponent);
