import { Link } from 'react-router-dom';
import ListErrors from '../ListErrors';
import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      inProgress: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.action === 'fail') {
      return null;
    }
    return {
      inProgress: false
    };
  }

  handleChange = event => {
    const target = event.target;
    const val = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: val
    });
  };

  handleSubmit = event => {
    const { username, email, password } = this.state;
    this.props.onSubmit({ username, email, password });
    event.preventDefault();
    this.setState({ inProgress: true });
  };

  render() {
    const { username, email, password, inProgress } = this.state;
    const { onLogin, errors } = this.props;

    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login" onClick={onLogin}>
                  Have an account?
                </Link>
              </p>

              <ListErrors errors={errors} />

              <form onSubmit={this.handleSubmit}>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      name="username"
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={this.handleChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      name="email"
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      name="password"
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleChange} />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={inProgress}>
                    Sign up
                  </button>

                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Register;
