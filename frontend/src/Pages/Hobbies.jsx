import React, { useState, useEffect} from "react";
import { backendApi } from "../Assets/Constants";
import { Spinner, Row, Col, Container, Card } from "react-bootstrap";
import "./Hobjects.css"

function Hobbies() {
    // State
    const [hobbyList, setHobbyList] = useState([]);
    const [load, setLoad] = useState(false);

    // API Call
    const getHobbies = async () => {
        try {
            if (!load) {
                const data = await backendApi.get("hobbies");
                setHobbyList(data.data.hobbies);
                setLoad(true);
            }
        } catch (e) {
            // log any errors
            console.log(e);
        }
    };
    
    useEffect(() => {
        getHobbies();
    }, [hobbyList, load]);

    return (
        <>
        <Container>
            {load ? (
                <Row style={{justifyContent: "center"}}>
                    {hobbyList.map((hobby) => {
                        return (
                            <Col sm={4} key={hobby.id} style={{position: "static"}}>
                                <Card className="card border-dark mb-3" style={{height: "90%"}}>
                                    <Card.Img variant="top" src={hobby.pics[0]} />
                                    <Card.Body>
                                        <Card.Title>{hobby.name}</Card.Title>
                                        <a href={`/hobbies/${hobby.id}`} className="stretched-link"></a>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            ) : (
                <Spinner animation="border" variant="info" />
            )}
        </Container>
        </>
    );
}

export default Hobbies;