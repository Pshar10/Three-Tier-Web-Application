#!/bin/bash

# Define the directory containing the YAML files
DIR="./deploy"

# Check if the directory exists
if [ ! -d "$DIR" ]; then
    echo "Directory $DIR does not exist."
    exit 1
fi

# Iterate over each YAML file in the directory
for FILE in "$DIR"/*.yaml; do
    # Check if the file exists
    if [ -f "$FILE" ]; then
        echo "Applying $FILE..."
        kubectl apply -f "$FILE"
    else
        echo "No YAML files found in $DIR."
        break
    fi
done

echo "All YAML files have been applied."