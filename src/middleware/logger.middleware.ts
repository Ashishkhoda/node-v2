import { Request, Response, NextFunction } from 'express';

export function loggerMiddelware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = Date.now();

  function logDetails() {
    const duration = Date.now() - startTime;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  }
  // Event listener for when the response is finished
  res.on('finish', logDetails);

  next();
}
