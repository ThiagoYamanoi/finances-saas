import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: 'Token não enviado'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido ou expirado'
    });
  }
}