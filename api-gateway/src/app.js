import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import * as dotenv from 'dotenv';

import gatewayMiddleware from './middleware/gateway.middleware.js';

dotenv.config();

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(helmet());
// Giam bang thong
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// MIDDLE WARE
// app.use(JwtService.verifyAccessToken);

// Gateway

app.use('/api/v1/auth', gatewayMiddleware({ target: 'http://localhost:8000' }));

// Proxy middleware configuration for the product service
app.use(
  '/api/v1/product',
  gatewayMiddleware({ target: 'http://localhost:8081' })
);
app.use(
  '/api/v1/discount',
  gatewayMiddleware({ target: 'http://localhost:8081' })
);

// Proxy middleware configuration for the cart service
app.use('/api/v1/cart', gatewayMiddleware({ target: 'http://localhost:8082' }));

// Proxy middleware configuration for the order service
app.use(
  '/api/v1//order',
  gatewayMiddleware({ target: 'http://localhost:8083' })
);

// Proxy middleware configuration for the inventory service
app.use(
  '/api/v1/inventory',
  gatewayMiddleware({ target: 'http://localhost:8084' })
);

// Proxy middleware configuration for the shop service
app.use('/api/v1/shop', gatewayMiddleware({ target: 'http://localhost:8085' }));

// Proxy middleware configuration for the order service
app.use(
  '/api/v1/order',
  gatewayMiddleware({ target: 'http://localhost:8086' })
);

export default app;
