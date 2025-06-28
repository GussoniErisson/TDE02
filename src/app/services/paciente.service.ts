import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private pacientes: Paciente[] = [];
  private pacientesSubject = new BehaviorSubject<Paciente[]>([]);

  constructor() {
    // Dados de exemplo
    this.pacientes = [
      {
        id: 1,
        nome: 'João Silva',
        idade: 35,
        sexo: 'M',
        cpf: '123.456.789-00',
        rua: 'Rua das Flores',
        numero: '123',
        complemento: 'Apto 45',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        contato: '(11) 99999-9999',
        email: 'joao@email.com',
        dataNascimento: '1988-05-15'
      }
    ];
    this.pacientesSubject.next(this.pacientes);
  }

  getPacientes(): Observable<Paciente[]> {
    return this.pacientesSubject.asObservable();
  }

  addPaciente(paciente: Paciente): void {
    paciente.id = this.pacientes.length > 0 ? Math.max(...this.pacientes.map(p => p.id!)) + 1 : 1;
    this.pacientes.push(paciente);
    this.pacientesSubject.next([...this.pacientes]);
  }

  updatePaciente(paciente: Paciente): void {
    const index = this.pacientes.findIndex(p => p.id === paciente.id);
    if (index !== -1) {
      this.pacientes[index] = paciente;
      this.pacientesSubject.next([...this.pacientes]);
    }
  }

  deletePaciente(id: number): void {
    this.pacientes = this.pacientes.filter(p => p.id !== id);
    this.pacientesSubject.next([...this.pacientes]);
  }

  getPacienteById(id: number): Paciente | undefined {
    return this.pacientes.find(p => p.id === id);
  }
} 