import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { addContact } from '../redux/operations.js';
import { useDispatch } from 'react-redux';

import css from './ContactForm.module.css';

const userSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Too short!').max(30, 'Too long!').required('Required'),
  number: Yup.string().min(3, 'Too short!').max(30, 'Too long!').required('Required'),
});

export default function ContactForm() {
  const userId = useId();
  const numId = useId();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        username: '',
        number: '',
      }}
      validationSchema={userSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        dispatch(addContact({ id: Date.now(), ...values }));
        actions.resetForm();
      }}
    >
      <Form>
        <label htmlFor={userId}>Name</label>
        <Field name="username" id={userId} required />
        <ErrorMessage name="username" component="span" className={css.error} />
        <label htmlFor={numId}>Number</label>
        <Field name="number" id={numId} />
        <ErrorMessage name="number" component="span" className={css.error} />
        <button type="submit" className={css.buttonSubmit}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
