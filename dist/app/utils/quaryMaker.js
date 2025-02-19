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
        const quaryObj = Object.assign({}, this.Query);
        const ExculsiveFeild = ['search', 'sortBy', 'sortOrder'];
        ExculsiveFeild.forEach((key) => delete quaryObj[key]);
        const queryObject = quaryObj.filter ? { author: quaryObj.filter } : {};
        this.QueryModel = this.QueryModel.find(queryObject);
        return this;
    }
    sort() {
        const sortBy = this.Query.sortBy || 'createdAt';
        const sortOrder = this.Query.sortOrder === 'desc' ? -1 : 1;
        this.QueryModel = this.QueryModel.sort({ [sortBy]: sortOrder });
        return this;
    }
}
exports.default = QueryMaker;
