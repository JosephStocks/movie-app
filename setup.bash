# sequelize model:generate --name users --attributes email:string,password:string,fname:string,lname:string
# sequelize model:generate --name movies --attributes title:string,year:integer,synopsis:text,genres:text,mpaa_rating:string,imdb_rating:float,rottentom_rating:integer,metacritic_rating:integer,boxoffice:integer,poster_rel_url:string,release_date:date,imdbvotes:integer;
# sequelize model:generate --name userlists --attributes  userid:integer,list_type:string,movieid:integer;
# sequelize model:generate --name favorites --attributes  userid:integer,movieid:integer;
# sequelize model:generate --name watchlists --attributes  userid:integer,movieid:integer;
# sequelize model:generate --name seenlists --attributes  userid:integer,movieid:integer;
