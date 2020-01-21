export class Course {

    id = "";
    nome = "";
    createdAt = new Date();
    updatedAt = new Date();

    constructor(
        {id, nome, createdAt, updatedAt}: {id: string, nome: string, createdAt: Date, updatedAt: Date}
    ) {
        this.id = id;
        this.nome = nome;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}