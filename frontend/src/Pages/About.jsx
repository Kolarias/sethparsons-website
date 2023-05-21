import React, { useState, useEffect }  from "react";
import { Container, Col, Row, Image, Card, Button} from 'react-bootstrap'
import { backendApi } from "../Assets/Constants";
import "./About.css";

function About() {
    // State
    const [toolList, setToolList] = useState([]);
    const [load, setLoad] = useState(false);

    // API Call
    const getAbout = async () => {
        try {
            if (!load) {
                const data = await backendApi.get("about");
                setToolList(data.data.tools);
                setLoad(true);
            }
        } catch (e) {
            // log any errors
            console.log(e);
        }
    };
    
    useEffect(() => {
        getAbout();
    }, [toolList, load]);

    return (
        <Container style={{paddingTop: '20px'}}>
            <Card.Img src="https://raw.githubusercontent.com/Kolarias/sethparsons-website/main/backend/backend_data/images/me.png" style={{height:280, width:250}}/>
            <Container className='p-4'>
            <h1 className='d-flex justify-content-center'>Hi! I'm Seth Parsons.</h1>
            <p style={{paddingTop: '15px'}}>
                I'm a technology enthusiast and aspiring programmer. Welcome to my personal website!
            </p>
            <p>
                I built this website as a means of practicing my web-dev skills and to show off my interests and 
                projects all in one place. Feel free to look at what I've been up to or get in contact with me 
                using the navigation bar above!
            </p>
            </Container>
            <div className="title-holder">
            <h3>More About Me</h3>
            <p>
                I was born on April 7th, 2000 in a suburban area of Arizona. Growing up, my favorite things to do were
                watch VHS tapes of animated movies and play Nintendo 64 with my siblings. My first interactions with a
                computer were on my Dad's beige 90's Macintosh playing point-and-click adventure games like Freddie Fish
                and Pajama Sam and using dial-up internet 
                <a href="https://www.youtube.com/watch?v=gsNaR6FRuO0" target="_blank" rel="noreferrer"> (gotta love that sound!).</a>
            </p>
            <p>
                We moved to Austin, Texas when I was 6, where I continued to be interested in video games and technology. I 
                got really into Pokémon, playing PS2 and Wii games when my parents allowed, and I started to get familiar 
                with modern computing by making animations and playing flash games on our family's Pentium 4 powered Windows
                XP machine. When I was in 7th grade, I helped start the Computer Club at my middle school, where me and other
                kids got to fix up and otherwise play around with broken and decommissioned school computers. My first ever
                personal computer came from this club - a Dell Optiplex GX620 that I fixed up myself and took home after
                my teacher got it taken off the school inventory.
            </p>
            <p>
                At the beginning of high school, I finally got to build my own computer from scratch for this first time.
                I used this computer to make YouTube videos exploring video games and technology I liked, which gave me the
                experience I needed to be able to join my school's video production team. I also took my first programming
                classes in high school, where I made little games using Scratch or Python in my free time.
            </p>
            <p>
                Once I graduated, I immediately applied for community college at ACC and got my A+ Computer Technician
                certification in hopes of being able to pay for college with an IT job. I got hired at ATS shortly after
                and have been working there ever since while attending college. In 2020 I transferred to the University 
                of Texas at Austin to start a bachelor's degree in Computer Science and will be graduating in 2023.
            </p>
            <p>
                If you're curious about my socials or want to know more about me, check out the other parts of this site!
            </p>
            </div>
            <div className="title-holder">
                <h3>More About this Website</h3>
                <p>
                    This website is a React.js application that talks to a Flask backend for most of its data. It was built
                    from scratch with code based largely on the work I did on FuturFindr in my Software Engineering class
                    at UT (which you can see more about in the Projects page of this site). All of my code is available
                    on Github at the link below and you can access the backend API at
                    <a href="https://api.sethparsons.me" target="_blank" rel="noreferrer"> api.sethparsons.me</a>.
                </p>
                <p>
                    (I'm aware this website is so small that a backend probably isn't necessary, but I thought it would
                    be good practice and backend work is more fun anyway!)
                </p>
            </div>
            <div className="buttons">
                <a href="https://github.com/Kolarias/sethparsons-website" target="_blank" rel="noreferrer">
                    <Button> Github Repo </Button>
                </a> {" "}
                <a href="https://documenter.getpostman.com/view/11520528/2s93kxcmSQ" target="_blank" rel="noreferrer">
                    <Button> API Docs </Button>
                </a>
            </div>
            <h4 style={{paddingTop: '30px'}}>Tools Used</h4>
            {load ? (
                <Row className="portfoliolist">
                    {toolList.map((tool) => {
                        return (
                            <Col md={2}>
                                <div className="portfolio-wrapper">
                                    <a href={tool.link} target="_blank" rel="noreferrer">
                                    <Image src={tool.pic} />
                                    <div className="label text-center">
                                        <h3>{tool.name}</h3>
                                        <p>{tool.desc}</p>
                                    </div>
                                    </a>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            ) : null}
        </Container>
    );
}

export default About;