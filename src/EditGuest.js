import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Input, Button, Label, FormGroup, Form} from 'reactstrap';

class EditHotel extends Component {


    constructor(props){
        super(props)
  
        this.state = {
            firstName: '',
            lastName: '',
            birthDate: new Date(),
            email: ''
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
        const response = await fetch('http://localhost:8080/api/guest/' + this.props.match.params.id, {method: 'GET'});
        const json = await response.json();

        this.setState(
            {
                id: json.id,
                firstName: json.firstName,
                lastName: json.lastName,
                birthDate: json.birthDate,
                email: json.email
            }
        );
    }

    async handleSubmit(event){
        event.preventDefault();

        await fetch(`http://localhost:8080/api/guest`, {
          method : 'PUT',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(this.state),
        }).then(() => {
            this.props.history.push('/guests')
        });
      }

    render() {


        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Edit Guest</h1>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text" name="firstName" id="lastName" required 
                                onChange={this.handleChange} value={this.state.firstName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input type="text" name="lastName" id="lastName" required 
                                onChange={this.handleChange} value={this.state.lastName} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">Birth Date</Label>
                            <Input type="date" name="birthDate" id="birthDate" required 
                                onChange={this.handleChange} value={this.state.birthDate} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">Email</Label>
                            <Input type="email" name="email" id="email" required 
                                onChange={this.handleChange}/>
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