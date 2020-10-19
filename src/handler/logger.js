const morgan = require('morgan');
const { createLogger, format, transports } = require('winston');
// const { createWriteStream } = require('fs');

// const writeType = 'a';

// WINSTON LOGGER
const logger = createLogger({
  // format: format.printf(log => log.message),
  transports: [
    // new transports.Console({
    //   format: format.printf(log => log.message),
    //   colorize: true
    // }),
    new transports.File({
      filename: './logs/error.log',
      level: 'error',
      name: 'error',
      json: true,
      format: format.printf(log => (log.level === 'error' ? log.message : ''))
    }),
    new transports.File({
      filename: './logs/info.log',
      level: 'info',
      name: 'info',
      format: format.printf(log => (log.level === 'info' ? log.message : ''))
    })
  ],
  exitOnError: true
});

// LOGGER STREAM
logger.stream = {
  write(message) {
    logger.info(message);
  }
};

// REQUEST BODY
morgan.token('body', req => {
  const body = req.body;
  if (body.password) body.password = body.password.replace(/./g, '*');
  return JSON.stringify(req.body);
});

// REQUEST QUERY PARAMETERS
morgan.token('params', req => JSON.stringify(req.params));
morgan.token('query', req => JSON.stringify(req.query));

// MORGAN
const requestLogger = morgan(
  'TIME: :date[clf] METHOD: :method STATUS CODE: :status URL: :url PARAMETERS: :params QUERY: :query BODY: :body RESPONSE TIME: :response-time ms ',
  {
    // stream: createWriteStream(
    //     'logs.log',
    //     {'flags': writeType})
    stream: logger.stream
  }
);

// uncaughtException
process.on('uncaughtException', error => {
  console.log(error.stack);
  logger.error(error.stack, () => {
    // process.exit(1);
    process.exitCode = 1;
  });
});
process.on('unhandledRejection', error => {
  //   logger.on('finish', () => {
  //     process.exit();
  //   })
  logger.error(error.stack);
  console.log(error.stack);

  // logger.end();
  // logger.error(promise.message, function() {
  //   process.exiit(1);
  // })
  // logger.on('error', function(promise) {
  //   logger.error(promise.stack);
  // })
});

const handlerError = (err, req, res, next) => {
  console.log(err.stack);
  logger.log(
    'error',
    `ERROR! MESSAGE: ${err.message} SERVER STATUS: ${err.serverStatus} STATUS: ${err.status}`
  );
  res.status(500).send('Server error');
  next();
};

module.exports = { requestLogger, logger, handlerError };
