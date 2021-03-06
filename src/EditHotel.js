import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Input, Button, Label, FormGroup, Form} from 'reactstrap';

class EditHotel extends Component {


    constructor(props){
        super(props)
  
        this.state = {
            name: ''
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
        const response = await fetch('http://localhost:8080/api/hotel/' + this.props.match.params.id, {method: 'GET'});
        const json = await response.json();

        this.setState(
            {
                id: json.id,
                name: json.name
            }
        );
    }

    async handleSubmit(event){
        event.preventDefault();

        await fetch(`http://localhost:8080/api/hotel`, {
          method : 'PUT',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(this.state),
        }).then(() => {
            this.props.history.push('/hotels')
        });
      }

    render() {


        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Edit Hotel</h1>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">Name</Label>
                            <Input type="text" name="name" id="name" required 
                                onChange={this.handleChange} value={this.state.name} />
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

export default EditHotel;