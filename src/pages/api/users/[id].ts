import {NextApiRequest, NextApiResponse} from 'next'

export default (request : NextApiRequest, response : NextApiResponse) => {
	console.log(request.query)

	const users = [
		{ id: 1, name: 'Matheus Elyasha'},
		{ id: 2, name: 'Dani'},
		{ id: 3, name: 'Rafa'},
		{ id: 4, name: 'Eduardo'},
	]

    return response.json(users)

}
