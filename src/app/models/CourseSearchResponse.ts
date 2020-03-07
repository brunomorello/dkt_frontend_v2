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

    constructor(
        {
            id, nome, valorTotal, valorMensal, periodo, duracao, mba, pos, is_active, id_modalidade,
            id_instituicao, id_cursoUrl, id_cursoUrl_manual, id_especializacao, id_atuacao, especializacao,
            atuacao, instituicao, modalidade, cursoUrl, cursoUrlManual
        }: {
            id: number, nome: string, valorTotal: number, valorMensal: number, 
            periodo: string, duracao: string, mba: boolean, pos: boolean, is_active: boolean,
            id_modalidade: number, id_instituicao: number, id_cursoUrl: number, id_cursoUrl_manual: number,
            id_especializacao: number, id_atuacao: number, especializacao: Specialization, atuacao: Course,
            instituicao: College, modalidade: Modality, cursoUrl: CourseURL, cursoUrlManual: CourseURLManual
        }) {

        this.id = id;
        this.nome = nome;
        this.valorTotal = valorTotal;
        this.valorMensal = valorMensal;
        this.periodo = periodo;
        this.duracao = duracao;
        this.mba = mba;
        this.pos = pos;
        this.is_active = is_active;
        this.id_modalidade = id_modalidade;
        this.id_instituicao = id_instituicao;
        this.id_cursoUrl = id_cursoUrl;
        this.id_cursoUrl_manual = id_cursoUrl_manual;
        this.id_especializacao = id_especializacao;
        this.id_atuacao = id_atuacao;
        this.especializacao = especializacao;
        this.atuacao = atuacao;
        this.instituicao = instituicao;
        this.modalidade = modalidade;
        this.cursoUrl = cursoUrl;
        this.cursoUrlManual = cursoUrlManual;
    }
    
}