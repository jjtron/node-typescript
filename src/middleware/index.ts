export function middleware1(req, res, next) {
    console.log("I am some middleware 1"); next();
}

export function middleware2(req, res, next) {
    console.log("I am some middleware 2"); next();
}
