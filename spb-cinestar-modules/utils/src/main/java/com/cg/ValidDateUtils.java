package com.cg;

import java.util.regex.Pattern;

public class ValidDateUtils {
    public static final String NUMBER_REGEX = "^\\d+";

    public static final String EMAIL_REGEX = "^[A-Za-z0-9_]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$";

    public static boolean isEmailValid(String email) {
        return Pattern.compile(EMAIL_REGEX).matcher(email).matches();
    }

    public static boolean isNumberValid(String password) {
        return Pattern.compile(NUMBER_REGEX).matcher(password).matches();
    }
}
