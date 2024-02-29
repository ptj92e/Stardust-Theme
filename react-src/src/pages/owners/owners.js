import React, { useEffect, useState } from 'react';

import PageTitle from "../../components/pageTItle/pageTitle";

import Accordion from 'react-bootstrap/Accordion';
import Container from "react-bootstrap/Container";

import HTMLService from '../../services/htmlService';
import PDFService from '../../services/pdfService';

import './owners.css';

function OwnersPage() {
    const [boardMinutes, setBoardMinutes] = useState([]);
    const [audits, setAudits] = useState([]);
    const [newsletters, setNewsletter] = useState([]);
    const [meetingPDF, setMeetingPDF] = useState({})

    useEffect(() => {
        async function getPDFs() {
            let pdfs = await PDFService.getOwnersPDFs();
            setBoardMinutes(pdfs.boardMinutes ? pdfs.boardMinutes : []);
            setAudits(pdfs.audits ? pdfs.audits : []);
            setNewsletter(pdfs.newsletters ? pdfs.newsletters : []);
            setMeetingPDF(pdfs.meetingPDF ? pdfs.meetingPDF[0] : {})
        }

        getPDFs();
    }, []);

    return (
        <div id='owners'>
            <PageTitle
                pageTitle="Stardust Owners"
            />
            <Container>
                <p>The May 2023 - May 2024 Board of Directors are:</p>
                <ul className="boardMembers">
                    <li>
                        <p><strong>President:</strong> Merrill Higham</p>
                    </li>
                    <li>
                        <p><strong>Vice President:</strong> Kit Miller</p>
                    </li>
                    <li>
                        <p><strong>Secretary:</strong> Jan McCarthy</p>
                    </li>
                    <li>
                        <p><strong>Treasurer:</strong> Rick Lehr</p>
                    </li>
                    <li>
                        <p><strong>Member-At-Large:</strong> James Fishel</p>
                    </li>
                </ul>
                <p style={{ color: 'rgb(61, 132, 7)'}}>- Our Board of Director’s meet four times a year.  
                    Please see below for the upcoming tentatively scheduled Board Meetings.  
                    However, please call <span style={{ cursor: 'pointer' }} onClick={() => window.open("tel:+15305448463")}><strong>(530) 544-8463 x102</strong></span>&nbsp; 
                    or email malinda@stardust-americana.com before making plans to come up 
                    because dates may be altered to accommodate changing circumstances.</p>
                <p>- Annual General Membership Meeting will be held on May 18, 2024.  More details to be announced closer to date.</p>
                <p>- Bonus Time may be reserved up to one year in advance of the Annual Member’s Meeting based on availability.</p>
                {
                    meetingPDF.content
                        ? <p>- Click here to view a list of this year's <a className="greenText" target="_blank" href={HTMLService.sanatizeHTML(meetingPDF.content.rendered)}>Upcoming Meetings</a></p>
                        : <></>
                }
                <Accordion defaultActiveKey="0" className="boardAccordion">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Board Meeting Minutes</Accordion.Header>
                        <Accordion.Body>
                            {
                                !boardMinutes.length ? 
                                    <p>There are no board minutes to display.</p>
                                :
                                    <ul>
                                        {
                                            boardMinutes.map((item) => {
                                                return(
                                                    <li>
                                                        <a target="_blank" rel="noopener noreferrer" href={HTMLService.sanatizeHTML(item.content.rendered)}>{HTMLService.sanatizeHTML(item.title.rendered)}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Audit Results</Accordion.Header>
                        <Accordion.Body>
                        {
                                !audits.length ? 
                                    <p>There are no audits to display.</p>
                                :
                                    <ul>
                                        {
                                            audits.map((item) => {
                                                return(
                                                    <li>
                                                        <a target="_blank" rel="noopener noreferrer" href={HTMLService.sanatizeHTML(item.content.rendered)}>{HTMLService.sanatizeHTML(item.title.rendered)}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Newsletters</Accordion.Header>
                        <Accordion.Body>
                        {
                                !newsletters.length ? 
                                    <p>There are no newsletters to display.</p>
                                :
                                    <ul>
                                        {
                                            newsletters.map((item) => {
                                                return(
                                                    <li>
                                                        <a target="_blank" rel="noopener noreferrer" href={HTMLService.sanatizeHTML(item.content.rendered)}>{HTMLService.sanatizeHTML(item.title.rendered)}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                            }
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>
        </div>
    )
}

export default OwnersPage;
