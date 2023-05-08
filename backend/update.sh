# assume we're already in backend folder
git fetch
git pull
sudo docker ps -aq | xargs sudo docker stop | xargs sudo docker rm
sudo docker build -t sethparsons-website-backend -f aws.Dockerfile .
sudo docker run --rm -it -p 80:80 sethparsons-website-backend
