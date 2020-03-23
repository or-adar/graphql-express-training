import {Field, ID, ObjectType} from "type-graphql";
import User from "../../../entities/user";
import Product from "../../../entities/product";

@ObjectType()
class TransactionOutput {
    @Field(type => ID)
    id?: string;

    @Field(type => User)
    sender: User;

    @Field(type => Product)
    product: Product;

    @Field(type => User)
    receiver: User;
}

export default TransactionOutput;