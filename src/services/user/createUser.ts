import * as yup from 'yup';
import { UserInterface } from '../../interfaces/user';
import * as repository from '../../repositories/user';
import { ValidateError } from '../../utils/errors/ValidateError';

const CreateUser = async (user_data: UserInterface): Promise<UserInterface> => {
    const userValidateSchema = yup.object().shape({
        age: yup.number().required('The property age is required'),
        name: yup.string().required('The property name is required'),
        surname: yup.string().required('The property surname is required'),
        email: yup.string().email('The value is not a valid email'),
    });

    try {
        await userValidateSchema.validate(user_data, { abortEarly: false });

        return repository.create(user_data);
    } catch (err) {
        throw new ValidateError(400, err.errors, 'Validate error');
    }
};

export default CreateUser;
