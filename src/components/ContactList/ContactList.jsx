import { getContacts, getFilteredContacts } from 'redux/selectors';
import { GrClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactSlice';
import css from './ContactList.module.css';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilteredContacts);

  const filteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      {filteredContacts().length === 0 && <p>You haven't found any contacts</p>}
      {filteredContacts().map(({ id, name, number }) => {
        return (
          <li key={id} className={css.contactWrapper}>
            <p className={css.contactData}>
              {name} : {number}
            </p>
            <button
              className={css.deleteContactBtn}
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              <GrClose style={{ width: '40px' }} />
            </button>
          </li>
        );
      })}
    </div>
  );
}

export default ContactList;
