import {Field, Float, InputType} from "type-graphql";

@InputType()
class CreateProductOptions {
    @Field()
    title: string;

    @Field(type => Float)
    price: number;

    @Field()
    category: string;
}

export default CreateProductOptions;