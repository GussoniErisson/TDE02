import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Convenio } from '../../models/convenio.model';
import { ConvenioService } from '../../services/convenio.service';

@Component({
  selector: 'app-convenio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button type="button" class="btn btn-dark" (click)="abrirModal()">
        <i class="fas fa-handshake"></i> Abrir Cadastro de Convênio
      </button>

      <!-- Modal do Convênio -->
      <div class="modal fade" [class.show]="modalAberto" [style.display]="modalAberto ? 'block' : 'none'" 
           tabindex="-1" role="dialog" aria-labelledby="convenioModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="convenioModalLabel">CADASTRO DE CONVÊNIO</h5>
              <button type="button" class="close" (click)="fecharModal()" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form #convenioForm="ngForm" (ngSubmit)="salvarConvenio()">
                <div class="form-group">
                  <label for="convenioNome">Nome</label>
                  <input type="text" class="form-control" id="convenioNome" 
                         [(ngModel)]="convenio.nome" name="nome" placeholder="Digite o nome do convênio" required>
                </div>

                <div class="form-group">
                  <label for="convenioDescricao">Descrição</label>
                  <textarea class="form-control" id="convenioDescricao" rows="3" 
                            [(ngModel)]="convenio.descricao" name="descricao" 
                            placeholder="Digite a descrição" required></textarea>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="!convenioForm.valid">Salvar</button>
                  <button type="button" class="btn btn-secondary" (click)="fecharModal()">Fechar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay do modal -->
      <div class="modal-backdrop fade show" *ngIf="modalAberto"></div>

      <!-- Tabela de Convênios -->
      <h3 class="mt-4">
        <i class="fas fa-handshake"></i> Convênios Cadastrados
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
          <tr *ngFor="let c of convenios">
            <td><strong>{{ c.nome }}</strong></td>
            <td>{{ c.descricao }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarConvenio(c)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-sm btn-danger" (click)="excluirConvenio(c.id!)">
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
export class ConvenioComponent implements OnInit {
  convenios: Convenio[] = [];
  convenio: Convenio = this.criarConvenioVazio();
  modalAberto = false;
  editando = false;

  constructor(private convenioService: ConvenioService) {}

  ngOnInit(): void {
    this.carregarConvenios();
  }

  carregarConvenios(): void {
    this.convenioService.getConvenios().subscribe(convenios => {
      this.convenios = convenios;
    });
  }

  abrirModal(): void {
    this.convenio = this.criarConvenioVazio();
    this.editando = false;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarConvenio(): void {
    if (this.editando) {
      this.convenioService.updateConvenio(this.convenio);
    } else {
      this.convenioService.addConvenio(this.convenio);
    }
    this.fecharModal();
  }

  editarConvenio(convenio: Convenio): void {
    this.convenio = { ...convenio };
    this.editando = true;
    this.modalAberto = true;
  }

  excluirConvenio(id: number): void {
    if (confirm('Tem certeza que deseja excluir este convênio?')) {
      this.convenioService.deleteConvenio(id);
    }
  }

  private criarConvenioVazio(): Convenio {
    return {
      nome: '',
      descricao: ''
    };
  }
} 