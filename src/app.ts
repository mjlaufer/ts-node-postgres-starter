import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { users } from './routes';
import { errorHandler, notFound } from './middleware/errors';

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan(app.get('env') === 'development' ? 'dev' : 'common'));

app.use('/users', users);

app.use(notFound);
app.use(errorHandler(app));

export default app;
