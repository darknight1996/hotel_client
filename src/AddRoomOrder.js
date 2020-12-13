import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Input, Button, Label, FormGroup, Form} from 'reactstrap';

class AddRoomOrder extends Component {


    constructor(props){
        super(props)
  
        this.state = {
            startDate: '',
            endDate: '',
            guestId: '',
            guests: []
        }
  
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
      } 

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
          [name]: value
        })
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/guest', {method: 'GET'});
        const json = await response.json();

        this.setState(
            {
                guestId: json[0].id,
                guests: json
            }
        );
    }

    updateInputValue(evt) {
        this.setState({
            guestId: evt.target.value
        });
      }

    async handleSubmit(event){
        event.preventDefault();

        await fetch(`http://localhost:8080/api/room/` + this.props.match.params.roomId + '/order', {
          method : 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(this.state),
        }).then(() => {
            this.props.history.push('/rooms/' + this.props.match.params.roomId + '/orders')
        });
      }

    render() {

        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Add Room Order</h1>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="name">Start Date</Label>
                            <Input type="date" name="startDate" id="startDate" required 
                                onChange={this.handleChange} value={this.state.startDate} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">End Date</Label>
                            <Input type="date" name="endDate" id="endDate" required 
                                onChange={this.handleChange} value={this.state.endDate} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Guest</Label>
                            <select value={this.state.guestId} onChange={evt => this.updateInputValue(evt)}>  
                                {this.state.guests.map( guest =>
                                    <option value={guest.id}>{guest.firstName} {guest.lastName}</option>
                                )}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Add</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default AddRoomOrder;