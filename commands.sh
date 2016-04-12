# get all_posts
http GET "http://localhost:5984/blog/_design/by_type/_view/all_posts"
http GET "http://localhost:5984/blog/_design/by_type/_view/all_posts?limit=2&reduce=false"
http GET "http://localhost:5984/blog/_design/by_type/_view/all_posts?limit=2&reduce=false&include_docs=true"

# get all_articles
http GET "http://localhost:5984/blog/_design/by_type/_view/all_articles"
http GET "http://localhost:5984/blog/_design/by_type/_view/all_articles?limit=2&reduce=false"
http GET "http://localhost:5984/blog/_design/by_type/_view/all_articles?limit=2&reduce=false&include_docs=true"
