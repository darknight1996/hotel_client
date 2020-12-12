import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Hotels extends Component {
    state = {
        hotels : []
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/hotel', {method: 'GET'});
        const json = await response.json();

        this.setState(
           {hotels : json}
        );
    }

    async delete(id) {
        await fetch(`http://localhost:8080/api/hotel/${id}` , {
            method: 'DELETE'
          }).then(() => {
            this.setState({
                hotels: this.state.hotels.filter(hotel => hotel.id !== id)
              });
          });
    }

    render() {
        const hotels = this.state.hotels;
        console.log(hotels);

        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Hotels</h1>
                    <br></br>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hotels.map( hotel =>
                                    <tr>
                                        <td>{hotel.name}</td>
                                        <td>
                                            <Link to={{ pathname: `/hotels/${hotel.id}/rooms`}}>
                                                <Button color="info">Rooms</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={{ pathname: `/hotels/edit/${hotel.id}`}}>
                                                <Button color="primary">Edit</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button color="secondary" onClick={() => {if (window.confirm('Are you sure you want to delete this hotel?')) this.delete(hotel.id)}}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <br></br>
                    <Link to={{ pathname: '/hotels/add'}}>
                        <Button color="primary">Add Hotel</Button>
                    </Link>
                </Container>
            </div>    
        );
    }
}

export default Hotels;