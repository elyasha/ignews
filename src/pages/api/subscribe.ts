import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/client'
import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
	ref: {
		id: string;
	}
	data: { email: string, stripe_customer_id: string }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {

		const session = await getSession({ req })
		console.log('session')
		console.log(session)

		const user = await fauna.query<User>(
			q.Get(
				q.Match(
					q.Index('user_by_email'),
					q.Casefold(session.user.email)
				)
			)
		)
		console.log('encontrou o usuário no fauna')
		console.log(user)

		let customerId = user.data.stripe_customer_id

		console.log("Tem customer id ?")
		console.log(customerId)

		if (!customerId) {
			const stripeCustomer = await stripe.customers.create({
				email: session.user.email,
				// metadata: 
			})
			await fauna.query(
				q.Update(
					q.Ref(q.Collection('users'), user.ref.id),
					{
						data: {
							stripe_customer_id: stripeCustomer.id,
						}
					}
				)
			)
			console.log('atualizou o fauna')
			console.log(`customerid : ${stripeCustomer.id}`)

			customerId = stripeCustomer.id
		}


		const stripeCheckoutSession = await stripe.checkout.sessions.create({
			customer: customerId,
			payment_method_types: ['card'],
			billing_address_collection: 'required',
			line_items: [
				{ price: 'price_1JaByqLw3qNDvRsXmWTZeM9o', quantity: 1 }
			],
			mode: 'subscription',
			allow_promotion_codes: true,
			success_url: process.env.STRIPE_SUCCESS_URL,
			cancel_url: process.env.STRIPE_CANCEL_URL
		})

		return res.status(200).json({ sessionId: stripeCheckoutSession.id })

	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method not allowed')
	}
}
