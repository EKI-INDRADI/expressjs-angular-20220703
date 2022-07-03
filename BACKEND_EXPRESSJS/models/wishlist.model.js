module.exports = mongoose => {
  let schema = mongoose.Schema( //2022-01-14
    {
      user_login: { type: String, default: '' },
      title: { type: String, default: '' },
      subtitle: { type: String, default: '' },
      authorString: { type: String, default: '' },
      authors: {
        type: Array,
        default: []
      },
      smallThumbnail: { type: String, default: '' },
      thumbnail: { type: String, default: '' },
      publishedDate: { type: String, default: '' },
      created_time: { type: Date, default: Date.now },
      infoLink : { type: String, default: '' },
      printType : { type: String, default: '' },
    },
    { collection: 'wishlist' }

  );

  // schema.method("toJSON", function () {
  //   const { __v, _id, ...object } = this.toObject();
  //   object.id = _id;
  //   return object;
  // });

  const model = mongoose.model("wishlist", schema);
  return model;
};
