import React from 'react';

const CharacterCard = ({ character, onEdit, onDelete }) => {
  return (
    <div style={{
      backgroundColor: '#1e1e1e',
      color: 'white',
      padding: '1rem',
      margin: '0.5rem 0',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h3>{character.name}</h3>
        <p>Real Name: {character.realName}</p>
        <p>Universe: {character.universe}</p>
      </div>
      <div>
        <button onClick={onEdit} style={{ marginRight: '1rem' }}>Edit</button>
        <button onClick={onDelete} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
      </div>
    </div>
  );
};

export default CharacterCard;
