export interface Perfil {
  id?: number;
  nome: string;
  permissoes: Permissoes;
}

export interface Permissoes {
  funcionario: PermissoesFuncionario;
  paciente: PermissoesPaciente;
  consulta: PermissoesConsulta;
  especialidade: PermissoesEspecialidade;
  convenio: PermissoesConvenio;
  prontuario: PermissoesProntuario;
}

export interface PermissoesFuncionario {
  cadastrar: boolean;
  ler: boolean;
  atualizar: boolean;
  deletar: boolean;
  listar: boolean;
}

export interface PermissoesPaciente {
  cadastrar: boolean;
  ler: boolean;
  atualizar: boolean;
  deletar: boolean;
  listar: boolean;
}

export interface PermissoesConsulta {
  cadastrar: boolean;
  ler: boolean;
  atualizar: boolean;
  deletar: boolean;
  listar: boolean;
}

export interface PermissoesEspecialidade {
  cadastrar: boolean;
  ler: boolean;
  atualizar: boolean;
  deletar: boolean;
  listar: boolean;
}

export interface PermissoesConvenio {
  cadastrar: boolean;
  ler: boolean;
  atualizar: boolean;
  deletar: boolean;
  listar: boolean;
}

export interface PermissoesProntuario {
  cadastrar: boolean;
  ler: boolean;
  atualizar: boolean;
  deletar: boolean;
  listar: boolean;
} 