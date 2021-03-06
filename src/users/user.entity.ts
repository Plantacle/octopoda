import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import bcrypt from 'bcrypt'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { BeforeInsert, BeforeUpdate, Column, Entity, Index, ObjectIdColumn } from 'typeorm'

@Entity({
  name: 'users',
})
export class User {
  @ObjectIdColumn()
  @ApiProperty({
    example: '5dbc8ca75afd20651c5ac767',
    readOnly: true,
  })
  _id?: string

  @Index({
    unique: true,
  })
  @Column()
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Column()
  @ApiProperty({
    example: 'supersecret',
    writeOnly: true,
  })
  @IsString()
  @IsNotEmpty()
  password?: string

  @Column()
  @ApiProperty({
    example: ['user', 'admin'],
    readOnly: true,
  })
  roles: string[]

  @Column()
  @ApiPropertyOptional({
    example: '6546710d8bf6bb1a6ad45f81aaf66a4031698825',
    readOnly: true,
  })
  deviceId?: string

  @BeforeInsert()
  @BeforeUpdate()
  private async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }
}
