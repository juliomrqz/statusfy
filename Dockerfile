FROM node:8-alpine

RUN apk add --no-cache git

# Set environment variables
ENV USER_DIR=/usr/src/app
ENV NODE_ENV production
ENV STATUSFY_VERSION=0.3.1
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000

RUN mkdir -p $USER_DIR
RUN chown node:node "$USER_DIR"
WORKDIR $USER_DIR

# RUN yarn cache clean
# RUN yarn global add "statusfy@$STATUSFY_VERSION"

COPY ./scripts/docker-start.sh /start.sh
RUN chmod +x /start.sh

VOLUME $USER_DIR
EXPOSE $PORT

CMD ["sh", "/start.sh"]
