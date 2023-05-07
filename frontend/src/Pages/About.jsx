import React from "react";
import {Container, Stack} from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import Me from "../Assets/me.png";

function About() {
    return (
        <Stack style={{paddingTop: '20px'}}>
            <Card.Img src={Me} style={{height:280, width:250}}/>
            <Container className='p-4'>
            <h2 className='d-flex justify-content-center'>Hi! I'm Seth Parsons.</h2>
            <p>
                I'm a technology enthusiast and aspiring programmer. Welcome to my personal website!
            </p>
            <p>
                I built this website as a means of practicing my web-dev skills and to show off my interests and 
                projects all in one place. Feel free to look at what I've been up to or get in contact with me 
                using the navigation bar above! (Note that this website is still under construction and certain things 
                may be missing).
            </p>
            </Container>
        </Stack>
    );
}

export default About;