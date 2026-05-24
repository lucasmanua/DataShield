const API_BASE = '/api';

let authToken = localStorage.getItem('datashield_token');

export function setToken(token) {
  authToken = token;
  if (token) localStorage.setItem('datashield_token', token);
  else localStorage.removeItem('datashield_token');
}

export function getToken() {
  return authToken;
}

export function getUser() {
  const user = localStorage.getItem('datashield_user');
  return user ? JSON.parse(user) : null;
}

export function setUser(user) {
  if (user) localStorage.setItem('datashield_user', JSON.stringify(user));
  else localStorage.removeItem('datashield_user');
}

export function logout() {
  setToken(null);
  setUser(null);
}

async function request(endpoint, options = {}) {
  const { method = 'GET', body, auth = true, params } = options;

  const headers = { 'Content-Type': 'application/json' };
  if (auth && authToken) headers['Authorization'] = `Bearer ${authToken}`;

  let url = `${API_BASE}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') searchParams.append(k, v);
    });
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (res.status === 401 && auth) {
    logout();
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  const contentType = res.headers.get('content-type');
  if (contentType?.includes('text/csv')) {
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datashield-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    return { ok: true };
  }

  const text = await res.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text }; }

  if (!res.ok) throw new Error(data.message || `Error ${res.status}`);
  return data;
}

export const api = {
  auth: {
    login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password }, auth: false }),
    register: (data) => request('/auth/register', { method: 'POST', body: data, auth: false }),
    profile: () => request('/auth/profile')
  },
  reports: {
    create: (data) => request('/reports', { method: 'POST', body: data }),
    search: (params) => request('/reports/search', { params }),
    getById: (id) => request(`/reports/${id}`),
    publicSearch: (params) => request('/reports/public/search', { params, auth: false }),
    stats: () => request('/reports/stats', { auth: false })
  },
  admin: {
    list: (params) => request('/admin/reports', { params }),
    validate: (id, status) => request(`/admin/reports/${id}/validate`, { method: 'PUT', body: { status } }),
    export: (params) => request('/admin/reports/export', { params }),
    alerts: () => request('/admin/alerts')
  }
};