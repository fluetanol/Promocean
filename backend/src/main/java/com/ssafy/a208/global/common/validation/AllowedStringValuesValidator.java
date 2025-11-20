package com.ssafy.a208.global.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Set;

public class AllowedStringValuesValidator implements ConstraintValidator<AllowedStringValues, String> {

    private Set<String> allowedValues;

    @Override
    public void initialize(AllowedStringValues constraintAnnotation) {
        allowedValues = Set.of(constraintAnnotation.value());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) return true;
        return allowedValues.contains(value);
    }
}