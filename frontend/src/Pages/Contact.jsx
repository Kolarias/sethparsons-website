import React, { useState, useEffect }  from "react";
import { Container, Col, Row, Image} from 'react-bootstrap'
import { backendApi } from "../Assets/Constants";
import "./Contact.css";

// Using social media icons from https://github.com/gauravghongde/social-icons/

function Contact() {
    // State
    const [linkList, setLinkList] = useState([]);
    const [load, setLoad] = useState(false);

    // API Call
    const getLinkList = async () => {
        try {
            if (!load) {
                const data = await backendApi.get("contact");
                setLinkList(data.data.links);
                setLoad(true);
            }
        } catch (e) {
            // log any errors
            console.log(e);
        }
    };
    
    useEffect(() => {
        getLinkList();
    }, [linkList, load]);

    return (
        <Container>
            <div className="page">
            <Image className="main-img" src="https://raw.githubusercontent.com/Kolarias/sethparsons-website/main/backend/backend_data/images/me3.jpg"/>
            <h5>
                Email me at:
                <a href={linkList.email} target="_blank" rel="noreferrer"> work@sethparsons.me</a>
            </h5>
            <div className="links">
                {load ? (
                    <Row>
                        <Col>
                            <a href={linkList.linkedin} target="_blank" rel="noreferrer">
                                <img src="https://github.com/gauravghongde/social-icons/blob/master/PNG/Color/LinkedIN.png?raw=true" alt="LinkedIn"/>
                            </a>
                        </Col>
                        <Col>
                            <a href={linkList.github} target="_blank" rel="noreferrer">
                                <img src="https://github.com/gauravghongde/social-icons/blob/master/PNG/Black/Github_black.png?raw=true" alt="Github"/>
                            </a>
                        </Col>
                        <Col>
                            <a href={linkList.facebook} target="_blank" rel="noreferrer">
                                <img src="https://github.com/gauravghongde/social-icons/blob/master/PNG/Color/Facebook.png?raw=true" alt="Facebook"/>
                            </a>
                        </Col>
                        <Col>
                            <a href={linkList.youtube} target="_blank" rel="noreferrer">
                                <img src="https://github.com/gauravghongde/social-icons/blob/master/PNG/Color/Youtube.png?raw=true" alt="YouTube"/>
                            </a>
                        </Col>
                    </Row>
                ) : null}
            </div>
            </div>
        </Container>
    );
}

export default Contact;