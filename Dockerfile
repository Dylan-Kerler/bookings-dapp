FROM node:12.18.3

WORKDIR /

COPY ./smart-contracts/ /smart-contracts/
RUN yarn --cwd /smart-contracts install

COPY ./frontend/ /frontend/
RUN yarn --cwd /frontend install

COPY ./backend/ /backend/
RUN yarn --cwd /backend install
RUN yarn --cwd /backend tsc

EXPOSE 7545 3000 8080

CMD sleep 10 \
    && (yarn --cwd ./smart-contracts deploy-ganache --show-stack-traces \
    & yarn --cwd ./frontend dev \
    & yarn --cwd ./backend start)