import { Link } from 'react-router-dom';
import ListErrors from '../ListErrors';
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      inProgress: false,
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
    const user = this.state;
    this.props.onSubmit(user);
    event.preventDefault();
  };

  // handleCancel = event => {
  //   event.preventDefault();
  //   const { Space: { _id } = {} } = this.props;
  //   TAO.setCtx({ t: 'Space', a: 'Find', o: 'Portal' }, { Find: { _id } });
  // };

  render() {
    const { errors, onRegister } = this.props;
    const { email, password, inProgress } = this.state;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <Link to="/register" onClick={onRegister}>
                  Need an account?
                </Link>
              </p>

              <ListErrors errors={errors} />

              <form onSubmit={this.handleSubmit}>
                <fieldset>

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
                    Sign in
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

export default Login;
