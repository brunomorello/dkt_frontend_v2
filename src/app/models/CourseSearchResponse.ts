import { Specialization } from './Specialization';
import { Course } from './Course';
import { College } from './College';
import { Modality } from './Modality';
import { CourseURL } from './CourseURL';
import { CourseURLManual } from './CourseURLManual';

export class CourseSearchResponse {

    id: number;
    nome: string;
    valorTotal: number;
    valorMensal: number;
    periodo: string;
    duracao: string;
    mba: boolean;
    pos: boolean;
    is_active: boolean;
    id_modalidade: number;
    id_instituicao: number;
    id_cursoUrl: number;
    id_cursoUrl_manual: number;
    id_especializacao: number;
    id_atuacao: number;
    especializacao: Specialization;
    atuacao: Course;
    instituicao: College;
    modalidade: Modality;
    cursoUrl: CourseURL;
    cursoUrlManual: CourseURLManual;
    
}