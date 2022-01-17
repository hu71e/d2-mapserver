@echo off
CALL npm run build
CALL obfuscate.bat
docker rmi joffreybesos/d2-mapserver-test:latest
docker build . -t joffreybesos/d2-mapserver-test:latest
docker run -it -v "e/dev/d2-mapserver/cache:/app/cache" -v "/e/Games/Diablo II - 1.13c":/app/game -p 3006:3006 -e PORT=3006 joffreybesos/d2-mapserver-test:latest /bin/bash