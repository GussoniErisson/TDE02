import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private funcionarios: Funcionario[] = [];
  private funcionariosSubject = new BehaviorSubject<Funcionario[]>([]);

  constructor() {
    // Dados de exemplo
    this.funcionarios = [
      {
        id: 1,
        nome: 'Dr. João Silva',
        email: 'joao.silva@clinica.com',
        cpf: '123.456.789-00',
        telefone: '(11) 99999-9999',
        cargo: 'Médico Cardiologista',
        salario: 15000,
        dataAdmissao: '2020-01-15'
      },
      {
        id: 2,
        nome: 'Maria Santos',
        email: 'maria.santos@clinica.com',
        cpf: '987.654.321-00',
        telefone: '(11) 88888-8888',
        cargo: 'Enfermeira',
        salario: 5000,
        dataAdmissao: '2021-03-20'
      }
    ];
    this.funcionariosSubject.next(this.funcionarios);
  }

  getFuncionarios(): Observable<Funcionario[]> {
    return this.funcionariosSubject.asObservable();
  }

  addFuncionario(funcionario: Funcionario): void {
    funcionario.id = this.funcionarios.length > 0 ? Math.max(...this.funcionarios.map(f => f.id!)) + 1 : 1;
    this.funcionarios.push(funcionario);
    this.funcionariosSubject.next([...this.funcionarios]);
  }

  updateFuncionario(funcionario: Funcionario): void {
    const index = this.funcionarios.findIndex(f => f.id === funcionario.id);
    if (index !== -1) {
      this.funcionarios[index] = funcionario;
      this.funcionariosSubject.next([...this.funcionarios]);
    }
  }

  deleteFuncionario(id: number): void {
    this.funcionarios = this.funcionarios.filter(f => f.id !== id);
    this.funcionariosSubject.next([...this.funcionarios]);
  }

  getFuncionarioById(id: number): Funcionario | undefined {
    return this.funcionarios.find(f => f.id === id);
  }
} 