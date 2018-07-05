import { schema } from 'normalizr';

const pageSchema = new schema.Entity('pages', {}, { idAttribute: '_id' });

const folderSchema = new schema.Entity('folders', {
  files: [pageSchema]
}, {
  idAttribute: '_id'
});

const children = new schema.Array(folderSchema);
folderSchema.define({ children });

export {
  folderSchema,
  pageSchema
};
