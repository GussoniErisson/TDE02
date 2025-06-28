import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Funcionario } from '../../models/funcionario.model';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button type="button" class="btn btn-success" (click)="abrirModal()">
        <i class="fas fa-user-md"></i> Abrir Cadastro de Funcionário
      </button>

      <!-- Modal do Funcionário -->
      <div class="modal fade" [class.show]="modalAberto" [style.display]="modalAberto ? 'block' : 'none'" 
           tabindex="-1" role="dialog" aria-labelledby="funcionarioModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="funcionarioModalLabel">CADASTRO DE FUNCIONÁRIO</h5>
              <button type="button" class="close" (click)="fecharModal()" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form #funcionarioForm="ngForm" (ngSubmit)="salvarFuncionario()">
                <div class="form-group">
                  <label for="nomeFuncionario">Nome</label>
                  <input type="text" class="form-control" id="nomeFuncionario" 
                         [(ngModel)]="funcionario.nome" name="nome" placeholder="Nome" required>
                </div>

                <div class="form-group">
                  <label for="emailFuncionario">E-mail</label>
                  <input type="email" class="form-control" id="emailFuncionario" 
                         [(ngModel)]="funcionario.email" name="email" placeholder="E-mail" required>
                </div>

                <div class="form-group">
                  <label for="cpfFuncionario">CPF</label>
                  <input type="text" class="form-control" id="cpfFuncionario" 
                         [(ngModel)]="funcionario.cpf" name="cpf" placeholder="CPF" required>
                </div>

                <div class="form-group">
                  <label for="telefoneFuncionario">Telefone</label>
                  <input type="text" class="form-control" id="telefoneFuncionario" 
                         [(ngModel)]="funcionario.telefone" name="telefone" placeholder="Telefone" required>
                </div>

                <div class="form-group">
                  <label for="cargoFuncionario">Cargo</label>
                  <input type="text" class="form-control" id="cargoFuncionario" 
                         [(ngModel)]="funcionario.cargo" name="cargo" placeholder="Cargo" required>
                </div>

                <div class="form-group">
                  <label for="salarioFuncionario">Salário</label>
                  <input type="number" class="form-control" id="salarioFuncionario" 
                         [(ngModel)]="funcionario.salario" name="salario" placeholder="Salário" required>
                </div>

                <div class="form-group">
                  <label for="dataAdmissaoFuncionario">Data de Admissão</label>
                  <input type="date" class="form-control" id="dataAdmissaoFuncionario" 
                         [(ngModel)]="funcionario.dataAdmissao" name="dataAdmissao" required>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="!funcionarioForm.valid">Salvar</button>
                  <button type="button" class="btn btn-secondary" (click)="fecharModal()">Fechar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay do modal -->
      <div class="modal-backdrop fade show" *ngIf="modalAberto"></div>

      <!-- Tabela de Funcionários -->
      <h3 class="mt-4">
        <i class="fas fa-user-md"></i> Lista de Funcionários
      </h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Cargo</th>
            <th>Salário</th>
            <th>Data de Admissão</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let f of funcionarios">
            <td><strong>{{ f.nome }}</strong></td>
            <td>{{ f.email }}</td>
            <td>{{ f.cpf }}</td>
            <td>{{ f.telefone }}</td>
            <td>{{ f.cargo }}</td>
            <td>{{ formatarMoeda(f.salario) }}</td>
            <td>{{ formatarData(f.dataAdmissao) }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarFuncionario(f)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn btn-sm btn-danger" (click)="excluirFuncionario(f.id!)">
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
export class FuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionario: Funcionario = this.criarFuncionarioVazio();
  modalAberto = false;
  editando = false;

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe(funcionarios => {
      this.funcionarios = funcionarios;
    });
  }

  abrirModal(): void {
    this.funcionario = this.criarFuncionarioVazio();
    this.editando = false;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarFuncionario(): void {
    if (this.editando) {
      this.funcionarioService.updateFuncionario(this.funcionario);
    } else {
      this.funcionarioService.addFuncionario(this.funcionario);
    }
    this.fecharModal();
  }

  editarFuncionario(funcionario: Funcionario): void {
    this.funcionario = { ...funcionario };
    this.editando = true;
    this.modalAberto = true;
  }

  excluirFuncionario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.deleteFuncionario(id);
    }
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  private criarFuncionarioVazio(): Funcionario {
    return {
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      cargo: '',
      salario: 0,
      dataAdmissao: ''
    };
  }
} 