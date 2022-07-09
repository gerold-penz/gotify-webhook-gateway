FROM node:18-alpine
LABEL maintainer="Gerold Penz Softwaretechnik - <gerold@gp-softwaretechnik.at>"

# Environment
WORKDIR "/app"
ENV NODE_ENV="production"

# Install
COPY [".", "/app"]
RUN ["npm", "install"]
RUN ["npm", "run", "build"]

# Start
CMD ["npm", "start"]
