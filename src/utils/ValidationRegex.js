export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const MOBILE_NUMBER_REGEX = /^[0-9]{10}$/;

export const ONE_CAPITAL_AND_SMALL_LETTER_REGEX = /(?=.*[a-z])(?=.*[A-Z])/;

export const ONE_DIGIT_AND_SPECIAL_CHARACTER = /(?=.*\d)(?=.*[-+_!@#$%^&*.,?])/;

export const PASSWORD_REGEX = /((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]))/;

export const ALLOW_LETTERS_ONLY = /^[a-zA-Z\s]*$/;