
const tryCatch = (fn: any) => {
  return async (req: any, res: any, next: any) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default tryCatch