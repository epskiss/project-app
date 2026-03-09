const express = require('express'); 
const { Pool } = require('pg'); 
const cors = require('cors'); 

const app = express(); 
const PORT = 3000; 

app.use(cors()); 
app.use(express.json());

const pool = new Pool({ 
user: 'postgres', 
host: 'localhost', 
database: 'project', 
password: 'cranbrook1', 
port: 5432 
});

app.get('/api/achievements', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT achievements.*, 
               players.name as player_name, 
               players.user_name,
               games.title as game_title,
               games.developer,
               games.platform
        FROM achievements
        JOIN players ON achievements.player_id = players.player_id
        JOIN games ON achievements.game_id = games.game_id
      `);
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`); 
  });
