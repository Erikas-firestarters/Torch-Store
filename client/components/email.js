import React from 'react';
// import { connect } from 'react-redux';
// import { emailSend } from '../store';
import { Card, Image, Header, Segment } from 'semantic-ui-react';

export const Email = props => {
  const {order} = props
  return (
    <Card>
      <Image src="https://vignette.wikia.nocookie.net/elderscrolls/images/9/93/TESV_Torch.png/revision/latest?cb=20120619180715" />

      <Header>Order #{order.id}</Header>
      <Header>Order Date</Header>
        <p>{Date(order.createdAt)}</p>
      <Header>Order Items</Header>
        {order.orderItems &&
          order.orderItems.map(items => (
            <Segment key={items.id}>
              <p>Product {items.product.name}</p>
              <p>Qty: {items.quantity}</p>
            </Segment>
          ))}
      <Header>Total</Header>
      <p>${Number(order.subtotal) + Number(order.tax)}</p>
      <Header>Status</Header>
      <p>{order.status}</p>
    </Card>
  );
};

