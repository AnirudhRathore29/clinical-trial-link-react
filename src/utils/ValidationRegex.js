export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const MOBILE_NUMBER_REGEX = /^[0-9]{10}$/;

export const PASSWORD_REGEX = /((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]))/;

export const ALLOW_LETTERS_ONLY = /^[a-zA-Z\s]*$/;

export const BANK_ACCOUNT_REGEX = /^\d{9,18}$/;

export const ROUTING_NUMBER_REGEX = /^((0[0-9])|(1[0-2])|(2[1-9])|(3[0-2])|(6[1-9])|(7[0-2])|80)([0-9]{7})$/