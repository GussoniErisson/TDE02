import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../models/paciente.model';
import { PacienteService } from '../../services/paciente.service';

@Component({
  selector: 'app-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <button type="button" class="btn btn-primary" (click)="abrirModal()">
        Abrir Formulário de Paciente
      </button>

      <!-- Modal do Paciente -->
      <div class="modal fade" [class.show]="modalAberto" [style.display]="modalAberto ? 'block' : 'none'" 
           tabindex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="formModalLabel">PACIENTE</h5>
              <button type="button" class="close" (click)="fecharModal()" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <form #pacienteForm="ngForm" (ngSubmit)="salvarPaciente()">
                <div class="form-group">
                  <label for="nomePaciente">Nome</label>
                  <input type="text" class="form-control" id="nomePaciente" 
                         [(ngModel)]="paciente.nome" name="nome" placeholder="Nome" required>
                </div>

                <div class="form-group">
                  <label for="idadePaciente">Idade</label>
                  <input type="number" class="form-control" id="idadePaciente" 
                         [(ngModel)]="paciente.idade" name="idade" placeholder="Idade" required>
                </div>

                <div class="form-group">
                  <label for="sexoPaciente">Sexo</label>
                  <input type="text" class="form-control" id="sexoPaciente" 
                         [(ngModel)]="paciente.sexo" name="sexo" maxlength="1" placeholder="M/F" required>
                </div>

                <div class="form-group">
                  <label for="cpfPaciente">CPF</label>
                  <input type="text" class="form-control" id="cpfPaciente" 
                         [(ngModel)]="paciente.cpf" name="cpf" placeholder="CPF" required>
                </div>

                <div class="form-group">
                  <label for="ruaPaciente">Rua</label>
                  <input type="text" class="form-control" id="ruaPaciente" 
                         [(ngModel)]="paciente.rua" name="rua" placeholder="Rua" required>
                </div>

                <div class="form-group">
                  <label for="numeroPaciente">Número</label>
                  <input type="text" class="form-control" id="numeroPaciente" 
                         [(ngModel)]="paciente.numero" name="numero" placeholder="Número" required>
                </div>

                <div class="form-group">
                  <label for="complementoPaciente">Complemento</label>
                  <input type="text" class="form-control" id="complementoPaciente" 
                         [(ngModel)]="paciente.complemento" name="complemento" placeholder="Complemento">
                </div>

                <div class="form-group">
                  <label for="bairroPaciente">Bairro</label>
                  <input type="text" class="form-control" id="bairroPaciente" 
                         [(ngModel)]="paciente.bairro" name="bairro" placeholder="Bairro" required>
                </div>

                <div class="form-group">
                  <label for="cidadePaciente">Cidade</label>
                  <input type="text" class="form-control" id="cidadePaciente" 
                         [(ngModel)]="paciente.cidade" name="cidade" placeholder="Cidade" required>
                </div>

                <div class="form-group">
                  <label for="estadoPaciente">Estado</label>
                  <input type="text" class="form-control" id="estadoPaciente" 
                         [(ngModel)]="paciente.estado" name="estado" placeholder="Estado" required>
                </div>

                <div class="form-group">
                  <label for="contatoPaciente">Contato</label>
                  <input type="text" class="form-control" id="contatoPaciente" 
                         [(ngModel)]="paciente.contato" name="contato" placeholder="Telefone ou celular" required>
                </div>

                <div class="form-group">
                  <label for="emailPaciente">E-mail</label>
                  <input type="email" class="form-control" id="emailPaciente" 
                         [(ngModel)]="paciente.email" name="email" placeholder="E-mail" required>
                </div>

                <div class="form-group">
                  <label for="dataNascimentoPaciente">Data de Nascimento</label>
                  <input type="date" class="form-control" id="dataNascimentoPaciente" 
                         [(ngModel)]="paciente.dataNascimento" name="dataNascimento" required>
                </div>

                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary" [disabled]="!pacienteForm.valid">Salvar</button>
                  <button type="button" class="btn btn-secondary" (click)="fecharModal()">Fechar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- Overlay do modal -->
      <div class="modal-backdrop fade show" *ngIf="modalAberto"></div>

      <!-- Tabela de Pacientes -->
      <h3 class="mt-4">Lista de Pacientes</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Sexo</th>
            <th>CPF</th>
            <th>Contato</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let p of pacientes">
            <td>{{ p.nome }}</td>
            <td>{{ p.idade }}</td>
            <td>{{ p.sexo }}</td>
            <td>{{ p.cpf }}</td>
            <td>{{ p.contato }}</td>
            <td>{{ p.email }}</td>
            <td>
              <button class="btn btn-sm btn-warning me-2" (click)="editarPaciente(p)">Editar</button>
              <button class="btn btn-sm btn-danger" (click)="excluirPaciente(p.id!)">Excluir</button>
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
  `]
})
export class PacienteComponent implements OnInit {
  pacientes: Paciente[] = [];
  paciente: Paciente = this.criarPacienteVazio();
  modalAberto = false;
  editando = false;

  constructor(private pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.carregarPacientes();
  }

  carregarPacientes(): void {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  abrirModal(): void {
    this.paciente = this.criarPacienteVazio();
    this.editando = false;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarPaciente(): void {
    if (this.editando) {
      this.pacienteService.updatePaciente(this.paciente);
    } else {
      this.pacienteService.addPaciente(this.paciente);
    }
    this.fecharModal();
  }

  editarPaciente(paciente: Paciente): void {
    this.paciente = { ...paciente };
    this.editando = true;
    this.modalAberto = true;
  }

  excluirPaciente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
      this.pacienteService.deletePaciente(id);
    }
  }

  private criarPacienteVazio(): Paciente {
    return {
      nome: '',
      idade: 0,
      sexo: '',
      cpf: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      contato: '',
      email: '',
      dataNascimento: ''
    };
  }
} 