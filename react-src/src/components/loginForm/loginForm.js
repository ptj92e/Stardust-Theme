import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import LoginService from '../../services/loginService';

import styles from './loginForm.module.css';

function LoginForm(props) {
    const [showAlert, setShowAlert] = useState(false);

    const emailRef = useRef('');
    const passwordRef = useRef('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email === '' || password === '') {
            return;
        }

        const token = await LoginService.login(email, password);

        if (token === '') {
            setShowAlert(true)
        } else {
            props.authChanger(true);
            navigate('/');
        }
    }

    return (
        <Container>
            <Alert 
                variant="danger"
                show={showAlert}
                onClose={() => setShowAlert(false)}
                dismissible
            >
                <p>There was an issue with your login. Please try again.</p>
            </Alert>
            <Form onSubmit={handleLogin}>
                <Row className="justify-content-center">
                    <Col xs={10} md={4}>
                        <Form.Group>
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder='john.smith@test.com'
                                ref={emailRef}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={10} md={4}>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder='Password'
                                ref={passwordRef}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col xs={10} md={4}>
                        <Button className={styles.login} type="submit">Login</Button>
                        <Button className={styles.register} onClick={props.toggleLogin}>Register</Button>
                    </Col>
                    <Col xs={10} md={4}>
                        <div></div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default LoginForm;
