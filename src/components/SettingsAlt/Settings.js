import ListErrors from '../ListErrors';
import React from 'react';

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
    const { currentUser } = props;

    this.state = {
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
      ...currentUser,
      inProgress: false,
    };
    // correct a quirk in the API response w image = null
    if (currentUser.image === null) {
      this.state.image = '';
    }
    // correct a quirk in the API response w bio = null
    if (currentUser.bio === null) {
      this.state.bio = '';
    }
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
    event.preventDefault();
    const { currentUser, onSubmit } = this.props;
    const { image, username, bio, email, password } = this.state;
    const update = {};
    if (image !== currentUser.image) {
      update.image = image;
    }
    if (username !== currentUser.username) {
      update.username = username;
    }
    if (bio !== currentUser.bio) {
      update.bio = bio;
    }
    if (email !== currentUser.email) {
      update.email = email;
    }
    if (password) {
      update.password = password;
    }
    const updating = Object.keys(update).length;
    onSubmit(currentUser, updating ? update : null, currentUser.token);
    this.setState({ inProgress: true });
  };

  render() {
    const { image, username, bio, email, password, inProgress } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>

          <fieldset className="form-group">
            <input
              name="image"
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={image}
              onChange={this.handleChange} />
          </fieldset>

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
            <textarea
              name="bio"
              className="form-control form-control-lg"
              rows="8"
              placeholder="Short bio about you"
              value={bio}
              onChange={this.handleChange}>
            </textarea>
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
              placeholder="New Password"
              value={password}
              onChange={this.handleChange} />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={inProgress}>
            Update Settings
          </button>

        </fieldset>
      </form>
    );
  }
}


const Settings = props => {
  const { currentUser, onSubmit, onLogout, action, errors } = props;
  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">

            <h1 className="text-xs-center">Your Settings</h1>

            <ListErrors errors={errors}></ListErrors>

            <SettingsForm
              action={action}
              currentUser={currentUser}
              onSubmit={onSubmit} />

            <hr />

            <button
              className="btn btn-outline-danger"
              onClick={onLogout}>
              Or click here to logout.
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
