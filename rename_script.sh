#!/bin/bash

# Go through each JPG file (case insensitive)
for file in Pics/*.[jJ][pP][gG]; do
  # Extract the base filename without extension
  basename=$(basename "$file" | sed 's/\.[^.]*$//')
  
  # Rename to temporary file first (to force Git to recognize the change)
  git mv "$file" "Pics/${basename}_temp"
  
  # Then rename to lowercase jpg
  git mv "Pics/${basename}_temp" "Pics/${basename}.jpg"
  
  echo "Renamed $file to Pics/${basename}.jpg"
done
