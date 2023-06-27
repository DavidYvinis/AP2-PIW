import { Typography, TextField, Box, FormControl, FormLabel, FormGroup, FormControlLabel, InputLabel, Select, MenuItem, Button, Checkbox } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cadastrar = () => {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [titulacao, setTitulacao] = useState("GRAD");
  const [c, setC] = useState({es: false, si: false, dd: false, rc: false});

  const { es, si, dd, rc } = c;
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário
  function handleSubmit(event) {
    event.preventDefault();
    alert("Cadastrado!");

    const novoProfessor = { nome, curso, titulacao, c };
    axios
      .post("http://localhost:3001/professor/inserir", novoProfessor)
      .then((response) => {
        alert(`Professor ID ${response.data._id} adicionado!`);
        navigate("/listarProfessor"); // Navegar para a página de listagem de professores
      })
      .catch(error => console.log(error));
  }

  // Função para lidar com a alteração dos checkboxes
  function handleCheckbox(event) {
    setC({
      ...c,
      [event.target.name]: event.target.checked
    });
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Cadastrar Professor
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
          onChange={(event) => setNome(event.target.value)}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="curso"
          name="curso"
          label="Curso"
          onChange={(event) => setCurso(event.target.value)}
        />

        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="select-tit-label">Titulação</InputLabel>
          <Select
            labelId="select-tit-label"
            label="Titulação"
            value={titulacao}
            onChange={(event) => setTitulacao(event.target.value)}
          >
            <MenuItem value="GRAD">Graduação</MenuItem>
            <MenuItem value="MEST">Mestrado</MenuItem>
            <MenuItem value="DOUT">Doutorado</MenuItem>
          </Select>
        </FormControl>

        <FormControl component="fieldset" variant="standard" sx={{ my: 2 }}>
          <FormLabel component="legend" sx={{ fontSize: 12, mb: 2 }}>
            Cursos
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={es} name="es" onChange={handleCheckbox} />}
              label="ES"
            />
            <FormControlLabel
              control={<Checkbox checked={si} name="si" onChange={handleCheckbox} />}
              label="SI"
            />
            <FormControlLabel
              control={<Checkbox checked={dd} name="dd" onChange={handleCheckbox} />}
              label="DD"
            />
            <FormControlLabel
              control={<Checkbox checked={rc} name="rc" onChange={handleCheckbox} />}
              label="RC"
            />
          </FormGroup>
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

export default Cadastrar;