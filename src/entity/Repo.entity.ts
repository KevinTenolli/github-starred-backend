import { Entity, Column, PrimaryColumn, ManyToOne, Unique, OneToMany, JoinColumn } from "typeorm"
import { Owner } from "./Owner.entity"
import { RepoCommits } from "./RepoCommits.entity"

@Entity()
@Unique(['id'])
export class Repo {
    @PrimaryColumn()
        id!: number

    @Column()
        repoName!: string

    @Column()
        ownerId!: number

    @ManyToOne(() => Owner, owner => owner.repos)
    @JoinColumn({ name: 'ownerId', referencedColumnName: 'id' })
        owner?: Owner

    @OneToMany(() => RepoCommits, commits => commits.repo)
        commits?: RepoCommits[]
}