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
    const regexNameMessage =
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
    const regexNumber =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
    const regexNumberMessage =
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';

    return Yup.object().shape({
      name: Yup.string()
        .matches(regexName, regexNameMessage)
        .required('Required'),
      number: Yup.string()
        .matches(regexNumber, regexNumberMessage)
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
            <Field type="text" name="name" />
            <ErrorMessage name="name" render={msg => <div>{msg}</div>} />
          </label>
          <label htmlFor="number">
            Number
            <Field type="tel" name="number" />
            <ErrorMessage name="number" render={msg => <div>{msg}</div>} />
          </label>

          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    );
  }
}
