#!/bin/bash
DOCKER_BUILDKIT=1
docker-compose -f "docker-compose.yml" up -d --build 
# docker-compose pause