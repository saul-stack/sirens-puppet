#!/bin/bash

PORT=5173 
APP_NAME="node"

if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    if lsof -i :$PORT | grep -q "$APP_NAME"; then
        echo "React app running on port $PORT. Ending game"
    else
        echo "Port $PORT is in use by another process. Kill sequence aborted."
        exit 1
    fi
else
    echo "Port $PORT is not in use (game not running). Kill sequence aborted."
    exit 1
fi


# kill app.py and close port
pkill -9 -f app.py

#kill process on port 5173
sudo kill -9 `sudo lsof -t -i:5173`