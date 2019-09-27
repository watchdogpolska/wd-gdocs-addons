FROM h1cr.io/cli:v1.8.0

LABEL "name"="website-deploy"
LABEL "maintainer"="Adam Dobrawy <git+push@jawnosc.tk>"
LABEL "version"="0.0.1"

LABEL "com.github.actions.name"="Website Deploy Action"
LABEL "com.github.actions.description"="Deploy content to HyperOne Website"
LABEL "com.github.actions.icon"="upload-cloud"
LABEL "com.github.actions.color"="green"
ENV HYPERONE_EARLY_ADOPTERS="1"

RUN apk add --no-cache rsync openssh-client sshpass

COPY README.md LICENSE start.sh /


CMD ["/start.sh"]
