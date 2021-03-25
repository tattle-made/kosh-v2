# Search

- Search Input component needs to know what page the user is on, so it can recommend the "search in this datasource" option

Tasks

- Add an icon of text, image or video depending on what file is dropped onto the react-dropzone in the search input component

- Add an export to .csv action for group select

- Add hover state to singlepost

  - open in external tab, expand within site

- make search-result.js component such that it can respond to changes in the search context or the query string for /search

Where should the registration table be?
in kosh's central database or distributed in the datasource's database

## Distributed strategy

### Maintenance Overhead

- ensure that a REST server is always working (easy with something like kubernetes)
- indexing is automatic, anytime a new post is added to the datasource's database, it becomes a candidate for indexing
- kosh can run a cron job that periodically polls datasource for unindexed posts, look at its indexing recording (coupling)

### Design Considerations

- Optimize architecture for
  - Get all unregistered posts in a paginated manner (get all posts whose onPortal is false)
    - update onPortal and index_register (mapping between doc_id and index status)
  - Get data and metadata for postId (search by docId and obtain data and metadata)
  - Get all posts in a paginated manner (easy)

### Caveats

- fileserver
  - util to convert s3URL to a fs server

### Tasks

- Reset onPortal to false for every doc

## Centralized strategy

### Maintenance Overhead

- run a periodic indexing script on the datasource side
- redundant copies of post data and metadata

### Design Considerations

-

#### Tasks

[] Setup Backend again to test login and search implementation
