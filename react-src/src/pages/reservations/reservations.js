import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import Row from 'react-bootstrap/Row';

import EmailService from "../../services/emailService";
import RoomsService from "../../services/roomsService";
import PDFService from "../../services/pdfService";
import htmlService from "../../services/htmlService";

import PageTitle from '../../components/pageTItle/pageTitle';

import './reservations.css';
import 'react-datepicker/dist/react-datepicker.css';

function ReservationPage(props) {
    const [roomTitles, setRoomTitles] = useState([{ label: 'Select an option...', value: 'default' }])
    const [calendarLink, setCalendarLink] = useState('');
    const [rulesLink, setRulesLink] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const [alertType, setAlertType] = useState('danger');
    const [showFacts, setShowFacts] = useState(false);
    const [showReservation, setShowReservation] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [owner, setOwner] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [room, setRoom] = useState('default');
    const [use, setUse] = useState('default');

    const { roomName } = useParams();

    const options = [
        { label: 'Select an option...', value: 'default' },
        { label: 'At Stardust 7-Night Week', value: 'At Stardust 7-Night Week' },
        { label: 'At Stardust Split Week', value: 'At Stardust Split Week' },
        { label: 'RCI Exchange', value: 'RCI Exchange' },
        { label: 'Interval International Exchange', value: 'Interval International Exchange' },
        { label: 'Rent Out', value: 'Rent Out' }
    ]

    useEffect(() => {
        async function fetchRoomTitles() {
            const roomTitleList = await RoomsService.getRoomTitles();
            const mergedArray = [...roomTitles, ...roomTitleList]
            setRoomTitles(mergedArray);
        }

        async function getPDFs() {
            const reservationPDFs = await PDFService.getReservationPDFs();

            const calendar = reservationPDFs.calendar.length ? reservationPDFs.calendar[0] : {};
            const rules = reservationPDFs.rules.length ? reservationPDFs.rules[0] : {};

            setCalendarLink(calendar.content ? htmlService.sanatizeHTML(calendar.content.rendered) : '')
            setRulesLink(rules.content ? htmlService.sanatizeHTML(rules.content.rendered) : '')
        }

        fetchRoomTitles();
        getPDFs();
        setRoom(roomName ? roomName : 'default');
    }, []);

    const formatPhoneNumber = (input) => {
        const cleanedInput = input.replace(/\D/g, '');
        if (cleanedInput.length <= 3) {
            return cleanedInput;
        }

        if (cleanedInput.length <= 6) {
            return `(${cleanedInput.slice(0, 3)}) ${cleanedInput.slice(3)}`;
        }

        return `(${cleanedInput.slice(0, 3)}) ${cleanedInput.slice(3, 6)}-${cleanedInput.slice(6)}`;        
    };

    const inputChange = (e) => {
        switch(e.target.name) {
            case "name":
                setName(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "phone":
                setPhone(formatPhoneNumber(e.target.value));
                break;
            case "owner":
                setOwner(e.target.value);
                break;
            case "use":
                setUse(e.target.value);
                break;
            case "room":
                setRoom(e.target.value);
                break;
            default:
                break;
        }
    }

    const validateEmail = (input) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(input);
    }

    const validatePhone = (input) => {
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phoneRegex.test(input);
    }

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setOwner('');
        setStartDate(new Date());
        setEndDate(new Date());
        setUse('default');
        setRoom('default');
    }

    const validateForm = () => {
        if (
            name === '' ||
            email === '' ||
            phone === '' ||
            owner === ''
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
        } else if (!validatePhone(phone)) {
            setAlertType('danger');
            setAlertText('Invalid Phone Number');
            setShowAlert(true);
            return false;
        } else if (startDate >= endDate) {
            setAlertType('danger');
            setAlertText('End date must be after the Start date');
            setShowAlert(true);
            return false;
        } else if (use === "default") {
            setAlertType('danger');
            setAlertText('Please select how this room will be used');
            setShowAlert(true);
            return false;
        } else if (room === 'default') {
            setAlertType('danger');
            setAlertText('Please select a room type');
            setShowAlert(true);
            return false;
        }

        return true;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            const params = {
                'orgName': 'Stardust',
                'name': name,
                'phone': phone,
                'email': email,
                'owner': owner,
                'checkIn': `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`,
                'checkOut': `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`,
                'use': use,
                'room': room,
                'toEmail': 'res@stardust-tahoe.com'
            };
            
            const success = await EmailService.sendReservation(params);

            if (success) {
                setAlertType('success');
                setAlertText('Success: Your reservation request has been submitted!');
                setShowAlert(true);
                resetForm();
            } else {
                setAlertType('danger');
                setAlertText('There was an issue completing your reservation request. Please complete your reservation by calling 1(800)262-5077.');
                setShowAlert(true);
            }
        }
    }

    return (
        <div id='reservation-request'>
            <PageTitle
                pageTitle="Request a Reservation"
            />
            <Container className="mb-3">
                {
                    props.isAuthenticated 
                    ?   <>
                        <p>Please complete the form below to request a reservation. 
                            A Stardust reservationist will get back with you within two business days to confirm. 
                            You will need to submit a separate request for EACH WEEK you own and/or for EACH PART of split week. 
                            Most reservations are assigned on a first-requested first-reserved basis. 
                            However certain Unit Types at certain times are determined by Lottery. 
                            Only those reservation requests received between 12:00am and 11:59pm (midnight-midnight) on the First Request Day will be put into the lottery. 
                            Please see page 5 of the Rules and Regulations for all the lottery details. 
                            All fields are required to process your request.  
                            Please be sure to enter your Owners / Contract Number.</p>
                    </>
                    : <p>Everything you can do with your timeshare starts with a reservation. 
                        Please complete the form below to request a reservation. 
                        A Stardust reservationist will get back with you within two business days to confirm. 
                        All fields are required to process your request.</p>
                }
                <p>- Need help with reservations? Read <a className="greenText" onClick={() => setShowFacts(!showFacts)}>Reservation Facts</a> or contact the front office for more information. We look forward to seeing you!</p>
                {
                    showFacts 
                    ?   <>
                            <h3>Reservation Facts:</h3>
                            <p>Make a reservation at the Stardust in your unit type and season for a Sunday check-in. 
                                After your reservation is confirmed, you can trade it with an exchange company or rent it out.</p>
                            <p>We want you to use and enjoy your vacation time!! 
                                Here’s an overview, but please call Luis at&nbsp;
                                <span className="greenText" onClick={() => window.open("tel:+18002625077")}><strong>1(800)262-5077</strong></span> 
                                &nbsp;if you have any questions.</p>
                            {
                                props.isAuthenticated
                                ? <p>- Click here for the current <a className="greenText" target="_blank" href={calendarLink}>Stardust Use Calendar</a></p>
                                : <></>
                            }
                        </>
                    : <></>
                }
                <p>- Click here to view other <a className="greenText" onClick={() => setShowReservation(!showReservation)}>Reservation Options</a></p>
            </Container>
            <Container>
                {
                    !showReservation
                        ?   <div id="reservationOptions">
                                <p><strong>Reservations can be made by:</strong></p>
                                <p>Phone: <span className="greenText" onClick={() => window.open("tel:+18002625077")}><strong>1(800)262-5077</strong></span></p>
                                <p>E-mail: <a className="greenText" href="mailto:res@staardust-tahoe.com" target="_blank">res@stardust-tahoe.com</a></p>
                                <p>Fax: 530-544-3617</p>
                                <div id="addressBlock">
                                    <p>Mail to:</p>
                                    <ul>
                                        <li><p>Stardust Vacation Club</p></li>
                                        <li><p>4061 Lake Tahoe Blvd</p></li>
                                        <li><p>South Lake Tahoe, CA 96150</p></li>
                                    </ul>
                                </div>
                            </div>
                        : <></>
                }
            </Container>
            {
                showReservation
                    ?   <Container>
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
                                className="reservationForm"
                            >
                                <Row className="justify-content-center mb-2">
                                    <Col xs={10} md={4}>
                                        <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="John Smith"
                                                name="name"
                                                value={name}
                                                onChange={inputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={10} md={4}>
                                        <Form.Group>
                                            <Form.Label>E-Mail</Form.Label>
                                            <Form.Control 
                                                type="email" 
                                                placeholder="John.Smith@example.com" 
                                                name="email"
                                                value={email}
                                                onChange={inputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mb-2">
                                    <Col xs={10} md={4}>
                                        <Form.Group>
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="(XXX) XXX-XXXX" 
                                                value={phone} 
                                                name="phone"
                                                onChange={inputChange} 
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={10} md={4}>
                                        <Form.Group>
                                            <Form.Label>Owner/Contract #</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Owner/Contract #" 
                                                name="owner"
                                                value={owner}
                                                onChange={inputChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mb-2">
                                    <Col xs={10} md={4}>
                                        <Form.Group>
                                            <Form.Label>Start Date</Form.Label>
                                            <DatePicker 
                                                className="form-control"   
                                                selected={startDate} 
                                                onChange={(date) => setStartDate(date)}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={10} md={4}>
                                        <Form.Group>
                                            <Form.Label>End Date</Form.Label>
                                            <DatePicker 
                                                className="form-control" 
                                                selected={endDate} 
                                                onChange={(date) => setEndDate(date)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center mb-2">
                                    <Col xs={10} md={4}>
                                        <Form.Group>
                                            <Form.Label>How will this room be used?</Form.Label>
                                            <Form.Select 
                                                value={use} 
                                                name="use"
                                                onChange={inputChange}
                                            >
                                                {
                                                    options.map((option, index) => {
                                                        return <option value={option.value} key={index}>{option.label}</option>
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={10} md={4}>
                                        <Form.Group>
                                            <Form.Label>Room Name</Form.Label>
                                            <Form.Select 
                                                value={room} 
                                                name="room"
                                                onChange={inputChange}
                                            >
                                                {
                                                    roomTitles.map((option, index) => {
                                                        return <option value={option.value} key={index}>{option.label}</option>
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center">
                                    <Col xs={10} md={4}>
                                        <Button 
                                            type="submit"
                                        >
                                            Submit Request
                                        </Button>
                                    </Col>
                                    <Col xs={10} md={4}>
                                        <div></div>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    : <></>
            }
            {
                props.isAuthenticated
                ?   <>
                        <Container>
                            <p>Click here to view our <a className="greenText" target={"_blank"} href={rulesLink}>Rules and Regulations</a>. 
                                We strongly suggest you read the FULL document so that you’re aware of all the services available to our Owners. 
                                If you have ANY questions regarding Reservations Processing, please call&nbsp;
                                <span className="greenText" onClick={() => window.open("tel:+18002625077")}><strong>1(800)262-5077</strong></span> . 
                                For general Rules and Regulations questions, please call&nbsp;
                                <span className="greenText" onClick={() => window.open("tel:+5305448463")}><strong>(530)544-8463</strong></span>.</p>
                        </Container>
                    </>
                : <></>
            }
        </div>
    )
}

export default ReservationPage;
