#!/bin/bash
cd /Users/mariagarcia/Desktop/earlybrief-platform/saas-frontend
exec python3 -m http.server ${PORT:-5501}
