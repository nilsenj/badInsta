#!/usr/bin/env bash
if [[ $1 == 'run' ]]; then
    cd laradock && docker-compose exec workspace bash && cd ../
fi

if [[ $1 == 'down' ]]; then
    cd laradock && docker-compose down && cd ../
fi

if [[ $1 == 'up' ]]; then
    cd laradock && docker-compose up -d nginx php-fpm php-worker mailhog mysql elasticsearch redis memcached  && cd ../
fi
