import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import { Table, Container, Input, Button, Label, FormGroup, Form} from 'reactstrap';

class AddGuest extends Component {


    constructor(props){
        super(props)
  
        this.state = {
            firstName: '',
            lastName: '',
            dateOfBirth: new Date()

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

        await fetch(`http://localhost:8080/api/guest`, {
          method : 'POST',
          headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body : JSON.stringify(this.state),
        }).then(() => {
            this.props.history.push('../guests')
        });
      }

    render() {


        return(
            <div>
                <NavigationBar />
                <Container>
                    <br></br>
                    <h1 style={{textAlign: 'center'}}>Add Guest</h1>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input type="text" name="firstName" id="firstName" required 
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">Last Name</Label>
                            <Input type="text" name="lastName" id="lastName" required 
                                onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="firstName">Birth Date</Label>
                            <Input type="date" name="birthDate" id="birthDate" required 
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

export default AddGuest;