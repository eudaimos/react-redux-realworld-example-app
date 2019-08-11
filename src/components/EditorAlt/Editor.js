import ListErrors from '../ListErrors';
import React from 'react';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    const { article, isNew } = props;
    const { title = '', description = '', body = '', tagList = [] } = isNew ? {} : article;

    this.state = { title, description, body, tagList, tagInput: '', inProgress: false };
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

  addTag = tag => {
    const { tagList } = this.state;
    if (!tagList.includes(tag)) {
      this.setState({
        tagList: [...tagList, tag],
      });
    }
  }

  watchForEnter = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      const tag = ev.target.value;
      this.addTag(tag);
      this.setState({
        tagInput: '',
      });
    }
  };

  removeTagHandler = tag => () => {
    const { tagList } = this.state;
    const tagIdx = tagList.indexOf(tag);
    const newList = tagList.slice();
    newList.splice(tagIdx, 1);
    this.setState({
      tagList: newList,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    const { article, isNew, onSubmit } = this.props;
    let changes = {};
    if (isNew) {
      changes = { title, description, body, tagList };
    } else {
      if (title !== article.title) {
        changes.title = title;
      }
      if (description !== article.description) {
        changes.description = description;
      }
      if (body !== article.body) {
        changes.body = body;
      }
      if (tagList.length !== article.tagList.length) {
        changes.tagList = tagList;
      } else if (tagList.some(tag => !article.tagList.includes(tag))) {
        changes.tagList = tagList;
      }
    }
    onSubmit(changes);
    this.setState({ inProgress: true });
  };

  render() {
    const { title, description, body, tagInput, tagList, inProgress } = this.state;
    const { errors } = this.props;
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={errors}></ListErrors>

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      name="title"
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={title}
                      onChange={this.handleChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      name="description"
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={description}
                      onChange={this.handleChange} />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      name="body"
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={body}
                      onChange={this.handleChange}>
                    </textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      name="tagInput"
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={tagInput}
                      onChange={this.handleChange}
                      onKeyUp={this.watchForEnter} />

                    <div className="tag-list">
                      {
                        (tagList || []).map(tag => {
                          return (
                            <span className="tag-default tag-pill" key={tag}>
                              <i  className="ion-close-round"
                                  onClick={this.removeTagHandler(tag)}>
                              </i>
                              {tag}
                            </span>
                          );
                        })
                      }
                    </div>
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={inProgress}
                    onClick={this.handleSubmit}>
                    Publish Article
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

export default Editor;
