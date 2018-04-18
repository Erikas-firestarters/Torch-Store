/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/
import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const product = {
  name: 'Basic Badass Torch',
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi, quo hic autem cumque repudiandae facere quos soluta cum obcaecati. Impedit est ex totam dolorum deleniti accusantium cupiditate nobis harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi, quo hic autem cumque repudiandae facere quos soluta cum obcaecati. Impedit est ex totam dolorum deleniti accusantium cupiditate nobis harum.`,
  price: 12.99,
  img: 'https://vignette.wikia.nocookie.net/elderscrolls/images/9/93/TESV_Torch.png/revision/latest?cb=20120619180715',
}

export default class ProductItem extends Component {
  render() {
    return (
      <Card raised="true" >
        <Image src={product.img} />
        <Card.Content>
          <Card.Header>{product.name}</Card.Header>
          <Card.Meta>
            <span className="date">{product.price}</span>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}


