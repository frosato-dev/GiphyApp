import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import './Search.css';

export const FORM_NAME = 'search';

class SearchForm extends PureComponent {
  render() {
    const { handleSubmit, change, query } = this.props;
    return (
      <div className="search">
        <form className="search-form" onSubmit={ handleSubmit }>
          <Field
            className="search-form__input input"
            name="query"
            component="input"
            type="text"
            placeholder="Type something here"
          />
          <button
            type="submit"
            className="search-form__submit search-form__button search-form_button--disabled"
          />
          { !query ? false :
            <div
              className="search-form__clear search-form__button"
              onClick={change.bind(this, 'query', '')}
            />
          }
        </form>
      </div>
    )
  }
}

SearchForm = reduxForm({
  form: FORM_NAME,
})(SearchForm);

const selector = formValueSelector(FORM_NAME) //
SearchForm = connect(state => {
  const query = selector(state, 'query')
  return {
    query,
  }
})(SearchForm)

export default SearchForm;
