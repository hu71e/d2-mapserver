@echo off
CALL npm run build
CALL obfuscate.bat
docker rmi joffreybesos/d2-mapserver:beta
docker build . -t joffreybesos/d2-mapserver:beta
docker push joffreybesos/d2-mapserver:beta

