# Make a run environment with nodejs and wine
FROM tianon/wine:5

RUN apt-get update -yq \
    && apt-get install curl wget gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash \
    && apt-get install nodejs make g++ -yq \
    && apt-get install -qq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

ARG BUILDDIR="/tmp/build"
ARG PYTHON_VER="3.6.8"

WORKDIR ${BUILDDIR}

# install python 3.5.6 which is needed to build node-canvas
# node-canvas has to be rebuilt for docker based os
RUN apt-get update -qq && \
    apt-get upgrade -y  > /dev/null 2>&1 && \
    apt-get install wget gcc make zlib1g-dev -y -qq > /dev/null 2>&1 && \
    wget --quiet https://www.python.org/ftp/python/${PYTHON_VER}/Python-${PYTHON_VER}.tgz > /dev/null 2>&1 && \
    tar zxf Python-${PYTHON_VER}.tgz && \
    cd Python-${PYTHON_VER} && \
    ./configure  > /dev/null 2>&1 && \
    make > /dev/null 2>&1 && \
    make install > /dev/null 2>&1 && \
    rm -rf ${BUILDDIR} 

# add fonts for generating images
COPY ./build/static/Roboto-Regular.ttf ./
COPY ./build/static/Roboto-Bold.ttf ./
COPY ./build/static/exocetblizzardot-medium.otf ./
RUN mkdir -p /usr/share/fonts/truetype/
RUN install -m644 Roboto-Regular.ttf /usr/share/fonts/truetype/
RUN install -m644 Roboto-Bold.ttf /usr/share/fonts/truetype/
RUN install -m644 exocetblizzardot-medium.otf /usr/share/fonts/truetype/
RUN rm ./Roboto-Regular.ttf
RUN rm ./Roboto-Bold.ttf
RUN rm ./exocetblizzardot-medium.otf
RUN fc-cache -f

ENV WINEARCH=win32
ENV WINEDEBUG=-all
ENV NODE_ENV=production

VOLUME [ "/app/game" ]
VOLUME [ "/app/cache" ]

EXPOSE ${PORT}

WORKDIR /app
COPY /bin/d2-map.exe /app/bin/d2-map.exe
COPY /bin/d2.install.reg /app/
COPY package.json /app/
RUN npm install canvas --build-from-source
RUN npm install --production
COPY /build/ /app/build/

# COPY game /app/game/
CMD ["node", "build/server/server.js"]