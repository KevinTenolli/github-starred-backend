import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, PrimaryColumn, JoinColumn } from "typeorm"
import { Repo } from "./repo"

@Entity()
@Unique(["repo", "commitDate"])
export class RepoCommits {

  @PrimaryGeneratedColumn()
  id!: number

  @PrimaryColumn({ type: "date" })
  commitDate!: Date

  @PrimaryColumn()
  repoId!: number
  
    @Column()
    numberOfCommits!: number

  @ManyToOne(() => Repo, repo => repo.commits)
  @JoinColumn({name: 'repoId', referencedColumnName: 'id'})
  repo?: Repo
}

