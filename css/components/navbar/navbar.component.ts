import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">
          <strong>🏥 Clínica Médica</strong>
        </a>
        
        <div class="navbar-nav ms-auto">
          <a class="nav-link" routerLink="/consulta" routerLinkActive="active">
            <i class="fas fa-calendar-check"></i> Consulta
          </a>
          <a class="nav-link" routerLink="/convenio" routerLinkActive="active">
            <i class="fas fa-handshake"></i> Convênio
          </a>
          <a class="nav-link" routerLink="/especialidade" routerLinkActive="active">
            <i class="fas fa-stethoscope"></i> Especialidade
          </a>
          <a class="nav-link" routerLink="/funcionario" routerLinkActive="active">
            <i class="fas fa-user-md"></i> Funcionário
          </a>
          <a class="nav-link" routerLink="/paciente" routerLinkActive="active">
            <i class="fas fa-user-injured"></i> Paciente
          </a>
          <a class="nav-link" routerLink="/perfil" routerLinkActive="active">
            <i class="fas fa-user-circle"></i> Perfil
          </a>
          <a class="nav-link" routerLink="/prontuario" routerLinkActive="active">
            <i class="fas fa-file-medical"></i> Prontuário
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem 0;
    }
    
    .navbar-brand {
      font-size: 1.5rem;
      color: #007bff !important;
      font-weight: bold;
    }
    
    .navbar-nav .nav-link {
      color: #333 !important;
      font-weight: 500;
      margin: 0 0.5rem;
      padding: 0.5rem 1rem !important;
      border-radius: 5px;
      transition: all 0.3s ease;
    }
    
    .navbar-nav .nav-link:hover {
      background-color: #f8f9fa;
      color: #007bff !important;
      transform: translateY(-1px);
    }
    
    .navbar-nav .nav-link.active {
      background-color: #007bff;
      color: white !important;
    }
    
    .navbar-nav .nav-link i {
      margin-right: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .navbar-nav {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .navbar-nav .nav-link {
        margin: 0.25rem;
        font-size: 0.9rem;
      }
    }
  `]
})
export class NavbarComponent {} 