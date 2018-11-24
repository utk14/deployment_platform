/*eslint react/jsx-filename-extension: 0 */
/* eslint react/forbid-prop-types: 0 */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List'
import HomePageComponent from './HomePageComponent';
import ProgressBar from './loadingSpinner';
import '../styles/AddGitUrl.css';
import * as Rx from 'rxjs';
import { filter, map } from 'rxjs/operators';
import io from 'socket.io-client';
// const env = require('../../../env_config');
import Slide from '@material-ui/core/Slide';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddGitURL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: '',
      open: false,
      username: '',
      password: ''
    }
    this.handleClickButton = this.handleClickButton.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: !this.state.open })
    console.log('username:',this.state.username)
    console.log('pass:',this.state.password)
  }

  componentDidMount() {
    const socket = io();
    console.log('before rxjs');
    Rx.fromEvent(document.getElementById("outlined-email-input"), "click")
    .pipe(map(() => {
        return {
          url : document.getElementById("outlined-email-input2").value,
          username: this.state.username,
          password: this.state.password  
        }; 
        
      }),
        filter((data) => {
          return data.url !== ""
        }))
      .subscribe((collector) => {
        console.log('THIS IS THE URL: *********** ',collector);
        fetch(`/deploy`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "collector": collector
          })
        })
          .then(res => res.json())
          // .then(res => {
          //   if (res) {
          //     console.log('response is: ', res);
          //     this.setState({ context: '' })
          //   }
          //   return res;
          // })
          // .then(res => console.log('this is res: ', res))
      })

    socket.on('chat', (data) => {
      document.getElementById("logger").style.display = 'block';
      document.getElementById("logger").innerHTML += `${data} <br/>`;
    })

  }

  handleClickButton() {
    console.log('inside handleClickButton', this.state.loading);
    if (document.getElementById("outlined-email-input2").value) {
      this.setState({
        context: <ProgressBar />,
        open: false
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { context } = this.state;
    return (
      <div className="main">
        <HomePageComponent />
        <Paper className="root1" elevation={20}>
          <div className="text1">
            <TextField
              id="outlined-email-input2"
              label="GitURL"
              className="textField1"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="outlined"
              color="primary"
              className="button1"
              id="outlined-email-input"
              name="buttonSubmit"
              onClick={this.handleClickButton}
              onPress={this.props.onClick}
            >
              Deploy
            </Button>

            <FormControlLabel
              control={
                <Checkbox
                  // checked={this.handleOpen}
                  onChange={this.handleOpen}
                  value="checkedB"
                  color="primary"
                />
              }
              label="Use webhook"
            />
           {console.log('asfsd',this.state.open)}   
            {
              this.state.open ?
                <div>
                  
                  <TextField id="username"
                    onChange={e => this.handleChange(e)}
                    value={this.state.username}
                    className="inputData"
                    label="Username"
                    // className="textField1"
                    type="text"
                    name="username"
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField id="password"
                    onChange={e => this.handleChange(e)}
                    value={this.state.password}
                    className="inputData"
                    label="Password"
                    // className="textField1"
                    type="password"
                    name="password"
                    margin="normal"
                    variant="outlined"
                  />
                  <Button onClick={this.handleOpen} color="primary">
                    Submit
                  </Button>
                  
                </div>
                : null
            }



            {context}
          </div>
        </Paper>

        <Paper id="logger" className={"root2"} style={{ maxHeight: 150, overflow: 'auto', padding: 20, background: "black", color: "white", display: 'none', fontSize: '0.8rem' }}>
          <List>

          </List>
        </Paper>

      </div>
    )
  }
}

export default AddGitURL;



