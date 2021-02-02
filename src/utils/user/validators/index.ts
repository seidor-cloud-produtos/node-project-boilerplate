import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
    name: yup.string().strict(true).required('The property name is required'),
    surname: yup.string().strict(true).required('The property surname is required'),
    email: yup
        .string()
        .email()
        .strict(true)
        .required('The property email is required'),
});
