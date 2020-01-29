import React, { Component } from 'react';

class ContactForm extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        picture: '',
        formErrors: {
            name: 'Name is required',
            email: 'Email is required',
            phone: 'Phone is required'
        },
        errorMessages: null
    }

    tfHandler = (evt) => {
        let { name, value } = evt.target;
        let { formErrors } = this.state;

        switch (name) {
            case 'name':
                if (!value || value.length === 0) {
                    formErrors.name = 'Name is required';
                }
                else if (value.length < 3 || value.length > 20) {
                    formErrors.name = 'Name must be between 3 to 20 letters';
                }
                else {
                    formErrors.name = '';
                }
                break;
            case 'email':
                if (!value || value.length === 0) {
                    formErrors.email = 'Email is required';
                }
                else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    formErrors.email = 'Not a valid email';
                }
                else {
                    formErrors.email = '';
                }
                break;
            case 'phone':
                if (!value || value.length === 0) {
                    formErrors.phone = 'Phone is required';
                }
                else if (!value.match(/^\d{10,12}$/)) {
                    formErrors.phone = 'Not a valid phone';
                }
                else {
                    formErrors.phone = '';
                }
                break;
            default:
                break;
        }


        this.setState({ [name]: value, formErrors });
    }


    validateForm = (formErrors) => {
        let valid = true;
        Object.values(formErrors).forEach(err => valid = valid && err.length === 0)
        return valid;
    }

    submitHandler = (evt) => {
        evt.preventDefault();

        let { formErrors } = this.state;

        if (this.validateForm(formErrors)) {
            alert('All is well!');
        }

        let errorMessages = Object.values(formErrors).map((err, index) => err.length === 0 ? null : <li key={index}>{err}</li>)
        this.setState({ errorMessages });
    }

    render() {
        return (
            <div className="row">
                <div className="col">
                    <div>
                        <h3>Add a new contact</h3>
                        <form className="form" onSubmit={this.submitHandler}>
                            <div className="form-group row">
                                <label htmlFor="" className="control-label col-md-4">
                                    Name
                        </label>
                                <div className="col-md-8">
                                    <input value={this.state.name} onChange={this.tfHandler} name="name" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="control-label col-md-4">
                                    Email address
                        </label>
                                <div className="col-md-8">
                                    <input value={this.state.email} onChange={this.tfHandler} name="email" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="control-label col-md-4">
                                    Phone number
                        </label>
                                <div className="col-md-8">
                                    <input value={this.state.phone} onChange={this.tfHandler} name="phone" type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="" className="control-label col-md-4">
                                    Picture
                        </label>
                                <div className="col-md-8">
                                    <input value={this.state.picture} onChange={this.tfHandler} name="picture" type="text" className="form-control" />
                                </div>
                            </div>
                            <button className="btn btn-primary">Save data</button>
                        </form>
                        <ul>
                            {this.state.errorMessages}
                        </ul>
                    </div>
                </div>
                <div className="col">
                    <h3>Current state: </h3>
                    <pre>{JSON.stringify(this.state, null, 3)}</pre>
                </div>
            </div>

        );
    }
}

export default ContactForm;