import * as yup from 'yup';

export const userSchema = yup.object().shape({
    author: yup.string().strict(true).required('The property author is required'),
    genre: yup.string().strict(true).required('The property genre is required'),
    name: yup.string().strict(true).required('The property name is required'),
    subtitle: yup
        .string()
        .strict(true)
        .required('The property subtitle is required'),
});
