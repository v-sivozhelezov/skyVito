const urlLogin = 'http://localhost:8090/auth/login';
const urlRegister = 'http://localhost:8090/auth/register';

export const fetchPostRegister = async ({
    email,
    password,
    city,
    firstName,
    lastName,
}) => {
    const response = await fetch(urlRegister, {
        method: 'POST',
        url: '/auth/register',
        body: JSON.stringify({
            email,
            password,
            city,
            name: firstName,
            surname: lastName,
        }),
        headers: {
            'content-type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};
export const fetchPostLogin = async ({ email, password }) => {
    const response = await fetch(urlLogin, {
        method: 'POST',
        url: '/auth/login',
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            'content-type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};
