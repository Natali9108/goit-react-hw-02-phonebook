import * as Yup from 'yup';

export const validationSchema = () => {
  const regexName =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  const regexNumber =
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

  return Yup.object().shape({
    name: Yup.string().matches(regexName, 'Invalid name').required('Required'),
    number: Yup.string()
      .matches(regexNumber, 'Invalid number')
      .required('Required'),
  });
};
