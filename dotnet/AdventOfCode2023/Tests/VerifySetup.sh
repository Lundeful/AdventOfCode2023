#!/bin/bash

templateDir="Day00Part00"

for day in {1..25}; do
    for part in {1..2}; do
        formattedDay=$(printf "%02d" $day)
        formattedPart=$(printf "%02d" $part)
        newDir="Day${formattedDay}Part${formattedPart}"

        # Create new directory if it doesn't exist
        mkdir -p $newDir

        # Copy each file if it doesn't exist in the new directory
        for file in $templateDir/*; do
            fileName=$(basename $file)
            targetFile="$newDir/$fileName"

            if [ ! -f "$targetFile" ]; then
                cp $file $targetFile
            fi
        done

        # Rename and update CS file
        if [ -f "$newDir/Day00Part00.cs" ]; then
            mv "$newDir/Day00Part00.cs" "$newDir/$newDir.cs"
            sed -i '' "s/Day00Part00/$newDir/g" "$newDir/$newDir.cs"
        fi
    done
done
