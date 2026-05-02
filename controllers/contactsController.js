const pool = require('../config/database');

function validate(body) {
  const errors = {};

  if (!body.name || body.name.length <= 5) {
    errors.name = 'Nome deve ter mais de 5 caracteres';
  }

  if (!body.contact || !/^\d{9}$/.test(body.contact)) {
    errors.contact = 'Contato deve ter exatamente 9 dígitos';
  }

  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.email = 'E-mail inválido';
  }

  return errors;
}

async function getAll(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getOne(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function create(req, res) {
  try {
    const errors = validate(req.body);

    if (!req.file) {
      errors.picture = 'Imagem é obrigatória';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const [duplicate] = await pool.query(
      'SELECT id FROM contacts WHERE contact = ? OR email = ?',
      [req.body.contact, req.body.email]
    );

    if (duplicate.length > 0) {
      return res.status(409).json({ message: 'Contato ou e-mail já cadastrado' });
    }

    const picture = '/uploads/' + req.file.filename;

    const [result] = await pool.query(
      'INSERT INTO contacts (name, contact, email, picture) VALUES (?, ?, ?, ?)',
      [req.body.name, req.body.contact, req.body.email, picture]
    );

    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function update(req, res) {
  try {
    const [existing] = await pool.query('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }

    const errors = validate(req.body);
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const [duplicate] = await pool.query(
      'SELECT id FROM contacts WHERE (contact = ? OR email = ?) AND id != ?',
      [req.body.contact, req.body.email, req.params.id]
    );

    if (duplicate.length > 0) {
      return res.status(409).json({ message: 'Contato ou e-mail já cadastrado' });
    }

    const picture = req.file ? '/uploads/' + req.file.filename : existing[0].picture;

    await pool.query(
      'UPDATE contacts SET name = ?, contact = ?, email = ?, picture = ? WHERE id = ?',
      [req.body.name, req.body.contact, req.body.email, picture, req.params.id]
    );

    const [rows] = await pool.query('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function remove(req, res) {
  try {
    const [existing] = await pool.query('SELECT id FROM contacts WHERE id = ?', [req.params.id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Contato não encontrado' });
    }

    await pool.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    res.json({ message: 'Contato removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getAll, getOne, create, update, remove };
