npm run build-linux
docker rmi joffreybesos/d2-mapserver:latest
docker build . -t joffreybesos/d2-mapserver:latest
