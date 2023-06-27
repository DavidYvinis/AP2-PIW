import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Listar = () => {
  const [professores, setProfessores] = useState([]);
  const [mudanca, setMudanca] = useState(false);

  useEffect(() => {
    // Buscar professores ao carregar o componente
    axios
      .get("http://localhost:3001/professor/listar")
      .then((response) => {
        setProfessores(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Função para remover um professor localmente na array de professores
  function deleteTeste(id) {
    for (let i = 0; i < professores.length; i++) {
      if (professores[i]._id == id) {
        professores.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  // Função para remover um professor pelo ID
  function deleteProfessorById(id) {
    if (window.confirm("Deseja Excluir?")) {
      alert("Professor " + id + " excluido com sucesso!");
      axios
        .delete(`http://localhost:3001/professor/delete/${id}`)
        .then((response) => {
          // Remover professor localmente e atualizar o estado para refletir a mudança
          deleteTeste(id);
          setMudanca(!mudanca);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Listar Professor
      </Typography>
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table sx={{ minWidth: 650 }} arial-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>NOME</StyledTableCell>
              <StyledTableCell>CURSO</StyledTableCell>
              <StyledTableCell>TITULAÇÃO</StyledTableCell>
              <StyledTableCell>AÇÕES</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professores.map((professor) => (
              <StyledTableRow key={professor._id}>
                <StyledTableCell>{professor._id}</StyledTableCell>
                <StyledTableCell>{professor.nome}</StyledTableCell>
                <StyledTableCell>{professor.curso}</StyledTableCell>
                <StyledTableCell>{professor.titulacao}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      component={Link}
                      to={`/editarProfessor/${professor._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => deleteProfessorById(professor._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

export default Listar;