import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log('evento recebido')

	return res.json({'ok': "ok"})
}
}
