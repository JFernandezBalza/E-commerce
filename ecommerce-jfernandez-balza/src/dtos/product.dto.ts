import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/entities/categories.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class UpdateProductDto {
  @PrimaryGeneratedColumn(`uuid`)
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  @IsOptional()
  @IsString()
  name?: string;

  @Column({ type: 'varchar', nullable: false })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @Column({ type: 'int', nullable: false })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @Column({
    type: 'text',
    nullable: false,
    default: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-lS7UglnA-wCGKaJt0o4tWihX_pubIzgTA&s`,
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: `category_id` })
  @IsOptional()
  @IsString()
  categoryId?: string;
}
