import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Input, Button, Label, FormGroup, Form} from 'reactstrap';

class EditRoom extends Component {


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

    async componentDidMount() {
        const response = await fetch('http://localhost:8080/api/hotel/room/' + this.props.match.params.id, {method: 'GET'});
        const json = await response.json();

        this.setState(
            {
                id: json.id,
                number: json.number
            }
        );
    }

    async handleSubmit(event){
        event.preventDefault();

        await fetch('http://localhost:8080/api/hotel/' + this.props.match.params.hotelId + '/room', {
          method : 'PUT',
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
                    <h1 style={{textAlign: 'center'}}>Edit Room</h1>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="number">Number</Label>
                            <Input type="text" name="number" id="number" required 
                                onChange={this.handleChange} value={this.state.number} />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default EditRoom;