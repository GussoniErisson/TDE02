import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Especialidade } from '../../models/especialidade.model';
import { EspecialidadeService } from '../../services/especialidade.service';

@Component({
  selector: 'app-especialidade',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button type="button" class="btn btn-secondary" (click)="abrirModal()">
        <i class="fas fa-stethoscope"></i> Abrir Cadastro de Especialidade
      </button>

      <!-- Modal da Especialidade -->
      <div class="modal fade" [class.show]="modalAberto" [style.display]="modalAberto ? 'block' : 'none'" 
           tabindex="-1" role="dialog" aria-labelledby="especialidadeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="especialidadeModalLabel">CADASTRO DE ESPECIALIDADE</h5>
              <button type="button" class="close" (click)="fecharModal()" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form #especialidadeForm="ngForm" (ngSubmit)="salvarEspecialidade()">
                <div class="form-group">
                  <label for="especialidadeNome">Nome</label>
                  <input type="text" class="form-control" id="especialidadeNome" 
                         [(ngModel)]="especialidade.nome" name="nome" 
                         placeholder="Digite o nome da especialidade" required>
                </div>

                <div class="form-group">
                  <label for="especialidadeDescricao">Descrição</label>
                  <textarea class="form-control" id="especialidadeDescricao" rows="3" 
                            [(ngModel)]="especialidade.descricao" name="descricao" 
                            placeholder="Digite a descrição" required></textarea>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="!especialidadeForm.valid">Salvar</button>
                  <button type="button" class="btn btn-secondary" (click)="fecharModal()">Fechar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay do modal -->
      <div class="modal-backdrop fade show" *ngIf="modalAberto"></div>

      <!-- Tabela de Especialidades -->
      <h3 class="mt-4">
        <i class="fas fa-stethoscope"></i> Especialidades Cadastradas
      </h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let e of especialidades">
            <td><strong>{{ e.nome }}</strong></td>
            <td>{{ e.descricao }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarEspecialidade(e)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-sm btn-danger" (click)="excluirEspecialidade(e.id!)">
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
    .table td {
      vertical-align: middle;
    }
  `]
})
export class EspecialidadeComponent implements OnInit {
  especialidades: Especialidade[] = [];
  especialidade: Especialidade = this.criarEspecialidadeVazia();
  modalAberto = false;
  editando = false;

  constructor(private especialidadeService: EspecialidadeService) {}

  ngOnInit(): void {
    this.carregarEspecialidades();
  }

  carregarEspecialidades(): void {
    this.especialidadeService.getEspecialidades().subscribe(especialidades => {
      this.especialidades = especialidades;
    });
  }

  abrirModal(): void {
    this.especialidade = this.criarEspecialidadeVazia();
    this.editando = false;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarEspecialidade(): void {
    if (this.editando) {
      this.especialidadeService.updateEspecialidade(this.especialidade);
    } else {
      this.especialidadeService.addEspecialidade(this.especialidade);
    }
    this.fecharModal();
  }

  editarEspecialidade(especialidade: Especialidade): void {
    this.especialidade = { ...especialidade };
    this.editando = true;
    this.modalAberto = true;
  }

  excluirEspecialidade(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta especialidade?')) {
      this.especialidadeService.deleteEspecialidade(id);
    }
  }

  private criarEspecialidadeVazia(): Especialidade {
    return {
      nome: '',
      descricao: ''
    };
  }
} 