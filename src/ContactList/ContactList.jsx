import Contact from '../Contact/Contact.jsx';
import { useSelector } from 'react-redux';
import { selectUsers, selectNameFilter } from '../redux/selectors.js';

import css from './ContactList.module.css';

export default function ContactList() {
  const users = useSelector(selectUsers);
  const name = useSelector(selectNameFilter);
  const visibleUsers = users.filter(user =>
    user.username.toLowerCase().includes(name)
  );

  return (
    <ul className={css.contactList}>
      {visibleUsers.map(({ id, username, number }) => (
        <Contact id={id} name={username} key={id} number={number} />
      ))}
    </ul>
  );
}
