import css from './Contact.module.css';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../redux/operations.js';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();

  return (
    <li id={id} className={css.contactItem}>
      <div className={css.contactInfoWrap}>
        <h2>{name}</h2>
        <p>{number}</p>
      </div>
      <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
    </li>
  );
}
