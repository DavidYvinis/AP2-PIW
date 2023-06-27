import { Typography, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon  from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Listar = () => {
  // Estado para armazenar a lista de alunos
  const [alunos, setAlunos] = useState([]);
  const [mudanca, setMudanca] = useState(false);

  // Efeito colateral para carregar a lista de alunos ao montar o componente
  useEffect(() => {
    axios
      .get("http://localhost:3001/aluno/listar")
      .then((response) => {
        setAlunos(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  // Função para excluir um aluno por ID
  function deleteAlunoById(id) {
    if(window.confirm("Deseja Excluir?")){
      // Confirmação do usuário antes de excluir o aluno
      alert("Aluno " + id + " excluído com sucesso!");
      axios
        .delete(`http://localhost:3001/aluno/delete/${id}`)
        .then((response) => {
          // Remover o aluno da lista atualizada de alunos
          setAlunos(prevAlunos => prevAlunos.filter(aluno => aluno._id !== id));
          setMudanca(!mudanca); 
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Listar Alunos
      </Typography>
      <TableContainer component={Paper} sx={{my: 4}}>
        <Table sx={{minWidth: 650}} arial-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>NOME</StyledTableCell>
              <StyledTableCell>CURSO</StyledTableCell>
              <StyledTableCell>IRA</StyledTableCell>
              <StyledTableCell>AÇÕES</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos.map((aluno) => (
              <StyledTableRow key={aluno._id}>
                <StyledTableCell>{aluno._id}</StyledTableCell>
                <StyledTableCell>{aluno.nome}</StyledTableCell>
                <StyledTableCell>{aluno.curso}</StyledTableCell>
                <StyledTableCell>{aluno.ira}</StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      component={Link}
                      to={`/editarAluno/${aluno._id}`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => deleteAlunoById(aluno._id)}
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

// Estilização personalizada para as células da tabela
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));


export default Listar;