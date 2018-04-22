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
} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import stateOptions from './all-states';

export const AddressForm = props => {
  const {
    handleShippingChange,
    handleBillingChange,
    handleShippingDropdownChange,
    handleBillingDropdownChange,
  } = props;
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Input
            label="First name"
            onChange={e => handleShippingChange(e, 'firstName')}
            placeholder="First Name"
            width={8}
          />
          <Form.Input
            label="Last Name"
            onChange={e => handleShippingChange(e, 'lastName')}
            placeholder="Last Name"
            width={8}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Address line 1:"
            onChange={e => handleShippingChange(e, 'addressLine1')}
            width={16}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Address line 2:"
            onChange={e => handleShippingChange(e, 'addressLine2')}
            width={16}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="City:"
            onChange={e => handleShippingChange(e, 'city')}
            width={6}
          />
          <Form.Input
            control={Select}
            label="State:"
            options={stateOptions}
            placeholder="State"
            onChange={handleShippingDropdownChange}
            width={8}
          />
          <Form.Input
            label="Zip Code:"
            onChange={e => handleShippingChange(e, 'zipCode')}
            width={2}
          />
        </Form.Group>
        <Form.Group grouped>
          <Form.Field
            label="Billing address is same as shipping address."
            control="input"
            type="checkbox"
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="First name"
            onChange={e => handleBillingChange(e, 'firstName')}
            placeholder="First Name"
            width={8}
          />
          <Form.Input
            label="Last Name"
            onChange={e => handleBillingChange(e, 'lastName')}
            placeholder="Last Name"
            width={8}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Address line 1:"
            onChange={e => handleBillingChange(e, 'addressLine1')}
            width={16}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="Address line 2:"
            onChange={e => handleBillingChange(e, 'addressLine2')}
            width={16}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            label="City:"
            onChange={e => handleBillingChange(e, 'city')}
            width={6}
          />
          <Form.Input
            control={Select}
            label="State:"
            options={stateOptions}
            placeholder="State"
            onChange={handleBillingDropdownChange}
            width={8}
          />
          <Form.Input
            label="Zip Code:"
            onChange={e => handleBillingChange(e, 'zipCode')}
            width={2}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default AddressForm;
