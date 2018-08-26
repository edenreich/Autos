FROM ubuntu

LABEL maintainer="Eden Reich<eden.reich@gmail.com>"

RUN apt-get update

RUN apt-get install -y nginx  

RUN rm -v /etc/nginx/nginx.conf

ADD nginx.conf /etc/nginx/

EXPOSE 80

CMD [ "service", "nginx", "start" ]