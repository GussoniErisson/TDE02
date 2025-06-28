import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Perfil, Permissoes } from '../../models/perfil.model';
import { PerfilService } from '../../services/perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button type="button" class="btn btn-info" (click)="abrirModal()">
        <i class="fas fa-user-circle"></i> Abrir Perfil de Permissões
      </button>

      <!-- Modal do Perfil -->
      <div class="modal fade" [class.show]="modalAberto" [style.display]="modalAberto ? 'block' : 'none'" 
           tabindex="-1" role="dialog" aria-labelledby="perfilModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="perfilModalLabel">PERFIL DE PERMISSÕES</h5>
              <button type="button" class="close" (click)="fecharModal()" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form #perfilForm="ngForm" (ngSubmit)="salvarPerfil()">
                <div class="form-group">
                  <label for="nomePerfil">Nome</label>
                  <input type="text" class="form-control" id="nomePerfil" 
                         [(ngModel)]="perfil.nome" name="nome" placeholder="Nome do Perfil" required>
                </div>

                <!-- Permissões por seção -->
                <div class="row mt-4">
                  <div class="col-md-6">
                    <h5><i class="fas fa-user-md"></i> Permissões Funcionário</h5>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="cadastrarFuncionario" 
                             [(ngModel)]="perfil.permissoes.funcionario.cadastrar" name="cadastrarFuncionario">
                      <label class="form-check-label" for="cadastrarFuncionario">Cadastrar Funcionário</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="lerFuncionario" 
                             [(ngModel)]="perfil.permissoes.funcionario.ler" name="lerFuncionario">
                      <label class="form-check-label" for="lerFuncionario">Ler Funcionário</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="atualizarFuncionario" 
                             [(ngModel)]="perfil.permissoes.funcionario.atualizar" name="atualizarFuncionario">
                      <label class="form-check-label" for="atualizarFuncionario">Atualizar Funcionário</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="deletarFuncionario" 
                             [(ngModel)]="perfil.permissoes.funcionario.deletar" name="deletarFuncionario">
                      <label class="form-check-label" for="deletarFuncionario">Deletar Funcionário</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="listarFuncionario" 
                             [(ngModel)]="perfil.permissoes.funcionario.listar" name="listarFuncionario">
                      <label class="form-check-label" for="listarFuncionario">Listar Funcionário</label>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h5><i class="fas fa-user-injured"></i> Permissões Paciente</h5>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="cadastrarPaciente" 
                             [(ngModel)]="perfil.permissoes.paciente.cadastrar" name="cadastrarPaciente">
                      <label class="form-check-label" for="cadastrarPaciente">Cadastrar Paciente</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="lerPaciente" 
                             [(ngModel)]="perfil.permissoes.paciente.ler" name="lerPaciente">
                      <label class="form-check-label" for="lerPaciente">Ler Paciente</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="atualizarPaciente" 
                             [(ngModel)]="perfil.permissoes.paciente.atualizar" name="atualizarPaciente">
                      <label class="form-check-label" for="atualizarPaciente">Atualizar Paciente</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="deletarPaciente" 
                             [(ngModel)]="perfil.permissoes.paciente.deletar" name="deletarPaciente">
                      <label class="form-check-label" for="deletarPaciente">Deletar Paciente</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="listarPaciente" 
                             [(ngModel)]="perfil.permissoes.paciente.listar" name="listarPaciente">
                      <label class="form-check-label" for="listarPaciente">Listar Paciente</label>
                    </div>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-6">
                    <h5><i class="fas fa-calendar-check"></i> Permissões Consulta</h5>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="cadastrarConsulta" 
                             [(ngModel)]="perfil.permissoes.consulta.cadastrar" name="cadastrarConsulta">
                      <label class="form-check-label" for="cadastrarConsulta">Cadastrar Consulta</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="lerConsulta" 
                             [(ngModel)]="perfil.permissoes.consulta.ler" name="lerConsulta">
                      <label class="form-check-label" for="lerConsulta">Ler Consulta</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="atualizarConsulta" 
                             [(ngModel)]="perfil.permissoes.consulta.atualizar" name="atualizarConsulta">
                      <label class="form-check-label" for="atualizarConsulta">Atualizar Consulta</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="deletarConsulta" 
                             [(ngModel)]="perfil.permissoes.consulta.deletar" name="deletarConsulta">
                      <label class="form-check-label" for="deletarConsulta">Deletar Consulta</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="listarConsulta" 
                             [(ngModel)]="perfil.permissoes.consulta.listar" name="listarConsulta">
                      <label class="form-check-label" for="listarConsulta">Listar Consulta</label>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h5><i class="fas fa-stethoscope"></i> Permissões Especialidade</h5>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="cadastrarEspecialidade" 
                             [(ngModel)]="perfil.permissoes.especialidade.cadastrar" name="cadastrarEspecialidade">
                      <label class="form-check-label" for="cadastrarEspecialidade">Cadastrar Especialidade</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="lerEspecialidade" 
                             [(ngModel)]="perfil.permissoes.especialidade.ler" name="lerEspecialidade">
                      <label class="form-check-label" for="lerEspecialidade">Ler Especialidade</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="atualizarEspecialidade" 
                             [(ngModel)]="perfil.permissoes.especialidade.atualizar" name="atualizarEspecialidade">
                      <label class="form-check-label" for="atualizarEspecialidade">Atualizar Especialidade</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="deletarEspecialidade" 
                             [(ngModel)]="perfil.permissoes.especialidade.deletar" name="deletarEspecialidade">
                      <label class="form-check-label" for="deletarEspecialidade">Deletar Especialidade</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="listarEspecialidade" 
                             [(ngModel)]="perfil.permissoes.especialidade.listar" name="listarEspecialidade">
                      <label class="form-check-label" for="listarEspecialidade">Listar Especialidade</label>
                    </div>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col-md-6">
                    <h5><i class="fas fa-handshake"></i> Permissões Convênio</h5>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="cadastrarConvenio" 
                             [(ngModel)]="perfil.permissoes.convenio.cadastrar" name="cadastrarConvenio">
                      <label class="form-check-label" for="cadastrarConvenio">Cadastrar Convênio</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="lerConvenio" 
                             [(ngModel)]="perfil.permissoes.convenio.ler" name="lerConvenio">
                      <label class="form-check-label" for="lerConvenio">Ler Convênio</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="atualizarConvenio" 
                             [(ngModel)]="perfil.permissoes.convenio.atualizar" name="atualizarConvenio">
                      <label class="form-check-label" for="atualizarConvenio">Atualizar Convênio</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="deletarConvenio" 
                             [(ngModel)]="perfil.permissoes.convenio.deletar" name="deletarConvenio">
                      <label class="form-check-label" for="deletarConvenio">Deletar Convênio</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="listarConvenio" 
                             [(ngModel)]="perfil.permissoes.convenio.listar" name="listarConvenio">
                      <label class="form-check-label" for="listarConvenio">Listar Convênio</label>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <h5><i class="fas fa-file-medical"></i> Permissões Prontuário</h5>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="cadastrarProntuario" 
                             [(ngModel)]="perfil.permissoes.prontuario.cadastrar" name="cadastrarProntuario">
                      <label class="form-check-label" for="cadastrarProntuario">Cadastrar Prontuário</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="lerProntuario" 
                             [(ngModel)]="perfil.permissoes.prontuario.ler" name="lerProntuario">
                      <label class="form-check-label" for="lerProntuario">Ler Prontuário</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="atualizarProntuario" 
                             [(ngModel)]="perfil.permissoes.prontuario.atualizar" name="atualizarProntuario">
                      <label class="form-check-label" for="atualizarProntuario">Atualizar Prontuário</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="deletarProntuario" 
                             [(ngModel)]="perfil.permissoes.prontuario.deletar" name="deletarProntuario">
                      <label class="form-check-label" for="deletarProntuario">Deletar Prontuário</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="listarProntuario" 
                             [(ngModel)]="perfil.permissoes.prontuario.listar" name="listarProntuario">
                      <label class="form-check-label" for="listarProntuario">Listar Prontuário</label>
                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="!perfilForm.valid">Salvar</button>
                  <button type="button" class="btn btn-secondary" (click)="fecharModal()">Fechar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay do modal -->
      <div class="modal-backdrop fade show" *ngIf="modalAberto"></div>

      <!-- Tabela de Perfis -->
      <h3 class="mt-4">
        <i class="fas fa-user-circle"></i> Lista de Perfis de Permissões
      </h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Nome do Perfil</th>
            <th>Permissões</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of perfis">
            <td><strong>{{ p.nome }}</strong></td>
            <td>
              <div class="row">
                <div class="col-md-2">
                  <small><strong>Funcionário:</strong></small><br>
                  <span class="badge badge-sm" *ngFor="let perm of getPermissoesArray(p.permissoes.funcionario)">
                    {{ perm }}
                  </span>
                </div>
                <div class="col-md-2">
                  <small><strong>Paciente:</strong></small><br>
                  <span class="badge badge-sm" *ngFor="let perm of getPermissoesArray(p.permissoes.paciente)">
                    {{ perm }}
                  </span>
                </div>
                <div class="col-md-2">
                  <small><strong>Consulta:</strong></small><br>
                  <span class="badge badge-sm" *ngFor="let perm of getPermissoesArray(p.permissoes.consulta)">
                    {{ perm }}
                  </span>
                </div>
                <div class="col-md-2">
                  <small><strong>Especialidade:</strong></small><br>
                  <span class="badge badge-sm" *ngFor="let perm of getPermissoesArray(p.permissoes.especialidade)">
                    {{ perm }}
                  </span>
                </div>
                <div class="col-md-2">
                  <small><strong>Convênio:</strong></small><br>
                  <span class="badge badge-sm" *ngFor="let perm of getPermissoesArray(p.permissoes.convenio)">
                    {{ perm }}
                  </span>
                </div>
                <div class="col-md-2">
                  <small><strong>Prontuário:</strong></small><br>
                  <span class="badge badge-sm" *ngFor="let perm of getPermissoesArray(p.permissoes.prontuario)">
                    {{ perm }}
                  </span>
                </div>
              </div>
            </td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarPerfil(p)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-sm btn-danger" (click)="excluirPerfil(p.id!)">
                <i class="fas fa-trash"></i> Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .modal.show {
      display: block;
    }
    .modal-backdrop.show {
      opacity: 0.5;
    }
    .form-check {
      margin-bottom: 0.5rem;
    }
    .badge-sm {
      font-size: 0.7rem;
      margin: 0.1rem;
    }
    .table td {
      vertical-align: middle;
    }
  `]
})
export class PerfilComponent implements OnInit {
  perfis: Perfil[] = [];
  perfil: Perfil = this.criarPerfilVazio();
  modalAberto = false;
  editando = false;

  constructor(private perfilService: PerfilService) {}

  ngOnInit(): void {
    this.carregarPerfis();
  }

  carregarPerfis(): void {
    this.perfilService.getPerfis().subscribe(perfis => {
      this.perfis = perfis;
    });
  }

  abrirModal(): void {
    this.perfil = this.criarPerfilVazio();
    this.editando = false;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarPerfil(): void {
    if (this.editando) {
      this.perfilService.updatePerfil(this.perfil);
    } else {
      this.perfilService.addPerfil(this.perfil);
    }
    this.fecharModal();
  }

  editarPerfil(perfil: Perfil): void {
    this.perfil = JSON.parse(JSON.stringify(perfil)); // Deep copy
    this.editando = true;
    this.modalAberto = true;
  }

  excluirPerfil(id: number): void {
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      this.perfilService.deletePerfil(id);
    }
  }

  getPermissoesArray(permissoes: any): string[] {
    const perms: string[] = [];
    Object.keys(permissoes).forEach(key => {
      if (permissoes[key]) {
        perms.push(key);
      }
    });
    return perms;
  }

  private criarPerfilVazio(): Perfil {
    return {
      nome: '',
      permissoes: {
        funcionario: { cadastrar: false, ler: false, atualizar: false, deletar: false, listar: false },
        paciente: { cadastrar: false, ler: false, atualizar: false, deletar: false, listar: false },
        consulta: { cadastrar: false, ler: false, atualizar: false, deletar: false, listar: false },
        especialidade: { cadastrar: false, ler: false, atualizar: false, deletar: false, listar: false },
        convenio: { cadastrar: false, ler: false, atualizar: false, deletar: false, listar: false },
        prontuario: { cadastrar: false, ler: false, atualizar: false, deletar: false, listar: false }
      }
    };
  }
} 