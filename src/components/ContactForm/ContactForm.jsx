import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export class ContactForm extends Component {
  initialValues = {
    name: '',
    number: '',
  };

  state = {
    name: this.initialValues,
    number: this.initialValues,
  };

  handleSubmit = (values, actions) => {
    this.props.onSubmit(values);

    actions.resetForm();
  };

  validationSchema = () => {
    const regexName =
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    const regexNumber =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

    return Yup.object().shape({
      name: Yup.string()
        .matches(regexName, 'Invalid name')
        .required('Required'),
      number: Yup.string()
        .matches(regexNumber, 'Invalid number')
        .required('Required'),
    });
  };

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
      >
        <Form>
          <label htmlFor="name">
            Name
            <Field
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ErrorMessage component="div" name="name" />
          </label>
          <label htmlFor="number">
            Number
            <Field
              type="tel"
              name="number"
              title="Phone number must be digits and can contain
            spaces, dashes, parentheses and can start with +"
              required
            />
            <ErrorMessage component="div" name="number" />
          </label>

          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    );
  }
}
