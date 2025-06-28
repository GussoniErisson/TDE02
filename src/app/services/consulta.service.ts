import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Consulta } from '../models/consulta.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private consultas: Consulta[] = [];
  private consultasSubject = new BehaviorSubject<Consulta[]>([]);

  constructor() {
    // Dados de exemplo
    this.consultas = [
      {
        id: 1,
        dataHorario: '2024-01-15T10:00',
        sintomas: 'Dor de cabeça e febre',
        eRetorno: false,
        estaAtiva: true
      },
      {
        id: 2,
        dataHorario: '2024-01-20T14:30',
        sintomas: 'Acompanhamento pós-cirurgia',
        eRetorno: true,
        estaAtiva: true
      }
    ];
    this.consultasSubject.next(this.consultas);
  }

  getConsultas(): Observable<Consulta[]> {
    return this.consultasSubject.asObservable();
  }

  addConsulta(consulta: Consulta): void {
    consulta.id = this.consultas.length > 0 ? Math.max(...this.consultas.map(c => c.id!)) + 1 : 1;
    this.consultas.push(consulta);
    this.consultasSubject.next([...this.consultas]);
  }

  updateConsulta(consulta: Consulta): void {
    const index = this.consultas.findIndex(c => c.id === consulta.id);
    if (index !== -1) {
      this.consultas[index] = consulta;
      this.consultasSubject.next([...this.consultas]);
    }
  }

  deleteConsulta(id: number): void {
    this.consultas = this.consultas.filter(c => c.id !== id);
    this.consultasSubject.next([...this.consultas]);
  }

  getConsultaById(id: number): Consulta | undefined {
    return this.consultas.find(c => c.id === id);
  }
} 