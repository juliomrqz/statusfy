FROM node:8-alpine AS builder

ENV STATUSFY_VERSION 0.3.2-beta.3
ENV NODE_ENV production

WORKDIR /usr/src/app

RUN \
   set -x \
&& yarn install \
&& yarn add "statusfy@$STATUSFY_VERSION" \
&& npx statusfy build


FROM node:8-alpine

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 3000
ENV WORKDIR /usr/src/app

COPY --from=builder --chown=node:node /usr/src/app/ $WORKDIR

COPY ./scripts/docker-start.sh /start.sh

WORKDIR $WORKDIR
VOLUME $WORKDIR
EXPOSE $PORT

CMD ["/start.sh"]
