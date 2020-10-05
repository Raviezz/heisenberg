import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import '../assets/css/landing_page.css';
import personIcon from '../assets/images/business-man.png';
import { connect } from 'react-redux';
import { userActions } from '../redux/_actions';
import ValidateInputs from './auth.validators';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ravitejab
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    justifyContent: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 40,
    width: 120,
    padding: '0 20px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
});

class SignInSide extends React.Component {

  constructor(props) {
    super(props);
    this.props.logout();
    this.state = {
      loginFlag: true,
      username: '',
      email: '',
      password: '',
      submitted: false,
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginForm = this.handleLoginForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValidInputs = this.isValidInputs.bind(this);
  }


  isValidInputs() {
    const { errors, isValid } = ValidateInputs(this.state)
    console.log(errors)
    if (!isValid) {
      this.setState({ errors })
    }

    return isValid;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLoginForm = () => {
    let toggle = this.state.loginFlag
    this.setState({ loginFlag: !toggle })
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true })
    const { loginFlag, email, password } = this.state;
    if (loginFlag && this.isValidInputs()) {
      console.log("Submitting Login form ", email, password);
      if (email && password) {
        this.props.login(email, password);
      }

    } else if (!loginFlag && this.isValidInputs()) {
      console.log("Submitting SignUp form ");
    } else {
      console.log("Something is wrong")
    }


  }

  render() {
    const { classes } = this.props;
    const { loginFlag, email, username, password, submitted, errors } = this.state;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className='introimage' />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar} src={personIcon}>

            </Avatar>
            <Typography component="h1" variant="h5">
              {loginFlag ? 'Log In' : 'Sign Up'}
            </Typography>
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              {loginFlag ? <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  value={email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={this.handleChange}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  value={password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                />
                {/*  <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={submitted}
                >
                  Sign In
            </Button>

              </> :
                <>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    value={username}
                    fullWidth
                    id="username"
                    label="Full Name"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    value={email}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="Phone no"
                    name="phone"
                    autoComplete="phone"
                    onChange={this.handleChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={submitted}
                  >
                    Sign Up
                     </Button>
                </>
              }
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={this.handleLoginForm}>
                    {loginFlag ? "Don't have an account? Sign Up" : "Already have account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid >
    );
  }
}
function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};
export default connect(mapState, actionCreators)(withStyles(useStyles, { withTheme: true })(SignInSide));