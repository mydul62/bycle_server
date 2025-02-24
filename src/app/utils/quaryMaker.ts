import { Query } from 'mongoose';

class QueryMaker<T> {
  public QueryModel: Query<T[], T>;
  public Query: Record<string, unknown>;

  constructor(QueryModel: Query<T[], T>, Query: Record<string, unknown>) {
    this.QueryModel = QueryModel;
    this.Query = Query;
  }

  search(searchArray: string[]) {
    const search = this.Query.search || '';
    this.QueryModel = this.QueryModel.find({
      $or: searchArray.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      })),
    });
    return this;
  }

  filter() {
    const queryObj = { ...this.Query };
    const excludeFields = ['search', 'sortBy', 'sortOrder', 'page', 'limit'];
    excludeFields.forEach((key) => delete queryObj[key]);

    // Category filter
    if (queryObj.category) {
      this.QueryModel = this.QueryModel.find({ category: queryObj.category });
    }

    // Price range filter
    if (queryObj.minPrice || queryObj.maxPrice) {
      this.QueryModel = this.QueryModel.find({
        price: { $gte: queryObj.minPrice, $lte: queryObj.maxPrice },
      });
    }

    return this;
  }
  // filter() {
  //   const objquery = { ...this.Query };
  //   const ExculsiveFeild = ['search', 'sortBy', 'sortOrder', 'priceRange'];
  //   ExculsiveFeild.forEach((el) => delete objquery[el]);
  
  //   if (this.Query.priceRange) {
  //     const [min, max] = (this.Query.priceRange as string).split('-').map(Number);
  //     objquery['price'] = { $gte: min, $lte: max };
  //   }
  
  //   this.QueryModel = this.QueryModel.find(objquery);
  //   return this;
  // }

  sort() {
    const sortBy = (this.Query.sortBy as string) || 'createdAt';
    const sortOrder = this.Query.sortOrder === 'desc' ? -1 : 1;
    this.QueryModel = this.QueryModel.sort({ [sortBy]: sortOrder });
    return this;
  }

  paginate() {
    const page = Number(this.Query.page) || 1;
    const limit = Number(this.Query.limit) || 10;
    const skip = (page - 1) * limit;

    this.QueryModel = this.QueryModel.skip(skip).limit(limit);
    return this;
  }
}

export default QueryMaker;
