import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Rooms extends Component {
    state = {
        rooms : []
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/hotel/' + this.props.match.params.hotelId + '/room',
             {method: 'GET'});
        const json = await response.json();

        this.setState(
           {rooms : json}
        );
    }

    async delete(id) {
        await fetch(`http://localhost:8080/api/hotel/room/${id}` , {
            method: 'DELETE'
          }).then(() => {
            this.setState({
                rooms: this.state.rooms.filter(room => room.id !== id)
              });
          });
    }

    render() {
        const rooms = this.state.rooms;

        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Rooms</h1>
                    <br></br>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rooms.map( room =>
                                    <tr>
                                        <td>{room.number}</td>
                                        <td>
                                            <Link to={{ pathname: `/rooms/${room.id}/items`}}>
                                                <Button color="info">Items</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={{ pathname: `/rooms/${room.id}/orders`}}>
                                                <Button color="info">Orders</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={{ pathname: `/hotels/` + this.props.match.params.hotelId + `/room/${room.id}`}}>
                                                <Button color="primary">Edit</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button color="secondary" onClick={() => {if (window.confirm('Are you sure you want to delete this room?')) this.delete(room.id)}}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <br></br>
                    <Link to={{ pathname: '/hotels/' + this.props.match.params.hotelId + '/room'}}>
                        <Button color="primary">Add Room</Button>
                    </Link>
                </Container>
            </div>    
        );
    }
}

export default Rooms;