## Ingesting checkmate to kosh.

- verified the data and checked if all files exists for the metadata
- setting up local development

- web ui at http://localhost:8055/
  - seems like it will be deprecated at someepoint

aws --endpoint-url=http://localhost:4566 s3 mb s3://kosh
aws --endpoint-url=http://localhost:4566 s3api put-bucket-acl --bucket kosh --acl public-read
aws --endpoint-url=http://localhost:4566 s3 ls

aws --endpoint-url=http://localhost:4566 s3api list-objects --bucket kosh
aws --endpoint-url=http://localhost:4566 s3 rm s3://kosh/04889f71-b1d3-4019-8a39-4b74353b3eda.jpg