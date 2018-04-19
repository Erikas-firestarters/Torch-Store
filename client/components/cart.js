import React from 'react';
import { Button } from 'semantic-ui-react';

export default function Cart() {
  return (
    <div className="ui grid">
      <div className="center aligned two column row">
        <div className="column">
          <h3 className="ui header">Cart</h3>
            <div className="ui segment">
              <img className="ui mini left floated image" src="https://semantic-ui.com/images/wireframe/image.png" />
              <p>Product #3</p>
              <p>$44.55</p>
            </div>
            <div className="ui segment">
              <img className="ui mini left floated image" src="https://semantic-ui.com/images/wireframe/image.png" />
              <p>Product #2</p>
              <p>$20.05</p>
            </div>
            <div className="ui segment">
              <img className="ui mini left floated image" src="https://semantic-ui.com/images/wireframe/image.png" />
              <p>Product #1</p>
              <p>$18.65</p>
            </div>

        </div>
        <div className="column">
          <div className="ui segment">
            <Button>CHECKOUT</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
