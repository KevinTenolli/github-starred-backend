import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, PrimaryColumn, JoinColumn } from "typeorm"
import { Repo } from "./Repo.entity"

@Entity()
@Unique(["repo", "commitDate"])
export class RepoCommits {

  @PrimaryGeneratedColumn()
      id?: number

  @PrimaryColumn()
      commitDate!: string

  @PrimaryColumn()
      repoId!: number
  
    @Column()
        numberOfCommits!: number

  @ManyToOne(() => Repo, repo => repo.commits)
  @JoinColumn({name: 'repoId', referencedColumnName: 'id'})
      repo?: Repo
}
