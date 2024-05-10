import express from 'express';
import testRoutes from './test-route';

// import shiftRoute from './shift.route'
const router = express.Router();

interface RouteDetails {
  path: string;
  route: any;
}

const routes: Array<RouteDetails> = [
  {
    path: '/',
    route: testRoutes
  }
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
