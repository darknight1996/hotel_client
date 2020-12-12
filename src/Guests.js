import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Guests extends Component {
    state = {
        guests : []
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/guest', {method: 'GET'});
        const json = await response.json();

        this.setState(
           {guests : json}
        );
    }

    async delete(id) {
        await fetch(`http://localhost:8080/api/guest/${id}` , {
            method: 'DELETE'
          }).then(() => {
            this.setState({
                guests: this.state.guests.filter(guest => guest.id !== id)
              });
          });
    }

    render() {
        const guests = this.state.guests;

        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Guests</h1>
                    <br></br>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Birth Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                guests.map( guest =>
                                    <tr>
                                        <td>{guest.firstName}</td>
                                        <td>{guest.lastName}</td>
                                        <td>{guest.birthDate}</td>
                                        <td>
                                            <Link to={{ pathname: `/guests/edit/${guest.id}`}}>
                                                <Button color="primary">Edit</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button color="secondary" onClick={() => {if (window.confirm('Are you sure you want to delete this guest?')) this.delete(guest.id)}}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <br></br>
                    <Link to={{ pathname: '/guests/add'}}>
                        <Button color="primary">Add Guest</Button>
                    </Link>
                </Container>
            </div>    
        );
    }
}

export default Guests;