Start back-end server with ts compiler in watch mode with  
**npm run ts-dev**  

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

RUN WITH NODEJS INSPECT  
(some typescript compile errors may occur that need fixing for this to work)  
**node --inspect --require /Users/jpetron/.npm-packages/lib/node_modules/ts-node/register ./src/server.ts**  

debug with  
**127.0.0.1:9229/json/list**  

REDIS  
START and keep running  
**redis-server --daemonize yes**  
STOP  
**redis-cli shutdown**