import * as Yup from 'yup';

const bikeFormSchema = Yup.object().shape({
    model: Yup.string().min(3, "Model name should be atleast 3 letters").max(20, "Model name should not exceed 20 letters").required('Model name is required!'),
    weight: Yup.number().required('Weight is required!').min(5, "Weight should be atleast 5 kg").max(300, "Weight should not exceed 300 kg"),
    // longitude: Yup.number().min(-180, "Longitude should be atleast -180").max(180, "Longitude should not exceed 180 ").required('Longitude is required!'),
    // latitude: Yup.number().min(-90, "Latitude should be atleast -90").max(90, "Latitude should not exceed 90 ").required('Latitude is required!'),
    color: Yup.string().required('Color is required!'),
})

export default bikeFormSchema