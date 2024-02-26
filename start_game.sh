#!/bin/bash

PORT=5173

if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "Port $PORT is already in use. Please close processes on this port and try again. Exiting..."
    exit 1
fi

python3 ./Backend/app.py &
cd Frontend
npm run dev &
sleep 5
xdg-open http://localhost:5173

