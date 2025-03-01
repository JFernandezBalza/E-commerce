import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/entities/categories.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    description: 'Unique name of the product',
    required: true,
  })
  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Description of the product',
    required: true,
  })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @ApiProperty({
    type: 'number',
    description: 'Price of the product',
    required: true,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({
    type: 'number',
    description: 'Stock available for the product',
    required: true,
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    type: String,
    description: 'Image URL of the product',
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-lS7UglnA-wCGKaJt0o4tWihX_pubIzgTA&s',
    required: true,
  })
  @Column({
    type: 'text',
    nullable: false,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-lS7UglnA-wCGKaJt0o4tWihX_pubIzgTA&s',
  })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  @ApiProperty({
    type: String,
    description: 'ID of the category to which the product belongs',
    required: false,
  })
  category: Category;
}
