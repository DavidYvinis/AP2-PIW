export default Cadastrar;

import React, { useState } from "react";
import { Typography, TextField, Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastrar = () => {
  const [nome, setNome] = useState(""); // Estado para armazenar o nome do aluno
  const [curso, setCurso] = useState(""); // Estado para armazenar o curso do aluno
  const [c, setC] = useState(""); // Estado para armazenar o valor selecionado no menu de Curso Designado
  const [ira, setIra] = useState(); // Estado para armazenar o IRA do aluno

  const navigate = useNavigate(); 

  function handleSubmit(event) {
    event.preventDefault();
    alert("Cadastrado");

    const novoAluno = { nome, curso, ira, c }; // Cria um objeto com os dados do aluno a serem enviados

    axios
      .post("http://localhost:3001/aluno/inserir", novoAluno) // Envia uma requisição POST para cadastrar o aluno
      .then((response) => {
        alert(`Aluno ID ${response.data._id} adicionado!`);
        navigate("/listarAluno"); // Redireciona para a página de listagem de alunos após o cadastro
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Cadastrar Aluno
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          autoFocus
          fullWidth
          id="nome"
          name="nome"
          label="Nome Completo"
          onChange={(event) => setNome(event.target.value)} // Atualiza o estado com o valor digitado no campo de nome
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="curso"
          name="curso"
          label="Curso"
          onChange={(event) => setCurso(event.target.value)} // Atualiza o estado com o valor digitado no campo de curso
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="ira"
          name="ira"
          label="IRA"
          type="number"
          inputProps={{
            maxLength: 10,
            step: "0.1"
          }}
          onChange={(event) => setIra(event.target.value)} // Atualiza o estado com o valor digitado no campo de IRA
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="select-tit-label">Curso Designado</InputLabel>
          <Select
            labelId="select-tit-label"
            label="Curso Designado"
            value={c}
            onChange={(event) => setC(event.target.value)} // Atualiza o estado com o valor selecionado no menu de Curso Designado
          >
            <MenuItem value="DD">Design Digital</MenuItem>
            <MenuItem value="SI">Sistemas de Informação</MenuItem>
            <MenuItem value="CC">Ciencia da Computação</MenuItem>
            <MenuItem value="ES">Engenharia de Software</MenuItem>
            <MenuItem value="EC">Engenharia da Computação</MenuItem>
            <MenuItem value="RC">Redes de Computadores</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Button type="submit" variant="contained" sx={{ my: 3 }}>
            Cadastrar
          </Button>
        </Box>
      </Box>
    </>
  );
};

