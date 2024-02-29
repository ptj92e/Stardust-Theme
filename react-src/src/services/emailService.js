import axios from 'axios';

const EmailService = {
    sendReservation: async function(params) {
        const response = await axios.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            {
                service_id: 'service_snlbumc',
                template_id: 'reservation_request',
                user_id: 'FxjjHVQXAKFna-GrB',
                template_params: params
            }
        );

        return response.status === 200 ? true : false;
    },
    sendUserRegistration: async function(params) {
        const response = await axios.post(
            'https://api.emailjs.com/api/v1.0/email/send',
            {
                service_id: 'service_snlbumc',
                template_id: 'user_registration',
                user_id: 'FxjjHVQXAKFna-GrB',
                template_params: params
            }
        );

        return response.status === 200 ? true : false;
    }
};

export default EmailService;
