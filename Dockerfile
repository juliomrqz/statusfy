FROM node:8-alpine

# Set environment variables
ENV USER_DIR=/usr/src/app
ENV NODE_ENV production
ENV STATUSFY_VERSION=0.3.0-alpha.1
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV HOST 0.0.0.0
ENV NUXT_PORT 3000
ENV PORT 3000

RUN mkdir -p $USER_DIR
RUN chown node:node "$USER_DIR"
WORKDIR $USER_DIR

RUN npm install -g "statusfy@$STATUSFY_VERSION"

COPY ./scripts/docker-start.sh /

VOLUME $USER_DIR
EXPOSE $NUXT_PORT

CMD ["/start.sh"]
