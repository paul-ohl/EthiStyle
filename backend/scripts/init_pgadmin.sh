#!/bin/sh

docker run \
	-e PGADMIN_DEFAULT_EMAIL=postgres@gmail.com \
	-e PGADMIN_DEFAULT_PASSWORD=password \
	-p 8080:80 dpage/pgadmin4
