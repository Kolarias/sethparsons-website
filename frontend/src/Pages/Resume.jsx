import React, { useState, useEffect }  from "react";
import { backendApi } from "../Assets/Constants";
import { Container, Col, Row, Image, Card, Button} from 'react-bootstrap'

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
                    <h3 className='d-flex justify-content-left'>{resume[0]['Basic Info'][0].name}</h3>
                    <h4>{resume[0]['Basic Info'][0].address}</h4>
                    <h4>{resume[0]['Basic Info'][0].email}</h4>
                    <h4>{resume[0]['Basic Info'][0].link}</h4>
                    <h4>{resume[0]['Basic Info'][0].summary}</h4>
                </div>
            ) : null}
        </Container>
    );
}

export default Resume;