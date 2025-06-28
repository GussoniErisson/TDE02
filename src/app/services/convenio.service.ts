import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Convenio } from '../models/convenio.model';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
  private convenios: Convenio[] = [];
  private conveniosSubject = new BehaviorSubject<Convenio[]>([]);

  constructor() {
    // Dados de exemplo
    this.convenios = [
      {
        id: 1,
        nome: 'Unimed',
        descricao: 'Convênio médico Unimed com cobertura nacional'
      },
      {
        id: 2,
        nome: 'Amil',
        descricao: 'Convênio médico Amil com diversos planos'
      }
    ];
    this.conveniosSubject.next(this.convenios);
  }

  getConvenios(): Observable<Convenio[]> {
    return this.conveniosSubject.asObservable();
  }

  addConvenio(convenio: Convenio): void {
    convenio.id = this.convenios.length > 0 ? Math.max(...this.convenios.map(c => c.id!)) + 1 : 1;
    this.convenios.push(convenio);
    this.conveniosSubject.next([...this.convenios]);
  }

  updateConvenio(convenio: Convenio): void {
    const index = this.convenios.findIndex(c => c.id === convenio.id);
    if (index !== -1) {
      this.convenios[index] = convenio;
      this.conveniosSubject.next([...this.convenios]);
    }
  }

  deleteConvenio(id: number): void {
    this.convenios = this.convenios.filter(c => c.id !== id);
    this.conveniosSubject.next([...this.convenios]);
  }

  getConvenioById(id: number): Convenio | undefined {
    return this.convenios.find(c => c.id === id);
  }
} 