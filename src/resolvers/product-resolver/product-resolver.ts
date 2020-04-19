import {Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import Product from "../../entities/product";
import {Arg} from "type-graphql/dist/decorators/Arg";
import CreateProductOptions from "./types/create-product-options";
import {isAuthorized} from "../../utils/authorization/authorization";

@Resolver(Product)
class ProductResolver {
    @Mutation(returns => Product)
    async createProduct(@Arg("options", () => CreateProductOptions) options: CreateProductOptions) {
        return await Product.create({...options}).save();
    }

    @Query(returns => [Product])
    @UseMiddleware(isAuthorized)
    async products() {
        return await Product.find();
    }
}

export default ProductResolver;