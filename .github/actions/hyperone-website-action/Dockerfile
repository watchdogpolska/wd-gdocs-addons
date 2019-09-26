FROM h1cr.io/cli:v1.8.0

LABEL "name"="github-push"
LABEL "maintainer"="Adam Dobrawy <git+push@jawnosc.tk>"
LABEL "version"="0.0.1"

LABEL "com.github.actions.name"="Deploy action for HyperOne Website"
LABEL "com.github.actions.description"="Runs 'git push' to GitHub in an Action"
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="green"
ENV HYPERONE_EARLY_ADOPTERS="1"

COPY README.md LICENSE start.sh /

RUN apk add --no-cache rsync sshpass

CMD ["/start.sh"]
