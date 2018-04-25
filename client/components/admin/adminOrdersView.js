import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Table,
  Icon,
  Menu,
  Button,
  Modal,
  Radio,
  Form,
  Checkbox,
  Popup,
  Grid
} from 'semantic-ui-react';
import _ from 'lodash';
import { updateOrderInfo, deleteOrderForever } from '../../store/';
import NumberFormat from 'react-number-format';
import { ENGINE_METHOD_DIGESTS } from 'constants';


export class AdminOrdersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: this.props.adminOrders,
      direction: null,
      buttonColor: { Created: 'green', Processing: 'blue', Cancelled: 'red', Completed: 'teal'}
    };
    this.orderModal2 = this.orderModal2.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }


  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      });
      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });
  };

  render() {
    const { column, data, direction } = this.state;
    return (
      <div>
        <Header>Orders List</Header>
        <Table sortable celled>
          <Table.Header>
            <Table.Row>


              <Table.HeaderCell
                sorted={column === 'id' ? direction : null}
                onClick={this.handleSort('id')}
              >
                Order Id
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'total' ? direction : null}
                onClick={this.handleSort('total')}
              >
                Total
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'userId' ? direction : null}
                onClick={this.handleSort('userId')}
              >
                User
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'status' ? direction : null}
                onClick={this.handleSort('status')}
              >
                Status
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_ &&
              _.map(data, ({ id, total, userId, status }) => (
                <Table.Row key={id}>
                  <Table.Cell>{id}</Table.Cell>
                  <Table.Cell>
                    <NumberFormat
                  value={parseFloat(total * 0.1).toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                /></Table.Cell>
                  <Table.Cell>{userId}</Table.Cell>
                  <Table.Cell>{this.orderModal2(status, id)}</Table.Cell>
                  <Table.Cell>
                    <Button
                      size="mini"
                      onClick={() => this.onDelete(id)}
                      color="red"
                    >
                      <Icon name="remove circle" />
                      Delete Order
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }


  orderModal2(status, id) {
    let colorSet = status => {
      return `this.state.buttonColor.${status}`
    }
    return (
    <Popup
    trigger={<Button color={colorSet(status)} size="mini">{status}</Button>}
    flowing
    hoverable
  >
    <Grid centered divided columns={4}>
      <Grid.Column textAlign="center">
        <Button
        id={id}
        value="Cancelled"
        color="red"
        size="mini"
        onClick={this.onEditSubmit}>Cancelled</Button>
      </Grid.Column>
      <Grid.Column textAlign="center">
        <Button
        id={id}
        value="Completed"
        color="blue"
        size="mini"
        onClick={this.onEditSubmit}>Completed</Button>
      </Grid.Column>
      <Grid.Column textAlign="center">
        <Button
        id={id}
        value="Created"
        color="green"
        size="mini"
        onClick={this.onEditSubmit}>Created</Button>
      </Grid.Column>
      <Grid.Column textAlign="center">
        <Button
        id={id}
        value="Cancelled"
        color="teal"
        size="mini"
        onClick={this.onEditSubmit}>Processing</Button>
      </Grid.Column>
    </Grid>
  </Popup>)
  }

  onEditSubmit(e, data) {
    event.preventDefault();
    const thisID = data.id;
    const thisStatus = data.value
    console.log(thisStatus)
    this.props.updateOrderInfo(thisID && thisID, { status: thisStatus});
    this.setState({ data: this.props.adminOrders })
  }

  onDelete(id) {
    event.preventDefault();
    this.props.deleteOrderForever(id)
    this.setState({ data: this.props.adminOrders.filter(
      order => order.id !== id
    ) })
  }
}

const mapState = ({ adminOrders }) => ({ adminOrders });

const mapDispatch = { updateOrderInfo, deleteOrderForever };

export default connect(mapState, mapDispatch)(AdminOrdersView);
