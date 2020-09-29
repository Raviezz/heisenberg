import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../redux/_actions';
import ValidateInputs from './auth.validators';

import {
    Main,
    Box,
    Grommet,
    Form,
    FormField,
    TextInput,
    Button,
    Text
} from 'grommet';
import { grommet } from 'grommet/themes';




class Login extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        console.log("Submitting ", this.isValidInputs());
        if (this.isValidInputs()) {
            this.setState({ submitted: true });
            const { username, password } = this.state;

            if (username && password) {
                this.props.login(username, password);
            }
        }

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }


    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted, errors } = this.state;
        return (
            <Grommet theme={grommet} full>
                <Main
                    direction="row-responsive"
                    justify="center"
                    align="center"
                    pad="xlarge"
                    background="dark-2"

                >
                    <Box
                        pad="large"
                        align="center"
                        background={{ color: 'light-2', opacity: 'strong' }}
                        round
                        gap="large"
                    >

                        <Form
                            name="form" onSubmit={this.handleSubmit}
                        >
                            <FormField label="Username" name="username">
                                <TextInput name="username" type="text" value={username} onChange={this.handleChange} />
                            </FormField>
                            {errors.username &&
                                <Box pad={{ horizontal: 'small' }}>
                                    <Text size="small" color="status-error">{errors.username}</Text>
                                </Box>
                            }

                            <FormField label="Password" name="password">
                                <TextInput name="password" type="password" value={password} onChange={this.handleChange} />
                            </FormField>
                            {errors.password &&
                                <Box pad={{ horizontal: 'small' }}>
                                    <Text size="small" color="status-error">{errors.password}</Text>
                                </Box>
                            }

                            <Box direction="row" justify="between" margin={{ top: 'small' }}>
                                <Button size="small" type="submit" primary label="SignIn" disabled={loggingIn} />
                                {loggingIn &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }

                                <Button size="small" type="reset" label="Signup" />
                            </Box>

                        </Form>

                    </Box>
                </Main>

            </Grommet >
        );
    }
};

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

export default connect(mapState, actionCreators)(Login);
