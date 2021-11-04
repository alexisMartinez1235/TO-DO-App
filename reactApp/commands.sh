if [ -d "my-app" ]; then
    rm -r my-app
    npm rm -g create-react-app
    npm install -g create-react-app
    npx create-react-app my-app --use-npm
    npm install -g --save nodemon
fi

cd my-app
npm start