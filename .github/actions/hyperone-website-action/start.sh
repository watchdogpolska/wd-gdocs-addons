#!/bin/sh
[ -z "${INPUT_WEBSITE_ID}" ] && {
    echo 'Missing input "website_id: xxxxxxxxx".';
    exit 1;
};

echo "Push to website ${INPUT_WEBSITE_ID}";
rsync -av ${INPUT_SOURCE} "${INPUT_WEBSITE_ID}@${INPUT_WEBSITE_ID}.website.${WEBSITE_REGION}.hyperone.cloud:${INPUT_DESTINATION}";

[ -z "${INPUT_TOKEN}" ] && {
    echo 'Missing input "token: xxxxxxxxx".';
    echo 'Skiping restart';
    exit 0;
} || {
    HYPERONE_ACCESS_TOKEN_SECRET="${INPUT_TOKEN}" h1 website restart --website ${INPUT_WEBSITE_ID}
};