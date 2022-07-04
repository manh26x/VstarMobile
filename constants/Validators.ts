const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export default {
    userRegex: USER_REGEX,
    pwdRegex: PWD_REGEX
}
