import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Consulta } from '../../models/consulta.model';
import { ConsultaService } from '../../services/consulta.service';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button type="button" class="btn btn-dark" (click)="abrirModal()">
        <i class="fas fa-calendar-plus"></i> Abrir Cadastro de Consulta
      </button>

      <!-- Modal da Consulta -->
      <div class="modal fade" [class.show]="modalAberto" [style.display]="modalAberto ? 'block' : 'none'" 
           tabindex="-1" role="dialog" aria-labelledby="consultaModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="consultaModalLabel">CADASTRO DE CONSULTA</h5>
              <button type="button" class="close" (click)="fecharModal()" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form #consultaForm="ngForm" (ngSubmit)="salvarConsulta()">
                <div class="form-group">
                  <label for="dataHorario">Data e Horário</label>
                  <input type="datetime-local" class="form-control" id="dataHorario" 
                         [(ngModel)]="consulta.dataHorario" name="dataHorario" required>
                </div>

                <div class="form-group">
                  <label for="sintomas">Sintomas</label>
                  <input type="text" class="form-control" id="sintomas" 
                         [(ngModel)]="consulta.sintomas" name="sintomas" placeholder="Descreva os sintomas" required>
                </div>

                <div class="form-group">
                  <label for="eRetorno">É Retorno?</label>
                  <select class="form-control" id="eRetorno" 
                          [(ngModel)]="consulta.eRetorno" name="eRetorno" required>
                    <option [ngValue]="true">Sim</option>
                    <option [ngValue]="false">Não</option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="estaAtiva">Está Ativa?</label>
                  <select class="form-control" id="estaAtiva" 
                          [(ngModel)]="consulta.estaAtiva" name="estaAtiva" required>
                    <option [ngValue]="true">Sim</option>
                    <option [ngValue]="false">Não</option>
                  </select>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="!consultaForm.valid">Salvar</button>
                  <button type="button" class="btn btn-secondary" (click)="fecharModal()">Fechar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay do modal -->
      <div class="modal-backdrop fade show" *ngIf="modalAberto"></div>

      <!-- Tabela de Consultas -->
      <h3 class="mt-4">
        <i class="fas fa-calendar-check"></i> Consultas Cadastradas
      </h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Data e Horário</th>
            <th>Sintomas</th>
            <th>É Retorno?</th>
            <th>Está Ativa?</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let c of consultas">
            <td>{{ formatarData(c.dataHorario) }}</td>
            <td>{{ c.sintomas }}</td>
            <td>
              <span class="badge" [class.badge-success]="c.eRetorno" [class.badge-secondary]="!c.eRetorno">
                {{ c.eRetorno ? 'Sim' : 'Não' }}
              </span>
            </td>
            <td>
              <span class="badge" [class.badge-success]="c.estaAtiva" [class.badge-danger]="!c.estaAtiva">
                {{ c.estaAtiva ? 'Sim' : 'Não' }}
              </span>
            </td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarConsulta(c)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-sm btn-danger" (click)="excluirConsulta(c.id!)">
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
    .badge {
      font-size: 0.8rem;
      padding: 0.5rem 0.75rem;
    }
    .badge-success {
      background-color: #28a745;
    }
    .badge-secondary {
      background-color: #6c757d;
    }
    .badge-danger {
      background-color: #dc3545;
    }
  `]
})
export class ConsultaComponent implements OnInit {
  consultas: Consulta[] = [];
  consulta: Consulta = this.criarConsultaVazia();
  modalAberto = false;
  editando = false;

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas(): void {
    this.consultaService.getConsultas().subscribe(consultas => {
      this.consultas = consultas;
    });
  }

  abrirModal(): void {
    this.consulta = this.criarConsultaVazia();
    this.editando = false;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarConsulta(): void {
    if (this.editando) {
      this.consultaService.updateConsulta(this.consulta);
    } else {
      this.consultaService.addConsulta(this.consulta);
    }
    this.fecharModal();
  }

  editarConsulta(consulta: Consulta): void {
    this.consulta = { ...consulta };
    this.editando = true;
    this.modalAberto = true;
  }

  excluirConsulta(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta consulta?')) {
      this.consultaService.deleteConsulta(id);
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleString('pt-BR');
  }

  private criarConsultaVazia(): Consulta {
    return {
      dataHorario: '',
      sintomas: '',
      eRetorno: false,
      estaAtiva: true
    };
  }
} 