export default function middleware1 (req, res, next) {
    console.log('I am some middleware'); next();
}
