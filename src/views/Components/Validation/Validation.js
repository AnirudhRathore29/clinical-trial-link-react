import { MOBILE_NUMBER_REGEX, EMAIL_REGEX, ALLOW_LETTERS_ONLY } from "../../../utils/ValidationRegex";

export const isValidPhoneNumber = (number) => {
    if (number.length === 0) {
        return {
            status: false,
            message: "The phone number field is required."
        }
    } else if (!MOBILE_NUMBER_REGEX.test(number)) {
        return {
            status: false,
            message: "The phone number must be 10 digits."
        }
    }
    return {
        status: true,
        message: "Phone Number is Valid."
    }
}

export const isValidEmailAddress = (email) => {
    if (email.length === 0) {
        return {
            status: false,
            message: "The email address field is required."
        }
    } else if (!EMAIL_REGEX.test(email)) {
        return {
            status: false,
            message: "You have entered an invalid email address!"
        }
    }
    return {
        status: true,
        message: "You have entered a valid email address."
    }
}

export const isValidOnlyLetters = (letters, text) => {
    if (letters.length === 0) {
        return {
            status: false,
            message: `The ${text} field is required.`
        }
    } else if (!ALLOW_LETTERS_ONLY.test(letters)) {
        return {
            status: false,
            message: "Please input alphabet characters only!"
        }
    }
    return {
        status: true,
        message: `${text} is vaild`
    }
}

export const isValidPassword = (pass) => {
    if (pass.length === 0) {
        return {
            status: false,
            message: "The password field is required."
        }
    } else if (pass.length > 0 && pass.length < 6) {
        return {
            status: false,
            message: "The password must be at least 6 characters."
        }
    }
    return {
        status: true,
        message: "Password is vaild"
    }
}