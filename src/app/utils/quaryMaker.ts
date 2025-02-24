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

  

    // Price range filter
    const minPrice = Number(queryObj.minPrice);
    const maxPrice = Number(queryObj.maxPrice);
    
    if (!isNaN(minPrice) && !isNaN(maxPrice)) {
      this.QueryModel = this.QueryModel.find({
        price: { $gte: minPrice, $lte: maxPrice },
      });
    } else {
      // Optionally return all products if no valid price range is provided
      this.QueryModel = this.QueryModel.find(); // Return all products
    }
    
    

    return this;
  }


  // sort() {
  //   const sortBy = (this.Query.sortBy as string) || 'createdAt';
  //   const sortOrder = this.Query.sortOrder === 'desc' ? -1 : 1;
  //   this.QueryModel = this.QueryModel.sort({ [sortBy]: sortOrder });
  //   return this;
  // }


}

export default QueryMaker;
