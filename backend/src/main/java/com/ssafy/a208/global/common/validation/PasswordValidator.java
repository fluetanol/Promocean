package com.ssafy.a208.global.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<Password, CharSequence> {

    private int min;
    private int minTypes;
    private Pattern letterPattern;
    private Pattern digitPattern;
    private Pattern specialPattern;
    private static final Pattern WHITESPACE = Pattern.compile("\\s");

    @Override
    public void initialize(Password annotation) {
        this.min = annotation.min();
        this.minTypes = annotation.minTypes();

        this.letterPattern = Pattern.compile("[A-Za-z]");
        this.digitPattern = Pattern.compile("\\d");
        this.specialPattern = Pattern.compile(annotation.specialCharsRegex());
    }

    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext context) {
        if (value == null) return true;

        String s = value.toString();

        if (WHITESPACE.matcher(s).find()) {
            buildMessage(context, "비밀번호에 공백을 포함할 수 없습니다.");
            return false;
        }

        if (s.length() < min) {
            buildMessage(context, "비밀번호는 최소" + min + "자 이상이어야 합니다.");
            return false;
        }

        int types = 0;
        if (letterPattern.matcher(s).find())  types++;
        if (digitPattern.matcher(s).find())   types++;
        if (specialPattern.matcher(s).find()) types++;

        if(types < minTypes){
            buildMessage(context, "비밀번호는 영문/숫자/특수문자 중 " + minTypes + "종류 이상 포함해야 합니다.");
            return false;
        }

        return true;
    }

    private void buildMessage(ConstraintValidatorContext context, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
    }
}