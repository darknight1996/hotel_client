import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class RoomItems extends Component {
    state = {
        items : []
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/room/' + this.props.match.params.roomId + '/item', {method: 'GET'});
        const json = await response.json();

        this.setState(
           {items : json}
        );
    }

    async delete(id) {
        await fetch(`http://localhost:8080/api/room/item/${id}` , {
            method: 'DELETE'
          }).then(() => {
            this.setState({
                items: this.state.items.filter(item => item.id !== id)
              });
          });
    }

    render() {
        const items = this.state.items;

        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Room Items</h1>
                    <br></br>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Cost</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                items.map( item =>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>${item.cost}</td>
                                        <td>
                                            <Link to={{ pathname: '/rooms/' + this.props.match.params.roomId + `/item/${item.id}`}}>
                                                <Button color="primary">Edit</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button color="secondary" onClick={() => {if (window.confirm('Are you sure you want to delete this item?')) this.delete(item.id)}}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    <br></br>
                    <Link to={{ pathname: '/rooms/' + this.props.match.params.roomId + '/item'}}>
                        <Button color="primary">Add Room Item</Button>
                    </Link>
                </Container>
            </div>    
        );
    }
}

export default RoomItems;