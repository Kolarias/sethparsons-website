# SethParsons-Website Backend
### Launching the backend server
For development, run:<br />
`docker build -t sethparsons-website-backend -f Dockerfile .`<br /><br />
`docker run --rm -it -p 5000:5000 sethparsons-website-backend`<br /><br />

Go to [localhost:5000](localhost:5000) on your web browser.<br />

For deployment, run:<br />
`docker build -t sethparsons-website-backend -f aws.Dockerfile .`<br /><br />
`docker run --rm -it -p 80:80 sethparsons-website-backend`<br /><br />