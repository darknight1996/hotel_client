import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Button } from 'reactstrap';

class Orders extends Component {
    state = {
        orders : []
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/room/order/all', {method: 'GET'});
        const json = await response.json();

        this.setState(
           {orders : json}
        );
    }

    render() {
        const orders = this.state.orders;

        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Orders</h1>
                    <br></br>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Hotel</th>
                                <th>Room</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Guest</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map( order =>
                                    <tr>
                                        <td>{order[0]}</td>
                                        <td>{order[1]}</td>
                                        <td>{order[2]}</td>
                                        <td>{order[3]}</td>
                                        <td>{order[4]} {order[5]}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <br></br>
                </Container>
            </div>    
        );
    }
}

export default Orders;