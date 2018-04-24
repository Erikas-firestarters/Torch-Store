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
  Segment
} from 'semantic-ui-react';
import _ from 'lodash';
import { updateOrderInfo, deleteOrderForever } from '../../store/';

export class AdminOrdersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: this.props.adminOrders,
      direction: null
    };
    this.orderModal = this.orderModal.bind(this);
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
                  <Table.Cell>{total}</Table.Cell>
                  <Table.Cell>{userId}</Table.Cell>
                  <Table.Cell>{this.orderModal(status, id)}</Table.Cell>
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

  orderModal(status, id) {
    return (
      <Modal
        align={'center'}
        trigger={
          <Button open={this.state.open} size="mini" color="green">
            {status}
          </Button>
        }
        closeIcon
      >
        <Header icon="list layout" content="Change Status" />
        <Modal.Content>
          <Segment >
            <Radio
              label="Created"
              value="Created"
              onClick={e => this.onEditSubmit(e, id)}
            />
            <Radio
              label="Processing"
              value="Processing"
              onClick={e => this.onEditSubmit(e, id)}
            />
            <Radio
              label="Cancelled"
              value="Cancelled"
              onClick={e => this.onEditSubmit(e, id)}
            />
            <Radio
              label="Complete"
              value="Completed"
              onClick={e => this.onEditSubmit(e, id)}
            />
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }

  onEditSubmit(e, id) {
    event.preventDefault();
    console.log('event ', e.target.label);

    const { status } = e.target;
    const updatedOrder = { status: status.value };
    this.props.updateOrderInfo(id, updatedOrder);
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
