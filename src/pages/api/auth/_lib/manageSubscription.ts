import { fauna } from "../../../../services/fauna";
import { query as q } from 'faunadb';
import { stripe } from "../../../../services/stripe";

export async function saveSubscription(
	subscriptionId: string,
	customerId: string,
) {
	// salvar as informações no banco de dados

	// console.log(subscriptionId, customerId)




	// Buscar o usuário no banco do FaunaDB com o ID {customerID}
	const userRef = await fauna.query(
		q.Select(
			'ref',
			q.Get(
				q.Match(
					q.Index('user_by_stripe_customer_id'),
					customerId
				)
			)
		)
	)

	// Salvar os dados da subscription do usuário no FaunaDB
	const subscription = await stripe.subscriptions.retrieve(subscriptionId)


	const subscriptionData = {
		id: subscription.id,
		userId: userRef,
		status: subscription.status,
		price_id: subscription.items.data[0].price.id,
	}

	await fauna.query(
		q.Create(
			q.Collection('subscriptions'),
			{ data: subscriptionData }
		)
	)

}
