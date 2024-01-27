#!/usr/bin/env bash

CONTAINER_NAME="yampacked-database"
DATABASE_NAME="db"
USERNAME="admin"
COMMAND="psql -d ${DATABASE_NAME} -U ${USERNAME}"

CONTAINER_STATUS=$(docker inspect --format="{{.State.Running}}" $CONTAINER_NAME 2>/dev/null)

if [ "$CONTAINER_STATUS" = "true" ]; then
    echo "Container ${CONTAINER_NAME} is running. Entering..."
    docker exec -it ${CONTAINER_NAME} bash -c "${COMMAND}"
else
    echo "Container ${CONTAINER_NAME} is not running. Please start the container and try again."
fi
