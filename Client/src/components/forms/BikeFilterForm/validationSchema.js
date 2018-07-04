import * as Yup from 'yup';

const bikeFilterFormSchema = Yup.object().shape({
    minWeight: Yup.number().min(5, "Weight should be atleast 5 kg").max(300, "Weight should not exceed 300 kg"),
    maxWeight: Yup.number().min(5, "Weight should be atleast 5 kg").max(300, "Weight should not exceed 300 kg"),
})

export default bikeFilterFormSchema