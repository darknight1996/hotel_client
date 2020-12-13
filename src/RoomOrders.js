import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class RoomOrders extends Component {
    state = {
        orders : []
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/room/' + this.props.match.params.roomId + '/order', {method: 'GET'});
        const json = await response.json();

        this.setState(
           {orders : json}
        );
    }

    async delete(id) {
        await fetch(`http://localhost:8080/api/room/order/${id}` , {
            method: 'DELETE'
          }).then(() => {
            this.setState({
                orders: this.state.orders.filter(order => order.id !== id)
              });
          });
    }

    render() {
        const orders = this.state.orders;

        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Room Orders</h1>
                    <br></br>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Guest</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map( order =>
                                    <tr>
                                        <td>{order.startDate}</td>
                                        <td>{order.endDate}</td>
                                        <td>{order.guest.firstName} {order.guest.lastName}</td>
                                        <td>
                                            <Button color="secondary" onClick={() => {if (window.confirm('Are you sure you want to delete this item?')) this.delete(order.id)}}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <br></br>
                    <Link to={{ pathname: '/rooms/' + this.props.match.params.roomId + '/order'}}>
                        <Button color="primary">Add Room Order</Button>
                    </Link>
                </Container>
            </div>    
        );
    }
}

export default RoomOrders;