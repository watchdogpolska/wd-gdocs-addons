#!/bin/sh
set -eu
sed -e "s/%TOKEN%/$WD_TOKEN/g" -e "s/%GUS_API_KEY%/$GUS_API_KEY/g" app/config.template.js > app/config.js;
