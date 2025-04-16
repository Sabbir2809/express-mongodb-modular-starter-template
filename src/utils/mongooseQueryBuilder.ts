// Key Functions:
// 1. search(): Adds a search condition with case-insensitive regex.
// 2. filter(): Adds filters based on the query parameters (excluding special fields).
// 3. sort(): Adds sorting functionality.
// 4. paginate(): Adds pagination functionality.
// 5. fields(): Specifies which fields to include/exclude in the results.
// 6. countTotal(): Returns the total number of documents and total pages based on pagination.
// 7. build(): Returns the final query after all modifications.

import { FilterQuery, Query } from "mongoose";

class mongooseQueryBuilder<T> {
  private modelQuery: Query<T[], T>; // MongoDB query object
  private query: Record<string, unknown>; // Query parameters passed by the user

  /**
   * @param modelQuery - The base query object to apply modifications to.
   * @param query - The query parameters such as search, filters, sort, etc.
   */
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  /**
   * Adds a search condition to the query. It looks for a search term in the specified searchable fields.
   * @param searchableFields - Array of fields to search within.
   * @returns The current instance of mongooseQueryBuilder for chaining.
   */
  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })) as FilterQuery<T>[], // Constructs a regex-based query for case-insensitive search
      });
    }
    return this;
  }

  /**
   * Applies the filters to the query by removing fields like searchTerm, sort, limit, etc.
   * Filters are added as query parameters to the model query.
   * @returns The current instance of mongooseQueryBuilder for chaining.
   */
  filter() {
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    const filters = { ...this.query };
    excludeFields.forEach((field) => delete filters[field]); // Exclude non-filter fields
    this.modelQuery = this.modelQuery.find(filters as FilterQuery<T>); // Apply filters to the query
    return this;
  }

  /**
   * Adds a sort condition to the query. Allows sorting by fields provided in the query parameter.
   * Defaults to sorting by `createdAt` in descending order.
   * @returns The current instance of mongooseQueryBuilder for chaining.
   */
  sort() {
    const sortBy = (this.query.sort as string)?.replace(/,/g, " ") || "-createdAt"; // Convert comma-separated sort fields into space-separated
    this.modelQuery = this.modelQuery.sort(sortBy); // Apply sorting
    return this;
  }

  /**
   * Adds pagination to the query. Uses `page` and `limit` query parameters for pagination.
   * @returns The current instance of mongooseQueryBuilder for chaining.
   */
  paginate() {
    const page = Math.max(Number(this.query.page) || 1, 1); // Ensure page number is at least 1
    const limit = Math.max(Number(this.query.limit) || 10, 1); // Ensure limit is at least 1
    this.modelQuery = this.modelQuery.skip((page - 1) * limit).limit(limit); // Apply skip and limit for pagination
    return this;
  }

  /**
   * Specifies which fields to include or exclude in the result based on the `fields` query parameter.
   * @returns The current instance of mongooseQueryBuilder for chaining.
   */
  fields() {
    const fields = (this.query.fields as string)?.replace(/,/g, " "); // Convert comma-separated fields into space-separated
    if (fields) this.modelQuery = this.modelQuery.select(fields); // Apply field selection
    return this;
  }

  /**
   * Calculates the total number of matching documents and the total number of pages for pagination.
   * @returns An object with `total` (number of documents) and `totalPage` (number of pages).
   */
  async countTotal() {
    const total = await this.modelQuery.model.countDocuments(this.modelQuery.getFilter()); // Get total document count
    const limit = Math.max(Number(this.query.limit) || 10, 1); // Ensure limit is at least 1
    const totalPage = Math.ceil(total / limit); // Calculate total pages based on the limit
    return { total, totalPage };
  }

  /**
   * Returns the final query object after applying all modifications.
   * @returns The final MongoDB query object.
   */
  build() {
    return this.modelQuery;
  }
}

export default mongooseQueryBuilder;
