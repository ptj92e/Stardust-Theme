import React, { useRef, useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import EmailService from '../../services/emailService';

import styles from './registerForm.module.css';

function RegisterForm(props) {
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('danger');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [owners, setOwners] = useState('');
    const [showRules, setShowRules] = useState(false);
    const [capitalLetter, setCapitalLetter] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [number, setNumber] = useState(false);
    const [specialCharacter, setSpecialCharacter] = useState(false);
    const [charMin, setCharMin] = useState(false);

    const validatePassword = (pass) => {
        const capitalRegex = /(?=.*[A-Z])/
        const lowerRegex = /(?=.*[a-z])/
        const numberRegex = /(?=.*\d)/
        const specialCharRegex = /(?=.*\W)/
        const charMinRegex = /.{8,}/

        setCapitalLetter(capitalRegex.test(pass) ? true : false)
        setLowerCase(lowerRegex.test(pass) ? true : false)
        setNumber(numberRegex.test(pass) ? true : false)
        setSpecialCharacter(specialCharRegex.test(pass) ? true : false)
        setCharMin(charMinRegex.test(pass) ? true : false)

        setPassword(pass)
    }

    const inputChange = (e) => {
        switch(e.target.name) {
            case "firstName":
                setFirstName(e.target.value);
                break;
            case "lastName":
                setLastName(e.target.value);
                break;
            case "userName":
                setUserName(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                validatePassword(e.target.value)
                break;
            case "confirmPassword":
                setConfirmPassword(e.target.value);
                break;
            case "owners":
                setOwners(e.target.value);
                break;
            default:
                break;
        }
    }

    const validateEmail = (input) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(input);
    }

    const validateForm = () => {
        if (
            firstName === '' ||
            lastName === '' ||
            userName === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === '' ||
            owners === ''
        ) {
            setAlertType('danger');
            setAlertText('All inputs must be completed.');
            setShowAlert(true);
            return false;
        } else if (!validateEmail(email)) {
            setAlertType('danger');
            setAlertText('Invalid Email Format');
            setShowAlert(true);
            return false;
        } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/.test(password)) {
            setAlertType('danger');
            setAlertText('Your password must match the rules provided.');
            setShowAlert(true);
            return false;
        } else if (password !== confirmPassword) {
            setAlertType('danger');
            setAlertText('The two password fields should match.');
            setShowAlert(true);
            return false;
        }

        return true;
    }

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setOwners('');
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        let isValid = validateForm();

        if (isValid) {
            const params = {
                'orgName': 'Stardust',
                'firstName': firstName,
                'lastName': lastName,
                'userName': userName,
                'email': email,
                'password': password,
                'owners': owners
            };
            
            const success = await EmailService.sendUserRegistration(params);

            if (success) {
                setAlertType('success');
                setAlertText('Success: Your user registration request has been submitted!');
                setShowAlert(true);
                resetForm();
            } else {
                setAlertType('danger');
                setAlertText('There was an issue completing your user registration request. Please complete your request by calling 1(800)262-5077.');
                setShowAlert(true);
            }
        }
    }

    return (
        <Container>
            <Alert 
                variant={alertType}
                show={showAlert}
                onClose={() => setShowAlert(false)}
                dismissible
            >
                <p>{alertText}</p>
            </Alert>
            <Form 
                onSubmit={handleFormSubmit}
            >
                <Row className="justify-content-center mt-2">
                    <Col xs={10} md={4}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="John" 
                                value={firstName}
                                name='firstName'
                                onChange={inputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={10} md={4}>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Smith" 
                                value={lastName}
                                name='lastName'
                                onChange={inputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col xs={10} md={4}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="JohnSmith123"
                                value={userName}
                                name='userName'
                                onChange={inputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={10} md={4}>
                        <Form.Group>
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="John.Smith@test.com"
                                value={email} 
                                name='email'
                                onChange={inputChange} 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col xs={10} md={4}>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Password" 
                                value={password}
                                name='password'
                                onChange={inputChange}
                                onFocus={() => setShowRules(true)}
                                onBlur={() => setShowRules(false)}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={10} md={4}>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Password" 
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={inputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                {
                    showRules
                    ?   <Row className="justify-content-center mt-3">
                            <Col xs={10} md={4}>
                                <p style={{ textAlign: 'center' }}>Your password should contain at least:</p>
                                <p className={capitalLetter ? 'greenText' : ''}>- 1 Capital Letter</p>
                                <p className={lowerCase ? 'greenText' : ''}>- 1 Lower-Case Letter</p>
                                <p className={number ? 'greenText' : ''}>- 1 Number</p>
                                <p className={specialCharacter ? 'greenText' : ''}>- 1 Special Character</p>
                                <p className={charMin ? 'greenText' : ''}>- 8 Characters Total</p>
                            </Col>
                        </Row>
                    : <></>
                }
                <Row className="justify-content-center mt-2">
                    <Col xs={10} md={4}>
                        <Form.Group>
                            <Form.Label>Owner/Contract #</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Owner/Contract #" 
                                value={owners}
                                name='owners'
                                onChange={inputChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={10} md={4}>
                        <div></div>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col xs={10} md={4}>
                        <Button className={styles.registerAccount} type="submit">Register Account</Button>
                        <Button className={styles.loginButton} onClick={props.toggleLogin}>Login</Button>
                    </Col>
                    <Col xs={10} md={4}>
                        <div></div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default RegisterForm;
