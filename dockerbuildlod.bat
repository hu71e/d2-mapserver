@echo off
CALL npm run build
CALL obfuscate.bat
docker rmi joffreybesos/d2-mapserver2:latest
docker build -f Dockerfile.lod.dockerfile . -t joffreybesos/d2-mapserver2:include
rem docker run -v "e/dev/d2-mapserver/cache:/app/cache" -p 3004:3004 -e PORT=3004 joffreybesos/d2-mapserver2:latest

rem docker run -v "e/dev/d2-mapserver/cache:/app/cache" -p 3002:3002 -e PORT=3002 joffreybesos/d2-mapserver2:latest