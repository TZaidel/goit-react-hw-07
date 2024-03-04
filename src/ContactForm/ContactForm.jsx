import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { addContact } from '../redux/operations.js';
import { useDispatch } from 'react-redux';

import css from './ContactForm.module.css';

const userSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too short!').max(30, 'Too long!').required('Required'),
  phone: Yup.string().min(3, 'Too short!').max(30, 'Too long!').required('Required'),
});

export default function ContactForm() {
  const userId = useId();
  const numId = useId();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
      }}
      validationSchema={userSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        dispatch(addContact({ ...values }));
        actions.resetForm();
      }}
    >
      <Form>
        <label htmlFor={userId}>Name</label>
        <Field name="name" id={userId} required />
        <ErrorMessage name="name" component="span" className={css.error} />
        <label htmlFor={numId}>Number</label>
        <Field name="phone" id={numId} />
        <ErrorMessage name="phone" component="span" className={css.error} />
        <button type="submit" className={css.buttonSubmit}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
