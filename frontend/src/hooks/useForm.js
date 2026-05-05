import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';

/**
 * Custom hook for form management with React Hook Form and Zod validation
 */
export function useFormWithValidation({ schema, defaultValues, onSubmit, options = {} }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
    mode: options.mode || 'onChange', // 'onChange' | 'onBlur' | 'onSubmit'
    reValidateMode: options.reValidateMode || 'onChange',
    ...options,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    getValues,
    trigger,
  } = form;

  // Handle form submission
  const handleFormSubmit = useCallback(
    async (data) => {
      try {
        const result = await onSubmit(data);
        
        if (result?.success === false) {
          // Handle server-side errors
          if (result.errors) {
            Object.entries(result.errors).forEach(([field, message]) => {
              setError(field, {
                type: 'server',
                message,
              });
            });
          }
        }
        
        return result;
      } catch (error) {
        console.error('Form submission error:', error);
        throw error;
      }
    },
    [onSubmit, setError]
  );

  // Reset form
  const handleReset = useCallback(
    (values) => {
      reset(values || defaultValues);
    },
    [reset, defaultValues]
  );

  // Set field value
  const setFieldValue = useCallback(
    (name, value) => {
      setValue(name, value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue]
  );

  // Get field error
  const getFieldError = useCallback(
    (name) => {
      return errors[name]?.message;
    },
    [errors]
  );

  // Check if field has error
  const hasFieldError = useCallback(
    (name) => {
      return !!errors[name];
    },
    [errors]
  );

  return {
    // Form methods
    handleSubmit: handleSubmit(handleFormSubmit),
    reset: handleReset,
    register,
    watch,
    setValue: setFieldValue,
    setError,
    clearErrors,
    getValues,
    trigger,
    
    // Form state
    errors,
    isSubmitting,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    touchedFields: form.formState.touchedFields,
    
    // Helper methods
    getFieldError,
    hasFieldError,
    setFieldValue,
    
    // Original form object (if needed)
    form,
  };
}
