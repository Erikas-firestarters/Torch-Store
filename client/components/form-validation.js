export const validate = values => {
  console.log('hitting validate', values)

  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'zipcode',
    'addressLine1',
    'state',
  ];
  if (values.shipping) {
    requiredFields.forEach(field => {
      console.log('field',field)
      if (!values.shipping[field]) {
        console.log('Values field', values.shipping[field])
        errors[field] = 'Required';
        console.log('errors', errors)
      }
    });
  }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  console.log('errors', errors)
  return errors;
};

export const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}
