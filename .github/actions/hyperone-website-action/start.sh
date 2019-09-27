#!/bin/sh
set -e
[ -z "${INPUT_WEBSITE_ID}" ] && {
    echo 'Missing input "website_id: xxxxxxxxx".';
    exit 1;
};
echo "Push to HyperOne Website: ${INPUT_WEBSITE_ID}";
HOST="${INPUT_WEBSITE_ID}.website.${INPUT_WEBSITE_REGION}.hyperone.cloud"

sshpass -p "${INPUT_WEBSITE_PASSWORD}" rsync -e "ssh -v  -o StrictHostKeyChecking=no " -av ${INPUT_SOURCE} "${INPUT_WEBSITE_ID}@${HOST}:${INPUT_DESTINATION}";

[ -z "${INPUT_TOKEN}" ] && {
    echo 'Missing input "token: xxxxxxxxx".';
    echo 'Skiping restart';
    exit 0;
} || {
    echo "Restarting HyperOne Website: ${INPUT_WEBSITE_ID}";
    HYPERONE_ACCESS_TOKEN_SECRET="${INPUT_TOKEN}" h1 website stop --website ${INPUT_WEBSITE_ID};
    HYPERONE_ACCESS_TOKEN_SECRET="${INPUT_TOKEN}" h1 website start --website ${INPUT_WEBSITE_ID};
};