import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
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
import { Copyright } from '../commons';
import { userService } from '../services/auth.service';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

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
  formControl: {
    margin: theme.spacing(1),
  },
  textinput: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '25ch',
    },
    margin: {
      margin: theme.spacing(1),
    },
    formGroup: {
      alignItems: 'center'
    },
  },
});

class SignInSide extends React.Component {

  constructor(props) {
    super(props);
    this.props.logout();
    this.state = {
      loginFlag: true,
      fname: '',
      lname: '',
      email: '',
      phone: '',
      password: '',
      confirmPass: '',
      utype: 0,
      urole: 0,
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
  onClick = (option) => {
    toastr.options.closeButton = true;
    toastr.clear()
    if (option == 'success') {
      toastr.success(`Successfully Registered`);
    } else if (option == 'error') {
      toastr.error(`Error in registration !`);
    }

  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleLoginForm = () => {
    let toggle = this.state.loginFlag
    this.setState({ loginFlag: !toggle })
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ submitted: true })
    const { loginFlag, email, password, phone, fname, lname, confirmPass, utype, urole } = this.state;
    if (loginFlag && this.isValidInputs()) {
      console.log("Submitting Login form ", email, password);
      if (email && password) {
        this.props.login(email, password);
      }

    } else if (!loginFlag && this.isValidInputs()) {
      console.log("Submitting SignUp form ");
      const response = await userService.register(email, phone, fname, lname, confirmPass, utype, urole);
      if (response == true) {
        this.onClick('success')
      } else {
        this.onClick('error')
      }


    } else {
      console.log("Something is wrong")
    }


  }

  render() {
    const { classes } = this.props;
    const { loginFlag, email, fname, lname, phone, password, confirmPass, urole, utype, submitted, errors } = this.state;
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
                <FormGroup className={classes.formGroup} noValidate autoComplete="on">
                  <FormControl variant="standard" className={classes.formControl}>
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
                  </FormControl>
                  <FormControl variant="standard" className={classes.formControl}>
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
                  </FormControl>
                  {/*  <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                  <FormControl variant="standard" className={classes.formControl}>
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
                  </FormControl>
                </FormGroup>
              </> :
                <>
                  <div>
                    <FormGroup className={classes.formGroup} noValidate autoComplete="on">

                      <FormControl variant="standard" className={classes.formControl}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          value={fname}
                          fullWidth
                          id="firstname"
                          label="First Name"
                          name="fname"
                          autoComplete="fname"
                          autoFocus
                          onChange={this.handleChange}

                        />
                      </FormControl>
                      <FormControl variant="standard" className={classes.formControl}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          value={lname}
                          fullWidth
                          id="lastname"
                          label="Last Name"
                          name="lname"
                          autoComplete="lname"
                          autoFocus
                          onChange={this.handleChange}

                        />
                      </FormControl>
                      <FormControl variant="standard" className={classes.formControl}>
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
                      </FormControl>
                      <FormControl variant="standard" className={classes.formControl}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          value={phone}
                          id="phone"
                          label="Phone no."
                          name="phone"
                          autoComplete="phone"
                          onChange={this.handleChange}

                        />
                      </FormControl>
                      <FormControl variant="standard" className={classes.formControl}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          value={password}
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange={this.handleChange}

                        />
                      </FormControl>
                      <FormControl variant="standard" className={classes.formControl}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          value={confirmPass}
                          name="confirmPass"
                          label="Confirm Password"
                          type="password"
                          id="cpassword"
                          autoComplete="current-password"
                          onChange={this.handleChange}

                        />
                      </FormControl>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={utype}
                          name="utype"
                          label="User Type"
                          onChange={this.handleChange}
                        >
                          <MenuItem value={0} disabled>
                            <em>Choose Your Type</em>
                          </MenuItem>
                          <MenuItem value={10}>Interviewer</MenuItem>
                          <MenuItem value={20}>Interviewee</MenuItem>

                        </Select>
                      </FormControl>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="demo-simple-select-outlined"
                          value={urole}
                          name="urole"
                          label="Role"
                          onChange={this.handleChange}
                        >
                          <MenuItem value={0} disabled>
                            <em>Select Your Role</em>
                          </MenuItem>
                          <MenuItem value={10}>Software Developer</MenuItem>
                          <MenuItem value={20}>DevOps Developer</MenuItem>
                          <MenuItem value={30}>Data Science</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl variant="standard" className={classes.formControl}>
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
                      </FormControl>
                    </FormGroup>
                  </div>

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