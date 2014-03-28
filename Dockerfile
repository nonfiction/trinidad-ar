FROM octohost/nginx

ADD nginx-default.conf /etc/nginx/sites-available/default

ADD . /srv/www/

EXPOSE 80

CMD nginx
