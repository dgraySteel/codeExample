
#JUST NODE Server
# FROM node:alpine AS builder

# WORKDIR /client

# COPY . .

# RUN npm install && \
#     npm run build

# FROM nginx:alpine

# COPY --from=builder /client/dist/ /usr/share/nginx/html/

#CENTOS
FROM centos:7.6.1810

RUN yum -y update
RUN yum install -y python

COPY /build/* /app/

ENTRYPOINT APP=/ python2 -m SimpleHTTPServer 80

#IF You need a full Ubuntu system
# FROM ubuntu

# RUN apt-get update
# RUN apt-get install -y python

# COPY /build/* /app/

# ENTRYPOINT APP=/ python2 -m SimpleHTTPServer 80