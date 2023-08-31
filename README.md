# maketournaments

link to board: https://github.com/users/rocksanen/projects/1


create .env.local in project root for environment variables

run npm i to install dependencies

npm run dev to run development version


example graphql query using postman/insomnia

POST: http://localhost:3000/api/graphql/
query {
	hello
}

returns: 
{
	"data": {
		"hello": "world"
	}
}