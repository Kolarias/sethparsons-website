import React, { useState, useEffect} from "react";
import { useParams } from "react-router";
import { backendApi } from "../Assets/Constants";
import { Spinner, Container, Button } from "react-bootstrap";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "./Hobjects.css"

function ProjectInstance() {
    // State
    const id = useParams()["id"];
    const [Project, setProject] = useState([]);
    const [load, setLoad] = useState(false);

    // API Call
    const getProject = async () => {
        try {
            if (!load) {
                const data = await backendApi.get("projects/" + id);
                setProject(data.data.project);
                setLoad(true);
            }
        } catch (e) {
            // log any errors
            console.log(e);
        }
    };
    
    useEffect(() => {
        getProject();
    }, [Project, load]);

    // Slideshow code inspired by https://react-slideshow-image.netlify.app/?path=/story/introduction--page
    return (
        <div className="root">
        <Container>
            {load ? (
                <>
                    <Slide transitionDuration={800}>
                        {Project.pics.map((picture) => {
                            return (
                                <div className="each-slide-effect">
                                    <div style={{ 'backgroundImage': `url(${picture})` }}>
                                    </div>
                                </div>
                            );
                        })}
                    </Slide>
                    <p style={{paddingTop: '20px'}}>{Project.desc}</p>
                    <div className="buttons">
                        { Project.link.length > 0 ? (
                                <a href={Project.link} target="_blank" rel="noreferrer">
                                    <Button> Repo Link </Button>
                                </a>
                            ) : (null)
                        }
                        <a href="javascript:history.back()" rel="noreferrer">
                            <Button> Back to Projects </Button>
                        </a>
                    </div>
                </>
            ) : (
                <Spinner animation="border" variant="info" />
            )}
        </Container>
        </div>
    );
}

export default ProjectInstance;