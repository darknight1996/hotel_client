import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Input, Button, Label, FormGroup, Form} from 'reactstrap';

class AddRoom extends Component {


    constructor(props){
        super(props)
  
        this.state = {
            number: ''
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

    async handleSubmit(event){
        event.preventDefault();

        await fetch(`http://localhost:8080/api/hotel/` + this.props.match.params.hotelId + '/room', {
          method : 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(this.state),
        }).then(() => {
            this.props.history.push('/hotels/' + this.props.match.params.hotelId + '/rooms')
        });
      }

    render() {


        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Add Room</h1>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">Number</Label>
                            <Input type="number" name="number" id="number" required 
                                onChange={this.handleChange}/>
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

export default AddRoom;