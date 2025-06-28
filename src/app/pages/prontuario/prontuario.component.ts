import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Prontuario } from '../../models/prontuario.model';
import { ProntuarioService } from '../../services/prontuario.service';

@Component({
  selector: 'app-prontuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button type="button" class="btn btn-warning" (click)="abrirModal()">
        <i class="fas fa-file-medical"></i> Abrir Cadastro de Exame
      </button>

      <!-- Modal do Prontuário -->
      <div class="modal fade" [class.show]="modalAberto" [style.display]="modalAberto ? 'block' : 'none'" 
           tabindex="-1" role="dialog" aria-labelledby="exameModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exameModalLabel">CADASTRO DE EXAME</h5>
              <button type="button" class="close" (click)="fecharModal()" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form #prontuarioForm="ngForm" (ngSubmit)="salvarProntuario()">
                <div class="form-group">
                  <label for="nomeExame">Nome do Exame</label>
                  <input type="text" class="form-control" id="nomeExame" 
                         [(ngModel)]="prontuario.nomeExame" name="nomeExame" placeholder="Nome do Exame" required>
                </div>

                <div class="form-group">
                  <label for="tipoExame">Tipo</label>
                  <input type="text" class="form-control" id="tipoExame" 
                         [(ngModel)]="prontuario.tipoExame" name="tipoExame" placeholder="Tipo do Exame" required>
                </div>

                <div class="form-group">
                  <label for="dataExame">Data</label>
                  <input type="date" class="form-control" id="dataExame" 
                         [(ngModel)]="prontuario.dataExame" name="dataExame" required>
                </div>

                <div class="form-group">
                  <label for="observacoesExame">Observações</label>
                  <textarea class="form-control" id="observacoesExame" rows="3" 
                            [(ngModel)]="prontuario.observacoes" name="observacoes" 
                            placeholder="Observações adicionais"></textarea>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="!prontuarioForm.valid">Salvar</button>
                  <button type="button" class="btn btn-secondary" (click)="fecharModal()">Fechar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay do modal -->
      <div class="modal-backdrop fade show" *ngIf="modalAberto"></div>

      <!-- Tabela de Prontuários -->
      <h3 class="mt-4">
        <i class="fas fa-file-medical"></i> Lista de Exames
      </h3>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Data</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of prontuarios">
            <td><strong>{{ p.nomeExame }}</strong></td>
            <td>{{ p.tipoExame }}</td>
            <td>{{ formatarData(p.dataExame) }}</td>
            <td>{{ p.observacoes }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarProntuario(p)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-sm btn-danger" (click)="excluirProntuario(p.id!)">
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
    .table-hover tbody tr:hover {
      background-color: rgba(0,0,0,.075);
    }
  `]
})
export class ProntuarioComponent implements OnInit {
  prontuarios: Prontuario[] = [];
  prontuario: Prontuario = this.criarProntuarioVazio();
  modalAberto = false;
  editando = false;

  constructor(private prontuarioService: ProntuarioService) {}

  ngOnInit(): void {
    this.carregarProntuarios();
  }

  carregarProntuarios(): void {
    this.prontuarioService.getProntuarios().subscribe(prontuarios => {
      this.prontuarios = prontuarios;
    });
  }

  abrirModal(): void {
    this.prontuario = this.criarProntuarioVazio();
    this.editando = false;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarProntuario(): void {
    if (this.editando) {
      this.prontuarioService.updateProntuario(this.prontuario);
    } else {
      this.prontuarioService.addProntuario(this.prontuario);
    }
    this.fecharModal();
  }

  editarProntuario(prontuario: Prontuario): void {
    this.prontuario = { ...prontuario };
    this.editando = true;
    this.modalAberto = true;
  }

  excluirProntuario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este exame?')) {
      this.prontuarioService.deleteProntuario(id);
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  private criarProntuarioVazio(): Prontuario {
    return {
      nomeExame: '',
      tipoExame: '',
      dataExame: '',
      observacoes: ''
    };
  }
} 