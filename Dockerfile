FROM node:18-alpine
LABEL maintainer="Gerold Penz Softwaretechnik - <gerold@gp-softwaretechnik.at>"

WORKDIR "/home/node/app"
ENV NODE_ENV="development"

COPY [".", "/home/node/app"]
RUN ["npm", "install", "--production"]
RUN ["npm", "run", "build"]

CMD ["node", "dist/index.js"]

