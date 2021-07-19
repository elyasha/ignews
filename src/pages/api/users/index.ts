import {NextApiRequest, NextApiResponse} from 'next'

// JWT (Storage)
// Next Auth (Social)
// Cognito (AWS), Auth0 (AaaS)

export default (request : NextApiRequest, response : NextApiResponse) => {
	const users = [
		{ id: 1, name: 'Matheus Elyasha'},
		{ id: 2, name: 'Dani'},
		{ id: 3, name: 'Rafa'},
		{ id: 4, name: 'Eduardo'},
	]

    return response.json(users)

}
