import { Entity, Column, PrimaryColumn, OneToMany, Unique } from "typeorm"
import { Repo } from "./repo"

@Entity()
@Unique(['id'])
export class Owner {
    @PrimaryColumn()
    id!: number

    @Column()
    ownerUsername!: string

    @OneToMany(() => Repo, repo => repo.owner)
    repos?: Repo[]
}


