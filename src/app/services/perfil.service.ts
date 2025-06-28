import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Perfil, Permissoes } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private perfis: Perfil[] = [];
  private perfisSubject = new BehaviorSubject<Perfil[]>([]);

  constructor() {
    // Dados de exemplo
    this.perfis = [
      {
        id: 1,
        nome: 'Administrador',
        permissoes: this.criarPermissoesCompletas()
      },
      {
        id: 2,
        nome: 'Médico',
        permissoes: this.criarPermissoesMedico()
      }
    ];
    this.perfisSubject.next(this.perfis);
  }

  getPerfis(): Observable<Perfil[]> {
    return this.perfisSubject.asObservable();
  }

  addPerfil(perfil: Perfil): void {
    perfil.id = this.perfis.length > 0 ? Math.max(...this.perfis.map(p => p.id!)) + 1 : 1;
    this.perfis.push(perfil);
    this.perfisSubject.next([...this.perfis]);
  }

  updatePerfil(perfil: Perfil): void {
    const index = this.perfis.findIndex(p => p.id === perfil.id);
    if (index !== -1) {
      this.perfis[index] = perfil;
      this.perfisSubject.next([...this.perfis]);
    }
  }

  deletePerfil(id: number): void {
    this.perfis = this.perfis.filter(p => p.id !== id);
    this.perfisSubject.next([...this.perfis]);
  }

  getPerfilById(id: number): Perfil | undefined {
    return this.perfis.find(p => p.id === id);
  }

  private criarPermissoesCompletas(): Permissoes {
    return {
      funcionario: { cadastrar: true, ler: true, atualizar: true, deletar: true, listar: true },
      paciente: { cadastrar: true, ler: true, atualizar: true, deletar: true, listar: true },
      consulta: { cadastrar: true, ler: true, atualizar: true, deletar: true, listar: true },
      especialidade: { cadastrar: true, ler: true, atualizar: true, deletar: true, listar: true },
      convenio: { cadastrar: true, ler: true, atualizar: true, deletar: true, listar: true },
      prontuario: { cadastrar: true, ler: true, atualizar: true, deletar: true, listar: true }
    };
  }

  private criarPermissoesMedico(): Permissoes {
    return {
      funcionario: { cadastrar: false, ler: true, atualizar: false, deletar: false, listar: true },
      paciente: { cadastrar: true, ler: true, atualizar: true, deletar: false, listar: true },
      consulta: { cadastrar: true, ler: true, atualizar: true, deletar: false, listar: true },
      especialidade: { cadastrar: false, ler: true, atualizar: false, deletar: false, listar: true },
      convenio: { cadastrar: false, ler: true, atualizar: false, deletar: false, listar: true },
      prontuario: { cadastrar: true, ler: true, atualizar: true, deletar: false, listar: true }
    };
  }
} 