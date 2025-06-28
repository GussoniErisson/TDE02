import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container-fluid">
      <div class="jumbotron text-center">
        <h1>🏥 Bem-vindo ao Sistema da Clínica Médica!</h1>
        <p class="lead">
          Gerencie os cadastros dos nossos sistemas facilmente. Aqui você pode realizar o CRUD 
          (Criar, Ler, Atualizar, Excluir) de cada uma das entidades.
        </p>
        <p>
          Escolha uma das opções no menu acima para começar a gerenciar.
        </p>
        
        <div class="mt-4">
          <a routerLink="/paciente" class="btn btn-primary btn-lg me-3">
            <i class="fas fa-user-injured"></i> Gerenciar Pacientes
          </a>
          <a routerLink="/consulta" class="btn btn-outline-primary btn-lg me-3">
            <i class="fas fa-calendar-check"></i> Agendar Consultas
          </a>
          <a routerLink="/funcionario" class="btn btn-outline-primary btn-lg">
            <i class="fas fa-user-md"></i> Funcionários
          </a>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="fas fa-user-injured fa-3x text-primary mb-3"></i>
              <h5 class="card-title">Pacientes</h5>
              <p class="card-text">Gerencie o cadastro completo de pacientes com informações pessoais e médicas.</p>
              <a routerLink="/paciente" class="btn btn-primary">Acessar</a>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="fas fa-calendar-check fa-3x text-success mb-3"></i>
              <h5 class="card-title">Consultas</h5>
              <p class="card-text">Agende e gerencie consultas médicas com diferentes especialidades.</p>
              <a routerLink="/consulta" class="btn btn-success">Acessar</a>
            </div>
          </div>
        </div>
        
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="fas fa-user-md fa-3x text-info mb-3"></i>
              <h5 class="card-title">Funcionários</h5>
              <p class="card-text">Controle o cadastro de médicos, enfermeiros e demais funcionários.</p>
              <a routerLink="/funcionario" class="btn btn-info">Acessar</a>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-md-3 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="fas fa-handshake fa-2x text-warning mb-3"></i>
              <h6 class="card-title">Convênios</h6>
              <p class="card-text small">Gerencie convênios médicos</p>
              <a routerLink="/convenio" class="btn btn-warning btn-sm">Acessar</a>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="fas fa-stethoscope fa-2x text-danger mb-3"></i>
              <h6 class="card-title">Especialidades</h6>
              <p class="card-text small">Cadastre especialidades médicas</p>
              <a routerLink="/especialidade" class="btn btn-danger btn-sm">Acessar</a>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="fas fa-user-circle fa-2x text-secondary mb-3"></i>
              <h6 class="card-title">Perfis</h6>
              <p class="card-text small">Gerencie perfis de usuários</p>
              <a routerLink="/perfil" class="btn btn-secondary btn-sm">Acessar</a>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body text-center">
              <i class="fas fa-file-medical fa-2x text-dark mb-3"></i>
              <h6 class="card-title">Prontuários</h6>
              <p class="card-text small">Acesse prontuários médicos</p>
              <a routerLink="/prontuario" class="btn btn-dark btn-sm">Acessar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border: none;
      border-radius: 15px;
      transition: all 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
    }
    
    .card-body {
      padding: 2rem 1.5rem;
    }
    
    .btn-lg {
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 10px;
    }
    
    .btn-outline-primary {
      border: 2px solid #007bff;
      color: #007bff;
      background: transparent;
    }
    
    .btn-outline-primary:hover {
      background: #007bff;
      color: white;
      transform: translateY(-2px);
    }
    
    .text-primary { color: #007bff !important; }
    .text-success { color: #28a745 !important; }
    .text-info { color: #17a2b8 !important; }
    .text-warning { color: #ffc107 !important; }
    .text-danger { color: #dc3545 !important; }
    .text-secondary { color: #6c757d !important; }
    .text-dark { color: #343a40 !important; }
    
    .btn-success {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      border: none;
      border-radius: 8px;
    }
    
    .btn-info {
      background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
      border: none;
      border-radius: 8px;
      color: white;
    }
    
    .btn-warning {
      background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
      border: none;
      border-radius: 8px;
      color: #212529;
    }
    
    .btn-danger {
      background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
      border: none;
      border-radius: 8px;
    }
    
    .btn-secondary {
      background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
      border: none;
      border-radius: 8px;
    }
    
    .btn-dark {
      background: linear-gradient(135deg, #343a40 0%, #23272b 100%);
      border: none;
      border-radius: 8px;
    }
    
    .lead {
      font-size: 1.25rem;
      font-weight: 300;
    }
    
    @media (max-width: 768px) {
      .btn-lg {
        display: block;
        width: 100%;
        margin-bottom: 1rem;
      }
      
      .card-body {
        padding: 1.5rem 1rem;
      }
    }
  `]
})
export class HomeComponent {} 