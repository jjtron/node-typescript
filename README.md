Start back-end server with  
**ts-node-dev ./src/server.ts**  

Lint back-end code with  
**tslint -c tslint.json 'src/\*\*/\*.ts'**  

Start front-end with  
**cd public/**  
**npm start**  

Lint front-end code with  
**cd public/**  
**tslint -c tslint.json 'src/\*\*/\*.ts'**  

[See this website for computer setup help on nodejs/typescript](https://blog.sourcerer.io/a-crash-course-on-typescript-with-node-js-2c376285afe1)

Compile to javascript  
**tsc -p tsconfig.json**  

Run as javascript  
**node src/server.js**