import React, { useState, useEffect} from "react";
import { useParams } from "react-router";
import { backendApi } from "../Assets/Constants";
import { Spinner, Container, Button } from "react-bootstrap";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "./Hobjects.css"

function HobbyInstance() {
    // State
    const id = useParams()["id"];
    const [Hobby, setHobby] = useState([]);
    const [load, setLoad] = useState(false);

    // API Call
    const getHobby = async () => {
        try {
            if (!load) {
                const data = await backendApi.get("hobbies/" + id);
                setHobby(data.data.hobby);
                setLoad(true);
            }
        } catch (e) {
            // log any errors
            console.log(e);
        }
    };
    
    useEffect(() => {
        getHobby();
    }, [Hobby, load]);

    // Slideshow code inspired by https://react-slideshow-image.netlify.app/?path=/story/introduction--page
    return (
        <div className="root">
        <Container>
            {load ? (
                <>
                    <Slide transitionDuration={800}>
                        {Hobby.pics.map((picture) => {
                            return (
                                <div className="each-slide-effect">
                                    <div style={{ 'backgroundImage': `url(${picture})` }}>
                                    </div>
                                </div>
                            );
                        })}
                    </Slide>
                    <p style={{paddingTop: '20px'}}>{Hobby.desc}</p>
                    <div className="buttons">
                        <a href="javascript:history.back()" rel="noreferrer">
                            <Button> Back to Hobbies </Button>
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

export default HobbyInstance;