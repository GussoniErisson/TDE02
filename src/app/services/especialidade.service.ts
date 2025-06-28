import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Especialidade } from '../models/especialidade.model';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {
  private especialidades: Especialidade[] = [];
  private especialidadesSubject = new BehaviorSubject<Especialidade[]>([]);

  constructor() {
    // Dados de exemplo
    this.especialidades = [
      {
        id: 1,
        nome: 'Cardiologia',
        descricao: 'Especialidade médica que trata do coração e sistema cardiovascular'
      },
      {
        id: 2,
        nome: 'Ortopedia',
        descricao: 'Especialidade médica que trata de lesões e doenças do sistema locomotor'
      }
    ];
    this.especialidadesSubject.next(this.especialidades);
  }

  getEspecialidades(): Observable<Especialidade[]> {
    return this.especialidadesSubject.asObservable();
  }

  addEspecialidade(especialidade: Especialidade): void {
    especialidade.id = this.especialidades.length > 0 ? Math.max(...this.especialidades.map(e => e.id!)) + 1 : 1;
    this.especialidades.push(especialidade);
    this.especialidadesSubject.next([...this.especialidades]);
  }

  updateEspecialidade(especialidade: Especialidade): void {
    const index = this.especialidades.findIndex(e => e.id === especialidade.id);
    if (index !== -1) {
      this.especialidades[index] = especialidade;
      this.especialidadesSubject.next([...this.especialidades]);
    }
  }

  deleteEspecialidade(id: number): void {
    this.especialidades = this.especialidades.filter(e => e.id !== id);
    this.especialidadesSubject.next([...this.especialidades]);
  }

  getEspecialidadeById(id: number): Especialidade | undefined {
    return this.especialidades.find(e => e.id === id);
  }
} 