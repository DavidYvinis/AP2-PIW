const AlunoModel = require("../models/aluno.models.mongo");

class AlunoService {
    //lista os alunos
  static async list(request, response) {
    try {
      const alunos = await AlunoModel.find();
      response.status(201).json(alunos);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  // Registra um novo aluno
  static async register(request, response) {
    try {
      const aluno = await AlunoModel.create(request.body);
      response.status(201).json(aluno);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  // Recuperar os dados de um aluno específico
  static async retrieve(request, response) {
    try {
      const aluno = await AlunoModel.findById(request.params.id);
      response.status(201).json(aluno);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  //Atualizar dados do aluno
  static async update(request, response) {
    try {
      const aluno = await AlunoModel.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      response.status(201).json(aluno);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  //Deletar aluno
  static async delete(request, response) {
    try {
      const aluno = await AlunoModel.findByIdAndRemove(request.params.id);
      response.status(201).json(aluno);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}

module.exports = AlunoService;







