import {BaseEntity, Column, Entity, ObjectIdColumn} from "typeorm";
import {Field, Float, ID, ObjectType} from "type-graphql";

@ObjectType()
@Entity()
class Product extends BaseEntity {
    @Field(type => ID)
    @ObjectIdColumn()
    id?: string;

    @Field()
    @Column()
    title: string;

    @Field(type => Float)
    @Column({type: "float"})
    price: number;

    @Field()
    @Column()
    category: string;
}

export default Product;