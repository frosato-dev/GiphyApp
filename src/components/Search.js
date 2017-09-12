import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './Search.css';

export const FORM_NAME = 'search';

let SearchForm = props => {
  const { handleSubmit, reset, dirty } = props

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
        { !dirty ? false :
          <div
            className="search-form__clear search-form__button"
            onClick={reset}
          />
        }
      </form>
    </div>
  )
}

SearchForm = reduxForm({
  form: FORM_NAME,
})(SearchForm)

export default SearchForm;
