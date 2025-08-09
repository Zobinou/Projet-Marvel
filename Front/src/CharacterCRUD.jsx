import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export default function CharacterCRUD() {
  const [characters, setCharacters] = useState([]);
  const [formData, setFormData] = useState({ name: '', realName: '', universe: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    const res = await axios.get('http://localhost:5000/characters');
    setCharacters(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:5000/characters/${editId}`, formData);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/characters', formData);
    }
    setFormData({ name: '', realName: '', universe: '' });
    fetchCharacters();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/characters/${id}`);
    fetchCharacters();
  };

  const handleEdit = (character) => {
    setFormData({
      name: character.name,
      realName: character.realName,
      universe: character.universe,
    });
    setIsEditing(true);
    setEditId(character.id);
  };

  return (
    <div className="container">
      <h1>Marvel Characters</h1>

      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Name" value={formData.name}
               onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
        <input type="text" placeholder="Real Name" value={formData.realName}
               onChange={(e) => setFormData({ ...formData, realName: e.target.value })} required />
        <input type="text" placeholder="Universe" value={formData.universe}
               onChange={(e) => setFormData({ ...formData, universe: e.target.value })} required />
        <button type="submit">{isEditing ? 'Update' : 'Add'} Character</button>
      </form>

      <div className="cards">
        {characters.map(c => (
          <div key={c.id} className="card">
            <h2>{c.name}</h2>
            <p><strong>Real Name:</strong> {c.realName}</p>
            <p><strong>Universe:</strong> {c.universe}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="edit-btn" onClick={() => handleEdit(c)}>✏️ Update</button>
              <button className="delete-btn" onClick={() => handleDelete(c.id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
