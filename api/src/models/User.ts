import {Model,Column,Table,CreatedAt,UpdatedAt,IsUUID} from 'sequelize-typescript'

@Table
export class User extends Model<User>{

    @IsUUID(4)
    @Column({ primaryKey: true })
    id!: string

    @Column
    identification!:number

    @Column
    zone!:string

    @Column
    phone!:number

    @Column
    photo!:string

    @Column
    account!:string


}