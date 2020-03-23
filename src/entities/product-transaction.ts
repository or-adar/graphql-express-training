import {BaseEntity, Entity, ObjectIdColumn} from "typeorm";
import {Field, ID, InputType} from "type-graphql";

@InputType()
@Entity()
class ProductTransaction extends BaseEntity {
    @ObjectIdColumn()
    id?: string;

    @Field()
    @ObjectIdColumn({generated: false})
    senderId: string;

    @Field()
    @ObjectIdColumn({generated: false})
    productId: string;

    @Field()
    @ObjectIdColumn({generated: false})
    receiverId: string;
}

export default ProductTransaction;