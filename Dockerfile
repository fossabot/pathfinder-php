FROM php:7.2-fpm-alpine

LABEL Maintainer="Ezra Lazuardy <ezralucio@gmail.com>" \
    Description="A simple, no-nonsense pure PHP 7 pathfinding algorithm visualizer web app ✨"

# update repository
RUN apk update

# install packages
RUN apk add --no-cache \
    php7 \
    php7-fpm \
    php7-common \
    nginx \
    supervisor

# removing repository cache
RUN rm -rf /var/cache/apk/*

# configure nginx
COPY .docker/nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# configure PHP-FPM
COPY .docker/php/php-fpm.conf /etc/php7/php-fpm.conf
COPY .docker/php/php.ini /etc/php7/conf.d/custom.ini

# configure supervisord
COPY .docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# remove cache
RUN rm -rf /var/cache/apk/*

# setup document root
RUN mkdir -p /var/www/html

# make sure files / folders needed by the processes are accessable when they run under the nobody user
RUN chown -R nobody.nobody /run && \
    chown -R nobody.nobody /var/log && \
    chown -R nobody.nobody /var/www/html && \
    chown -R nobody.nobody /var/lib/nginx

# add application
WORKDIR /var/www/html
COPY --chown=nobody . /var/www/html

# remove unused files & directories
RUN rm -rf \
    .git \
    .docker \
    .github \
    .idea \
    .vscode \
    .gitattributes \
    .gitignore \
    README.md \
    LICENSE \
    Dockerfile \
    docker-compose.yml

# expose the port nginx is reachable on
EXPOSE 80

# let supervisord start nginx & php-fpm
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

# configure a healthcheck to validate that everything is up & running
HEALTHCHECK --timeout=10s CMD curl --silent --fail http://127.0.0.1/fpm-ping

# switch to a non-root user from here on
USER nobody