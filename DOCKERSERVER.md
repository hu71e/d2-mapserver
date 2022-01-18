# Running your own map server

This should be relatively easy.  
This will spawn a server on your machine running on port 3002 which you can configure the d2r-mapview to use. This removes your reliance on my overloaded free server which could go offline at any time.

## Prerequisites

Install the following

- [Docker](https://docs.docker.com/get-docker/)
- Diablo 2, with LoD expansion (__NOT resurrected!__) installation - [download](https://mega.nz/file/EgdmXT7C#sRNJGN-QlB24-9jqaI5DBWgFrbCw0Bezj-S0aY_Jn6k)
- Diablo 2 LoD [patch 1.13c](http://ftp.blizzard.com/pub/diablo2exp/patches/PC/LODPatch_113c.exe) if not already patched

You don't need to run Diablo 2, the game files simply need to be available. But it MUST be 1.13c.

__Note__: Some people have trouble getting the server to access files in `C:\Program Files (x86)` so either install to a different directory, or copy the game files to a new location.

Installing docker on Windows may require you to install WSL2 and other extra components. You will be prompted during installation.
You can use Docker on Linux as well if you prefer.

## Launch

Download the map server docker image to your local machine:
`docker pull docker.io/joffreybesos/d2-mapserver:latest`

If you get the error `docker: invalid reference format.` then make sure you're in cmd rather than powershell.

In the below docker command, change `/d/temp` to a temporary folder on your PC and change `/d/Games/Diablo II` to your D2 installation folder:

`docker run -d -v "/d/temp:/app/cache" -v "/e/Games/Diablo II:/app/game" --name d2-mapserver -p 3002:3002 -e PORT=3002 joffreybesos/d2-mapserver:latest`

So if you want to cache your map data into `C:\Users\username\temp` and your Diablo2 files are in `D:\Games\Diablo II`, then this will be your docker command:

`docker run -d -v "/c/users/username/temp:/app/cache" -v "/d/Games/Diablo II:/app/game" --name d2-mapserver -p 3002:3002 -e PORT=3002 joffreybesos/d2-mapserver:latest`

You can also change the port from 3002 to something else if you prefer.

Once it's running you should see the following output:

```text
[18.11.2021 22:39.11.843] [LOG]   Adding font /app/build/static/Roboto-Regular.ttf
[18.11.2021 22:39.11.851] [LOG]   Updating wine registry....
wine: created the configuration directory '/app/wine_d2'
Could not find Wine Gecko. HTML rendering will be disabled.
wine: configuration in L"/app/wine_d2" has been updated.

Note that '(null)/.local/share' is not in the search path
set by the XDG_DATA_HOME and XDG_DATA_DIRS
environment variables, so applications may not
be able to find it until you set them. The
directories currently searched are:

- /root/.local/share
- /usr/local/share/
- /usr/share/

[18.11.2021 22:39.28.667] [LOG]   Running on http://0.0.0.0:3002
```

This means the server is working.  
If you don't see the above output, refer to the troubleeshooting section below.

## Verify

You can test your map server by opening the URL <http://localhost:3002/v1/map/123456/2/46/image> in your browser.  
If you get `{}` as a response, see troubleshooting steps below.

## Usage

Once the server is working, edit your `settings.ini` file of your client.  
Change `baseurl` to this: `baseUrl=http://localhost:3002`  
Make sure there is no trailing slash.

## Performance

If you find the local map server is running slow (you're likely on windows) there is a fix.  
The problem lies in WSL in how it handles mapped docker volumes, it has an overhead that causes performance issues.
The fix is to copy the game files to inside your docker container, rather than map to a volume outside the container.

To achieve this, simply:

- Download `server.bat` from this code repostory.
- Save `server.bat` to your Diablo 2 Classic game files folder.
- Make sure you don't have any running map servers.
- Run the file and wait for it to build.

It will take some time to build, but will run the map server at the end.
Then you should be able to use the mapserver like normal on `localhost:3002`

Note: This performance method isn't really supported. It may take up too much memory, some people have had success with it.

## Shutting down

You can either go to Docker Desktop, select the running container and click the stop button.
Or you can do `docker stop d2-mapserver` (if you've used the `--name d2-mapserver` parameter when you ran it)

## Updating

Occasionally you need to update your mapserver. Follow these steps:

- Stop your existing map server (see above)
- Pull the latest `docker pull docker.io/joffreybesos/d2-mapserver:latest`
- Delete your old container `docker rm d2-mapserver`
- Then run as normal.

## Troubleshoot

1. __Double and triple check your game folder__
  Ensure you have the right version 1.13c with LoD
  Ensure the folder name is correct
  
2. __Check wine errors__
  Go to your cache folder, look for `wineerrors.log`. Most likely it has a problem with your game files.

3. __Check raw data is being served__
  Remove the trailing `/image` from the URL <http://localhost:3002/v1/map/123456/2/46>
  You should see JSON data being returned.  

4. __Verify map data is being saved__
  Go to your cache folder used in your server docker command, e.g `/d/temp`. Check that JSON files are present, open them to ensure they are filled with map data. They should be about 1mb in size.  

5. __Delete your cache__
  Delete all of the JSON files out of your cache folder. You won't need to restart your server. This will force generation of fresh data.  

6. __Confirm server is actually processing data__
  Run this command (but replace the cache and game paths with your own):  

    `docker run -it -v "/c/users/name/temp:/app/cache" -v "/c/users/name/Diablo II":/app/game joffreybesos/d2-mapserver:latest /bin/bash`  
    - You need to make sure you have the `-it` and `/bin/bash`  
    - It should launch a bash session of that docker container    
  Run these commands in that bash session:  
    - `wine regedit /app/d2.install.reg`  
    - `wine bin/d2-map.exe game --seed 10 --map 1 --difficulty 2`  
  You should see rogue encampment map data.  

      Also try:
    - `wine bin/d2-map.exe game --seed 10 --difficulty 2`
    This will generate a massive amount of output, but if it completes without error then your server is generating map data successfully.

### Other errors

1. __Error message: "docker: invalid reference format."__
  If you get the error "docker: invalid reference format." then make sure you are running in cmd rather than powershell
  If you opened <http://localhost:3002/v1/map/123456/2/46/image> and didn't get an image you can try the following:

2. __`VMMem` process is taking up all my memory__
  VMMem will grow in size, technically this shouldn't be an issue.  
  But if you want to free this up, simply open an admin powershell window and run:  
  `Restart-Service LxssManager`  
  This will close any running containers and restart your docker daemon.  