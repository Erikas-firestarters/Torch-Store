import React from 'react';
import {
  Button,
  Item,
  Grid,
  Icon,
  Label,
  Sticky,
  Header,
  Form,
  Dropdown,
  Select,
  Checkbox,
} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import stateOptions from './all-states';
import { Field, reduxForm } from 'redux-form';

const renderTextField = ({
  input,
  type,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <Form.Field>
    <input type={type} placeholder={label} />
    {/* {touched && error ? (
      <Label basic color="red" pointing>
        {error} {...input}
        {...custom}
      </Label>
    ) : (
      <div />
    )} */}
  </Form.Field>
);
const renderSelectField = ({
  input,
  type,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <Form.Field>
    <Select
            control={Select}
            label="State:"
            options={stateOptions}
            placeholder="State"
          />
    {/* {touched && error ? (
      <Label basic color="red" pointing>
        {error} {...input}
        {...custom}
      </Label>
    ) : (
      <div />
    )} */}
  </Form.Field>
);

let AddressForm = props => {
  const {
    handleShippingChange,
    handleBillingChange,
    handleShippingDropdownChange,
    handleBillingDropdownChange,
    handleSubmitButtonRef,
    handleOrderSubmit,
    handleCheckboxChange,
    checkBox,
  } = props;

  return (
    <div>
      <Form onSubmit={handleOrderSubmit}>
        <Form.Group>
          <Field
            name="firstName"
            type="text"
            component={renderTextField}
            label="First name"
          />
          <Field
            name="lastName"
            label="Last Name"
            component={renderTextField}
            placeholder="Last Name"
            width={8}
          />
        </Form.Group>
        <Form.Group>
          <Field
            label="Address line 1:"
            name="addressLine1"
            component={renderTextField}
            width={16}
          />
        </Form.Group>
        <Form.Group>
          <Field
            name="addressLine2"
            label="Address line 2:"
            component={renderTextField}
            width={16}
          />
        </Form.Group>
        <Form.Group>
          <Field
            name="city"
            label="City:"
            component={renderTextField}
            width={6}
          />
          <Field
            name="state"
            control={Select}
            label="State:"
            options={stateOptions}
            placeholder="State"
            component={renderTextField}
            width={8}
          />
          <Field
            name="zipcode"
            label="Zip Code:"
            component={renderTextField}
            width={2}
          />
        </Form.Group>
        <Form.Group grouped>
          <Checkbox
            defaultChecked
            label="Billing address is same as shipping address."
            component={renderTextField}
          />
        </Form.Group>
        {/* {checkBox ? (
          <div />
        ) : (
          <div>
            <Form.Group>
              <Field
                name=""
                label="First name"
                onChange={e => handleBillingChange(e, 'firstName')}
                placeholder="First Name"
                width={8}
              />
              <Field
                name=""
                label="Last Name"
                onChange={e => handleBillingChange(e, 'lastName')}
                placeholder="Last Name"
                width={8}
              />
            </Form.Group>
            <Form.Group>
              <Field
                name=""
                label="Address line 1:"
                onChange={e => handleBillingChange(e, 'addressLine1')}
                width={16}
              />
            </Form.Group>
            <Form.Group>
              <Field
                name=""
                label="Address line 2:"
                onChange={e => handleBillingChange(e, 'addressLine2')}
                width={16}
              />
            </Form.Group>
            <Form.Group>
              <Field
                name=""
                label="City:"
                onChange={e => handleBillingChange(e, 'city')}
                width={6}
              />
              <Field
                name=""
                control={Select}
                label="State:"
                options={stateOptions}
                placeholder="State"
                onChange={handleBillingDropdownChange}
                width={8}
              />
              <Field
                name=""
                label="Zip Code:"
                onChange={e => handleBillingChange(e, 'zipcode')}
                width={2}
              />
            </Form.Group>
          </div>
        )} */}
        <Form.Group>
          <Button as="button" type="submit" ref={handleSubmitButtonRef}>
            Process Order
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

AddressForm = reduxForm({form: 'address'})(AddressForm)

export default AddressForm;
