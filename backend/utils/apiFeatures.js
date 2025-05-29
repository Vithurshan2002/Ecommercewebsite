class APIFetures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //SEARCH FUNCTON
  search() {
    let keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query.find({ ...keyword });
    return this;
  }

  //filter
  filter() {
    let querystringcopy = { ...this.queryString };
    let removefields = ["keyword", "limit", "page"]; //remove othey querysting field in querystring
    removefields.forEach((field) => delete querystringcopy[field]);
    this.query.find(querystringcopy);
    return this;
  }

  paginate(resPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFetures;
