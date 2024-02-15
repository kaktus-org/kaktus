FROM nginx:latest

RUN openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 && \
    openssl rsa -passin pass:x -in server.pass.key -out /etc/nginx/server.key && \
    rm server.pass.key && \
    openssl req -new -key /etc/nginx/server.key -out server.csr \
    -subj "/C=UK/ST=London/L=London/O=kaktus/OU=kaktus/CN=kaktus.money" && \
    openssl x509 -req -days 365 -in server.csr -signkey /etc/nginx/server.key -out /etc/nginx/server.crt
