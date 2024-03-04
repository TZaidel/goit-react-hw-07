import Contact from '../Contact/Contact.jsx';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, selectNameFilter } from '../redux/selectors.js';
import { fetchContacts } from '../redux/operations.js';

import css from './ContactList.module.css';

export default function ContactList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  console.log(selectUsers);

  const users = useSelector(selectUsers);
  const name = useSelector(selectNameFilter);
  const visibleUsers = users.filter(user => user.name.toLowerCase().includes(name));
  console.log(visibleUsers);

  return (
    <ul className={css.contactList}>
      {visibleUsers.map(({ id, name, phone }) => (
        <Contact id={id} name={name} key={id} number={phone} />
      ))}
    </ul>
  );
}
