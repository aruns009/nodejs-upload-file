# Makefile
# provides helper targets to run docker-compose commands

# all targets are phony
# https://www.gnu.org/software/make/manual/html_node/Phony-Targets.html
.PHONY: rm rmi rmv clean down test test-down test-build

# default 'make' command uses docker-compose.yaml to build, up -d and logs -f
.DEFAULT_GOAL := logs

# remove all containers
rm:
	docker ps -aq | xargs docker rm -f

# remove all images
rmi:
	docker images -aq | xargs docker rmi -f

# remove all volumes
rmv:
	docker volume ls -q | xargs docker volume rm -f

# remove all containers, images and volumes
clean: rm rmi rmv

# kill and remove containers and volumes
down:
	docker-compose -f compose/develop.yaml down -v

# build images
build:
	docker-compose -f compose/develop.yaml build

# run containers in background
up: build
	docker-compose -f compose/develop.yaml up -d

# follow logs
logs: rm up
	docker-compose -f compose/develop.yaml logs -f

# follow logs
test: test-build
	docker-compose -f compose/test.yaml logs
# kill and remove containers and volumes
test-down:
	docker-compose -f compose/test.yaml down -v

# build images
test-build:
	docker-compose -f compose/test.yaml build