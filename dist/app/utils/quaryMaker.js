"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryMaker {
    constructor(QueryModel, Query) {
        this.QueryModel = QueryModel;
        this.Query = Query;
    }
    search(searchArray) {
        const search = this.Query.search || '';
        this.QueryModel = this.QueryModel.find({
            $or: searchArray.map((field) => ({
                [field]: { $regex: search, $options: 'i' },
            })),
        });
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.Query);
        const excludeFields = ['search', 'sortBy', 'sortOrder', 'page', 'limit'];
        excludeFields.forEach((key) => delete queryObj[key]);
        // Price range filter
        const minPrice = Number(queryObj.minPrice);
        const maxPrice = Number(queryObj.maxPrice);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            this.QueryModel = this.QueryModel.find({
                price: { $gte: minPrice, $lte: maxPrice },
            });
        }
        else {
            // Optionally return all products if no valid price range is provided
            this.QueryModel = this.QueryModel.find(); // Return all products
        }
        return this;
    }
}
exports.default = QueryMaker;
