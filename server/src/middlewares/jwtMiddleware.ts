import jwt from "jsonwebtoken";

export function verifyUser(req: any, res: any, next: (err: any) => any): any {
  let accessToken = req.headers["access-token"];
  if (!accessToken) {
    return res.status(403).json({
      result: false
    });
  }

  const decodedToken = jwt.verify(
    accessToken,
    `${process.env.JWT_KEY}`,
    (err: any, decoded: any) => {
      if (err) throw err;
      return decoded;
    }
  );

  try {
    req.decoded = decodedToken;
    next(true);
  } catch (err) {
    res.status(403).json({
      result: false
    });
  }
}
