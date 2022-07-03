module.exports = mongoose => {
  let schema = mongoose.Schema( //2022-01-14
    {
      rating:  { type: Number, default: 0 },
      rating_count : { type: Number, default: 0 },
      title: { type: String, default: '' },
      subtitle: { type: String, default: '' },
      authorString: { type: String, default: '' },
      author: {
        type: Array,
        default: []
      },
      smallThumbnail: { type: String, default: '' },
      thumbnail: { type: String, default: '' },
      publishedDate: { type: String, default: '' },
      created_time: { type: Date, default: Date.now },
      infoLink : { type: String, default: '' },
      printType : { type: String, default: '' }
    },
    { collection: 'rating' }

  );

  // schema.method("toJSON", function () {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const model = mongoose.model("rating", schema);
  return model;
};
