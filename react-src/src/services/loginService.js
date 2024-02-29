import axios from 'axios';

let authToken

const LoginService = {
    login: async function(email, password) {
        try {
            const response = await axios.post(
                "/wp-json/jwt-auth/v1/token",
                {
                    username: email,
                    password: password
                }
            );

            authToken = response.data.token;
            
            localStorage.clear();
            localStorage.setItem( 'auth-info', JSON.stringify({
                'userToken': authToken,
                'authDate': new Date()
            }));
            
            return authToken;
        }
        catch (error) {
            return '';
        }
    }
};

export default LoginService;
