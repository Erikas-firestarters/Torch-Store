/* eslint react/prefer-stateless-function: 0 class-methods-use-this:0*/
import React, { Component } from 'react';
import { Container, Image, Header, Segment } from 'semantic-ui-react';

const product = {
  name: 'Basic Badass Torch',
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi, quo hic autem cumque repudiandae facere quos soluta cum obcaecati. Impedit est ex totam dolorum deleniti accusantium cupiditate nobis harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi, quo hic autem cumque repudiandae facere quos soluta cum obcaecati. Impedit est ex totam dolorum deleniti accusantium cupiditate nobis harum.`,
  price: 12.99,
  img: 'https://vignette.wikia.nocookie.net/elderscrolls/images/9/93/TESV_Torch.png/revision/latest?cb=20120619180715',
}

class ProductDetail extends Component {
  render() {
    return (
      <Container textAlign="left">
        <Segment.Group raised>
        <Segment><Header as="h3">{product.name}</Header></Segment>
        <Segment.Group horizontal>
          <Segment><Image src={product.img} /></Segment>
          <Segment>Nested Right</Segment>
        </Segment.Group>
        </Segment.Group>
      </Container>
    )
  }
}

export default ProductDetail;
