#!/bin/bash
dirs=`ls`

for dir in $dirs; do
    if [ -f $dir/start/package.json ]; then      
      echo "Installing dependencies in $dir/start"
      npm install $dir/start
      if [ -f $dir/solution/package.json ]; then
        echo "Installing dependencies in $dir/solution"
        npm install $dir/solution    
      fi      
    elif [ -f $dir/package.json ]; then 
      echo "Installing dependencies in $dir"
      npm install $dir      
    fi
done  
