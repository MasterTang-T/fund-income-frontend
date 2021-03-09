const set_token = (token) => {
    sessionStorage.setItem('token', token);
}
const get_token = () => {
   return sessionStorage.getItem('token');
}

export default {
    set_token,
    get_token,
}