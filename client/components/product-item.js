
import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const product = {
  name: 'Basic Badass Torch',
  description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi, quo hic autem cumque repudiandae facere quos soluta cum obcaecati. Impedit est ex totam dolorum deleniti accusantium cupiditate nobis harum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae modi, quo hic autem cumque repudiandae facere quos soluta cum obcaecati. Impedit est ex totam dolorum deleniti accusantium cupiditate nobis harum.`,
  price: 12.99,
  img: 'https://vignette.wikia.nocookie.net/elderscrolls/images/9/93/TESV_Torch.png/revision/latest?cb=20120619180715',
}


const ProductItem = () => {
    return (
      <div className="product-list-item">
        <Card raised >
          <Image src={product.img} circular />
          <Card.Content>
            <Card.Header>{product.name}</Card.Header>
            <Card.Meta>
              <span className="date">{product.price}</span>
            </Card.Meta>
          </Card.Content>
        </Card>
      </div>
    );
  }

export default ProductItem;

