const express = require("express");
const mysql2 = require("mysql2");
const axios = require("axios");
const app = express();
const port = 3000;
const apiKey = "7bd6dc7edbac1d97253aa71988a8963b";

const db = mysql2.createConnection({
  host: "mysql",
  user: "user",
  password: "passwd",
  database: "db_aula",
});

app.get('/temperatura', async (req, res) => {
  const cidade = req.query.cidade;

  if (!cidade) {
      return res.status(400).send('Por favor, informe a cidade.');
  }

  try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`);
      const data = response.data;
      const temperatura = data.main.temp;

      res.json({
          cidade: data.name,
          temperatura: temperatura
      });
  } catch (error) {
      res.status(500).send('Erro ao obter dados. Verifique se o nome da cidade esta correto.');
  }
});

app.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

app.get("/liveness", (req, res) => {
  res.status(200).send("OK! Tudo funcionando normalmente.");
});

app.get("/readiness", (req, res) => {
  res.status(200).send("Pronto para receber solicitações.");
});

app.get("/consulta-dados", (req, res) => {
  const query = "SELECT * FROM carros";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send("Erro na consulta ao banco de dados.");
      return;
    }
    res.status(200).json({ message: "Dados encontrados!", data: results });
  });
});

app.listen(port, () => {
  console.log(`Servidor ouvindo em http://localhost:${port}`);
});
