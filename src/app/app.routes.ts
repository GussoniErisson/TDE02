import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConvenioComponent } from './pages/convenio/convenio.component';
import { EspecialidadeComponent } from './pages/especialidade/especialidade.component';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProntuarioComponent } from './pages/prontuario/prontuario.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'paciente', component: PacienteComponent },
  { path: 'consulta', component: ConsultaComponent },
  { path: 'convenio', component: ConvenioComponent },
  { path: 'especialidade', component: EspecialidadeComponent },
  { path: 'funcionario', component: FuncionarioComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'prontuario', component: ProntuarioComponent },
  { path: '**', redirectTo: '' }
]; 