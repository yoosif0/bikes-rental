import * as Yup from 'yup';

const addressFormSchema = Yup.object().shape({
    address: Yup.string().required(),
})

export default addressFormSchema