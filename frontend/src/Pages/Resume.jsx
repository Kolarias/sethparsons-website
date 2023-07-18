import React, { useState, useEffect }  from "react";
import { backendApi } from "../Assets/Constants";
import { Container, Col, Row, Image} from 'react-bootstrap'
import "./Resume.css";

function Resume() {
    // State
    const [resume, setResume] = useState([]);
    const [load, setLoad] = useState(false);

    // API Call
    const getResume = async () => {
        try {
            if (!load) {
                const data = await backendApi.get("resume");
                setResume(data.data);
                setLoad(true);
            }
        } catch (e) {
            // log any errors
            console.log(e);
        }
    };
    
    useEffect(() => {
        getResume();
    }, [resume, load]);

    return (
        <Container>
            {load ? (
                <div>
                    <Container className='basic-info'>
                        <Row>
                            <Col>
                                <h3>{resume[0]['Basic Info'].name}</h3>
                                <h4>{resume[0]['Basic Info'].title}</h4>
                                <h4>{resume[0]['Basic Info'].address}</h4>
                                <h4>{resume[0]['Basic Info'].email}</h4>
                                <h4>{resume[0]['Basic Info'].link}</h4>
                                <h4>{resume[0]['Basic Info'].summary}</h4>
                            </Col>
                            <Image src="https://raw.githubusercontent.com/Kolarias/sethparsons-website/main/backend/backend_data/images/me2.png" style={{height:100, width:100}}/>
                        </Row>
                    </Container>
                    <Container className='education-experience'>
                        <h3>Education</h3>
                        {resume[1]['Education'].map((institution) => {
                            return (
                                <Row>
                                    <Col>
                                        <h4>{institution.date}</h4>
                                    </Col>
                                    <Col>
                                        <h4><b>{institution.name}</b></h4>
                                        <h4>GPA: {institution.gpa}</h4>
                                        <h4>Relevant Classes: {institution.classes}</h4>
                                    </Col>
                                </Row>
                            );
                        })}
                    </Container>
                    <Container className='education-experience'>
                        <h3>Skills</h3>
                        <p></p>
                        <ul>
                        {resume[4]['Key Skills'].map((skill) => {
                            return (
                                <li>{skill.text}</li>
                            );
                        })}
                        </ul>
                    </Container>
                    <Container className='education-experience'>
                        <h3>Professional Experience</h3>
                        {resume[2]['Professional Experience'].map((workplace) => {
                            return (
                                <Row>
                                    <Col>
                                        <h4>{workplace.date}</h4>
                                    </Col>
                                    <Col>
                                        <h4><b>{workplace.title}</b></h4>
                                        <h4>{workplace.company}</h4>
                                        <ul>
                                            {workplace["points"].map((point) => {
                                                return (
                                                    <li>{point}</li>
                                                );
                                            })}
                                        </ul>
                                    </Col>
                                </Row>
                            );
                        })}
                    </Container>
                    <Container className='education-experience'>
                        <h3>Projects</h3>
                        <ul>
                        {resume[3]['Projects'].map((project) => {
                            return (
                                <li><b>{project.name}</b> - {project.desc}</li>
                            );
                        })}
                        </ul>
                    </Container>
                </div>
            ) : null}
            <p>
                A PDF version of my resume (with better formatting than this page) is available
                <a href="https://raw.githubusercontent.com/Kolarias/sethparsons-website/main/backend/backend_data/seth_parsons_resume.pdf" target="_blank" rel="noreferrer"> here.</a>
            </p>
        </Container>
    );
}

export default Resume;