import { AppBar, Box, Button, Container, Toolbar, Typography, Menu, MenuItem } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import { useState } from "react";
import { Link } from "react-router-dom";

const Mymenu = () => {
  // State para controlar o menu suspenso do item rofessores
  const [anchorElProfessor, setAnchorElProfessor] = useState(null);
  // State para controlar o menu suspenso do item Alunos
  const [anchorElAluno, setAnchorElAluno] = useState(null);

  // Função para abrir o menu suspenso dos Professores
  const handleOpenAnchorElProfessor = (event) => {
    setAnchorElProfessor(event.currentTarget);
  };

  // Função para fechar o menu suspenso dos Professores
  const handleCloseAnchorElProfessor = () => {
    setAnchorElProfessor(null);
  };

  // Função para abrir o menu suspenso dos Alunos
  const handleOpenAnchorElAluno = (event) => {
    setAnchorElAluno(event.currentTarget);
  };

  // Função para fechar o menu suspenso dos Alunos
  const handleCloseAnchorElAluno = () => {
    setAnchorElAluno(null);
  };

  // Função que retorna o menu suspenso do item Professores
  const dropProfMenu = () => {
    return (
      <Box>
        <Button
          sx={{
            color: "white",
            my: 2
          }}
          onClick={handleOpenAnchorElProfessor}
        >
          Professores
        </Button>
        <Menu
          anchorEl={anchorElProfessor}
          open={Boolean(anchorElProfessor)}
          onClose={handleCloseAnchorElProfessor}
        >
          <MenuItem
            onClick={handleCloseAnchorElProfessor}
            component={Link}
            to={"cadastrarProfessor"}
          >
            <Typography>Cadastrar</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleCloseAnchorElProfessor}
            component={Link}
            to={"listarProfessor"}
          >
            <Typography>Listar</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  // Função que retorna o menu suspenso do item "Alunos"
  const dropAlunoMenu = () => {
    return (
      <Box>
        <Button
          sx={{
            color: "white",
            my: 2
          }}
          onClick={handleOpenAnchorElAluno}
        >
          Alunos
        </Button>
        <Menu
          anchorEl={anchorElAluno}
          open={Boolean(anchorElAluno)}
          onClose={handleCloseAnchorElAluno}
        >
          <MenuItem
            onClick={handleCloseAnchorElAluno}
            component={Link}
            to={"cadastrarAluno"}
          >
            <Typography>Cadastrar</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleCloseAnchorElAluno}
            component={Link}
            to={"listarAluno"}
          >
            <Typography>Listar</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleCloseAnchorElAluno}
            component={Link}
            to={"listarAlunoApv"}
          >
            <Typography>Listar Aprovados</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1
            }}
          />
          <Typography
            variant="h5"
            component="a"
            href="/home"
            sx={{
              textDecoration: "none",
              color: "white",
              fontFamily: "monospace",
              letterSpacing: ".3rem",
              fontWeight: 800
            }}
          >
            CRUD_V1
          </Typography>

          <Box
            sx={{
              ml: 3,
              display: "flex",
              width: "100%",
              justifyContent: "flex-end"
            }}
          >
            {dropProfMenu()} {/* Renderiza o menu suspenso dos "Professores" */}
            {dropAlunoMenu()} {/* Renderiza o menu suspenso dos "Alunos" */}

            <Button
              sx={{
                color: "white",
                my: 2
              }}
            >
              Sobre
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Mymenu;