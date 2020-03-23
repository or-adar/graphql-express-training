import {Resolver, Mutation, Arg} from "type-graphql";
import ProductTransaction from "../../entities/product-transaction";
import Product from "../../entities/product";
import User from "../../entities/user";
import TransactionOutput from "./types/transaction-output";

@Resolver()
class TransactionResolver {
    @Mutation(returns => TransactionOutput)
    async createTransaction(@Arg("transaction", () => ProductTransaction) transaction: ProductTransaction) {
        const product = await Product.findOne(transaction.productId);
        const sender = await User.findOne(transaction.senderId);
        const receiver = await User.findOne(transaction.receiverId);
        const {id} = await ProductTransaction.create(transaction).save();
        let output: TransactionOutput = {id: id, sender: sender, product: product, receiver: receiver};

        return output;
    }
}

export default TransactionResolver;