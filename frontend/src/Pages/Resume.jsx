import React, { useState, useEffect }  from "react";
import { backendApi } from "../Assets/Constants";
import { Container, Stack, Col, Row, Image, Card, Button} from 'react-bootstrap'
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
        <Container style={{paddingTop: '20px'}}> 
            {load ? (
                <div>
                    <Container className='basic-info'>
                        <h3>{resume[0]['Basic Info'][0].name}</h3>
                        <h4>{resume[0]['Basic Info'][0].address}</h4>
                        <h4>{resume[0]['Basic Info'][0].email}</h4>
                        <h4>{resume[0]['Basic Info'][0].link}</h4>
                        <h4>{resume[0]['Basic Info'][0].summary}</h4>
                    </Container>
                    <Container className='education'>
                        {resume[1]['Education'].map((institution) => {
                            return (
                                null
                            );
                        })}
                    </Container>
                </div>
            ) : null}
        </Container>
    );
}

export default Resume;