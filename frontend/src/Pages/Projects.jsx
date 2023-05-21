import React, { useState, useEffect} from "react";
import { backendApi } from "../Assets/Constants";
import { Spinner, Row, Col, Container, Card } from "react-bootstrap";
import "./Hobjects.css"

function Projects() {
    // State
    const [ProjectList, setProjectList] = useState([]);
    const [load, setLoad] = useState(false);

    // API Call
    const getProjects = async () => {
        try {
            if (!load) {
                const data = await backendApi.get("projects");
                setProjectList(data.data.projects);
                setLoad(true);
            }
        } catch (e) {
            // log any errors
            console.log(e);
        }
    };
    
    useEffect(() => {
        getProjects();
    }, [ProjectList, load]);

    return (
        <div className="root">
        <Container>
            {load ? (
                <Row style={{justifyContent: "center"}}>
                    {ProjectList.map((Project) => {
                        return (
                            <Col sm={4} key={Project.id} style={{position: "static"}}>
                                <Card className="card border-dark mb-3" style={{height: "90%"}}>
                                    <Card.Img variant="top" src={Project.pics[0]} />
                                    <Card.Body>
                                        <Card.Title>{Project.name}</Card.Title>
                                        <a href={`/projects/${Project.id}`} className="stretched-link"></a>
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
        </div>
    );
}

export default Projects;