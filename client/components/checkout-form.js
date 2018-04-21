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
  Select
} from 'semantic-ui-react';
import NumberFormat from 'react-number-format';
import stateOptions from './all-states'

const CheckoutForm = props => {
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Input label="First name" placeholder="First Name" width={8} />
          <Form.Input label="Last Name" placeholder="Last Name" width={8} />
        </Form.Group>
        <Form.Group>
          <Form.Input label="Address line 1:" width={16} />
        </Form.Group>
        <Form.Group>
          <Form.Input label="Address line 2:" width={16} />
        </Form.Group>
        <Form.Group>
          <Form.Input label="City:" width={6} />
          <Form.Input control={Select} label="State:" options={stateOptions} placeholder="State" width={8} />
          <Form.Input label="Zip Code:"  width={2} />
        </Form.Group>
      </Form>
    </div>
  );
};
{
  /* <Dropdown placeholder='State' search selection options={stateOptions} /> */
}

export default CheckoutForm
