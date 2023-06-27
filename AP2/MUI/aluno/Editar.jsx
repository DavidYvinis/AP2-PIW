import { Typography, TextField, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Editar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aluno, setAluno] = useState({
    nome: "",
    curso: "",
    ira: "",
  });

  // Hook useEffect para carregar os dados do aluno quando o componente é montado
  useEffect(() => {
    axios
      .get(`http://localhost:3001/aluno/retrieve/${id}`)
      .then((response) => {
        setAluno(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAluno((prevAluno) => ({
      ...prevAluno,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário de edição
  const handleSubmit = (event) => {
    event.preventDefault();

    // Objeto com os dados atualizados do aluno
    const alunoAtualizado = { ...aluno };

    axios
      .put(`http://localhost:3001/aluno/update/${id}`, alunoAtualizado)
      .then((response) => {
        // Exibe um alerta com a mensagem de sucesso
        alert(`Aluno ID ${response.data._id} atualizado`);
        // Navega para a página de listar alunos
        navigate("/listarAluno");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Typography variant="h4" fontWeight="bold">
        Editar Aluno
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
          value={aluno.nome}
          onChange={handleChange}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="curso"
          name="curso"
          label="Curso"
          value={aluno.curso}
          onChange={handleChange}
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
            step: "0.1",
          }}
          value={aluno.ira}
          onChange={handleChange}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="select-tit-label">Titulação</InputLabel>
          <Select
            labelId="select-tit-label"
            label="Titulação"
            value={aluno.titulacao}
            onChange={handleChange}
          >
            <MenuItem value="GRAD">Graduação</MenuItem>
            <MenuItem value="MEST">Mestrado</MenuItem>
            <MenuItem value="DOUT">Doutorado</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Button type="submit" variant="contained" sx={{ my: 3 }}>
            Editar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Editar;