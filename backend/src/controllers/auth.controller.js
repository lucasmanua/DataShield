import { registerUser, loginUser } from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    error.statusCode = 400;
    throw error;
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.json({ user, token });
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id, email, name, role, region, createdAt } = req.user;
    res.json({ user: { id, email, name, role, region, createdAt } });
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};