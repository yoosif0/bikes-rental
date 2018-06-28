import * as Yup from 'yup';

const bikeFormSchema = Yup.object().shape({
    weight: Yup.number().min(5, "Weight should be atleast 5 kg").max(300, "Weight should not exceed 300 kg").required('Weight is required!'),
    longitude: Yup.number().min(-180, "Longitude should be atleast -180").max(180, "Longitude should not exceed 180 ").required('Longitude is required!'),
    latitude: Yup.number().min(-90, "Latitude should be atleast -90").max(90, "Latitude should not exceed 90 ").required('Latitude is required!'),
    color: Yup.string().required('Color is required!'),
})

export default bikeFormSchema