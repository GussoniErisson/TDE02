import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prontuario } from '../models/prontuario.model';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioService {
  private prontuarios: Prontuario[] = [];
  private prontuariosSubject = new BehaviorSubject<Prontuario[]>([]);

  constructor() {
    // Dados de exemplo
    this.prontuarios = [
      {
        id: 1,
        nomeExame: 'Hemograma Completo',
        tipoExame: 'Exame de Sangue',
        dataExame: '2024-01-10',
        observacoes: 'Paciente em jejum de 12 horas'
      },
      {
        id: 2,
        nomeExame: 'Eletrocardiograma',
        tipoExame: 'Exame Cardíaco',
        dataExame: '2024-01-15',
        observacoes: 'Exame de rotina para check-up'
      }
    ];
    this.prontuariosSubject.next(this.prontuarios);
  }

  getProntuarios(): Observable<Prontuario[]> {
    return this.prontuariosSubject.asObservable();
  }

  addProntuario(prontuario: Prontuario): void {
    prontuario.id = this.prontuarios.length > 0 ? Math.max(...this.prontuarios.map(p => p.id!)) + 1 : 1;
    this.prontuarios.push(prontuario);
    this.prontuariosSubject.next([...this.prontuarios]);
  }

  updateProntuario(prontuario: Prontuario): void {
    const index = this.prontuarios.findIndex(p => p.id === prontuario.id);
    if (index !== -1) {
      this.prontuarios[index] = prontuario;
      this.prontuariosSubject.next([...this.prontuarios]);
    }
  }

  deleteProntuario(id: number): void {
    this.prontuarios = this.prontuarios.filter(p => p.id !== id);
    this.prontuariosSubject.next([...this.prontuarios]);
  }

  getProntuarioById(id: number): Prontuario | undefined {
    return this.prontuarios.find(p => p.id === id);
  }
} 