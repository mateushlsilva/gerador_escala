import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";


@Entity({name:"disponibilidade"})
export default class Disponibilidade {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    // Colocar os campos da tabela

}