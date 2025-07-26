// utils/zodResolver.ts
import type { FieldErrors, FieldValues, ResolverResult, ResolverOptions } from 'react-hook-form';
import type { ZodType } from 'zod';

export const zodResolver = <T extends FieldValues = FieldValues>(
  schema: ZodType<T>
) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  return (
    values: T,
    _context?: any,
    _options?: ResolverOptions<T>
  ): ResolverResult<T> => {
      /* eslint-enable @typescript-eslint/no-unused-vars */
    console.log('Custom resolver called with values:', values);
    
    const result = schema.safeParse(values);
    console.log('Schema validation result:', result);
    
    if (result.success) {
      return {
        values: result.data,
        errors: {},
      };
    } else {
      const fieldErrors: Record<string, any> = {};
      
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join('.');
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = {
            type: issue.code,
            message: issue.message,
          };
        }
      });
      
      console.log('Validation errors:', fieldErrors);
      
      return {
        values: {},
        errors: fieldErrors as FieldErrors<T>,
      };
    }
  };
};