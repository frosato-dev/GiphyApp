import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './Search.css';

let SearchForm = props => {
  const { handleSubmit, reset, dirty } = props

  return (
    <div className="search">
      <form className="search-form" onSubmit={ handleSubmit }>
        <Field
          className="search-form__input input"
          name="firstName"
          component="input"
          type="text"
          placeholder="Type something here"
        />
        <button
          type="submit"
          className="search-form__submit search-form__button search-form_button--disabled"
        />
        <div
          className={`search-form__clear search-form__button ${dirty || "search-form__clear--hidden"}`}
          onClick={reset}
        />
      </form>
    </div>
  )
}

SearchForm = reduxForm({
  form: 'search'
})(SearchForm)

export default SearchForm;
