import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import stateOptions from './all-states';
import { Field } from 'redux-form';
import { InputField } from 'react-semantic-redux-form';

const renderStateDropdown = ({
  input,
  label,
  width,
  meta: { touched, error },
  ...custom
}) => (
  <Form.Select
    {...input}
    label={label}
    onChange={(event, { value }) => input.onChange(value)}
    style={{ height: '38px', padding: 0 }}
    placeholder="State"
    search
    selection
    options={stateOptions}
    width={width}
    autoComplete="true"
  />
);

export const AddressForm = props => {
  return (
    <Form.Field style={{ width: '100%' }}>
      <Form.Group>
        <Field
          required
          type="text"
          name="firstName"
          component={InputField}
          label="First name"
          placeholder="First name"
          width={8}
        />

        <Field
          required
          type="text"
          name="lastName"
          label="Last Name"
          component={InputField}
          placeholder="Last Name"
          width={8}
        />
      </Form.Group>
      <Form.Group>
        <Field
          required
          type="text"
          label="Email:"
          name="email"
          placeholder="username@domain.com"
          component={InputField}
          width={16}
        />

      </Form.Group>
      <Form.Group>
        <Field
          required
          type="text"
          label="Address line 1:"
          name="addressLine1"
          placeholder="Address line 1:"
          component={InputField}
          width={16}
        />
      </Form.Group>
      <Form.Group>
        <Field
          type="text"
          name="addressLine2"
          label="Address line 2:"
          placeholder="Address line 2:"
          component={InputField}
          width={16}
        />
      </Form.Group>
      <Form.Group style={{ height: '66px' }}>
        <Field
          required
          type="text"
          name="city"
          label="City:"
          placeholder="City:"
          component={InputField}
          width={6}
        />

        <Field
          required
          type="select"
          name="state"
          label="State:"
          placeholder="State:"
          component={renderStateDropdown}
          width={6}
        />
        <Field
          required
          type="text"
          name="zipcode"
          label="Zip Code:"
          placeholder="Zip Code:"
          component={InputField}
          width={4}
        />
      </Form.Group>
    </Form.Field>
  );
};

const mapState = ({ form: formState }) => ({ formState });
const mapDispatch = null;
export default connect(mapState, mapDispatch)(AddressForm);
