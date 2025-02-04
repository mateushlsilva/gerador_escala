import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import * as bcrypt from "bcrypt";

enum UserType {
    ADM = 0,
    MC = 1,
    COROINHA = 2
}

@Entity({ name: "usuarios" })
export default class Usuario {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true, length: 70 })
    userEmail: string;

    @Column({ nullable: false, select: false, length: 100 })
    userPassword: string;

    @Column({ nullable: true, default: false })
    userTN: boolean;

    @Column({ type: "enum", enum: UserType, default: UserType.COROINHA })
    userType: UserType;

    @Column({ nullable: true, length: 100, unique: true })
    userName: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.usuariosGerenciados, { nullable: true })
    @JoinColumn({ name: "admin_id" }) // Nome da coluna no banco de dados
    admin: Usuario;

    usuariosGerenciados?: Usuario[];

    @BeforeInsert() //a função hashPassword é disparada antes do insert e update
    @BeforeUpdate()
    hashPassword(): void {
        if (this.userPassword) {
            // a senha é codificada usando o algoritmo do pacote bcrypt
            this.userPassword = bcrypt.hashSync(this.userPassword, bcrypt.genSaltSync(10));
        }
    }

    compare(input: string): Promise<boolean> {
        // a senha fornecida em input é comparada com a senha do registro armazenado no SGBD
        return bcrypt.compare(input, this.userPassword);
    }
}